from pydoc import importfile
import mne
import yasa
import numpy as np
import pandas as pd
import glob
import pickle 
import os
import openpyxl
from scipy.signal import welch
from openpyxl.utils.dataframe import dataframe_to_rows
from flask import Flask, render_template, request
from scipy.signal import welch
from scipy import signal

app = Flask(__name__)


@app.route("/flask/", methods=['GET'])
def index():
    # reading input edf files
    list_of_files = glob.glob('*.edf')
    latest_file = max(list_of_files, key=os.path.getctime)
    raw = mne.io.read_raw_edf(latest_file, preload=True, verbose=0)

    # picking EEG channels
    raw.pick_types(eeg=True)

    # converting extracted data from V to uV
    data = raw._data * 1e6
    sf = raw.info['sfreq']
    chan = raw.ch_names

    # picking Channel Fp-1
    rawFp1 = raw.pick_channels(['EEG Fp1-LE' ])

    # Extract the data and convert from V to uV
    dataFp1 = rawFp1._data * 1e6
    sfFp1 = rawFp1.info['sfreq']
    chanC4 = rawFp1.ch_names

    # Window size is set to 4 seconds
    win = int(4 * sf)  
    freqs, psd = welch(dataFp1, sf, nperseg=win, average='median')  

    win = 4 * sf
    freqs1, psd1 = signal.welch(dataFp1, sf, nperseg=win)

    psd1 = psd1.reshape(513)

    # picking the absolute power of Beta and Gamma bands
    bp = yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4, bands=[(13,22,'Beta'),(22, 40, 'Gamma')], relative=False)

    file_name = "Absolute-bands.xlsx"

    # create temporary excel file to save the converted edf file
    if os.path.isfile(file_name):  
        workbook = openpyxl.load_workbook(file_name)  
        sheet = workbook['Sheet1']  
        for row in dataframe_to_rows(bp, header = False, index = False):
            sheet.append(row)
        workbook.save(file_name)  
        workbook.close()  
    else:  
        with pd.ExcelWriter(path = file_name, engine = 'openpyxl') as writer:
            bp.to_excel(writer, index = False, sheet_name = 'Sheet1')

    os.remove(latest_file) #removing .edf file

    # reading the temporary excel sheet
    df = pd.read_excel("Absolute-bands.xlsx") 
    x_data = df[["Beta", "Gamma"]]

    # predicting using the loaded model
    model = pickle.load(open("kNNModel.pk1", "rb"))
    prediction = model.predict(x_data)

    os.remove("Absolute-bands.xlsx") # removing temporary excel file
    
    # converting the output to a string
    predAsString = np.array_str(prediction)

    return predAsString

if __name__ == "__main__":
    app.run(debug=True, port=5000, use_reloader=False)  