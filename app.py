from pydoc import importfile
import mne
import yasa
import numpy as np
import pandas as pd
import glob
import pickle 
import os
import sys
import openpyxl
import re
from scipy.signal import welch
from openpyxl.utils.dataframe import dataframe_to_rows
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/flask/", methods=['GET'])
def index():
    # Scientific packages
    list_of_files = glob.glob('Upload/*.edf')
    # print(list_of_files)
    latest_file = max(list_of_files, key=os.path.getctime)

    raw = mne.io.read_raw_edf(latest_file, preload=True, verbose=0)

    # Keep only the EEG channels
    raw.pick_types(eeg=True)

    # Extract the data and convert from V to uV
    data = raw._data * 1e6
    sf = raw.info['sfreq']
    chan = raw.ch_names

    rawC4 = raw.pick_channels(['EEG Fp1-LE' ])

    # Extract the data and convert from V to uV
    dataC4 = rawC4._data * 1e6
    sfC4 = rawC4.info['sfreq']
    chanC4 = rawC4.ch_names

    from scipy.signal import welch

    win = int(4 * sf)  # Window size is set to 4 seconds
    freqs, psd = welch(dataC4, sf, nperseg=win, average='median')  # Works with single or multi-channel data

    from scipy import signal

    win = 4 * sf
    freqs1, psd1 = signal.welch(dataC4, sf, nperseg=win)

    psd1 = psd1.reshape(513)

    # Absolute power, using different bands
    #Changed Gamma to THEta here!
    bp = yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4, bands=[(13,22,'Beta'),(22, 40, 'Gamma')], relative=False)

    # Create a Numpy Array of integers
    arr = np.array([])
    test = bp.bands_[2]

    file_name = "Tabulars/Absolute-bands.xlsx"

    # create excel file
    if os.path.isfile(file_name):  # if file already exists append to existing file
        workbook = openpyxl.load_workbook(file_name)  # load workbook if already exists
        sheet = workbook['Sheet1']  # declare the active sheet 

        # append the dataframe results to the current excel file
        for row in dataframe_to_rows(bp, header = False, index = False):
            sheet.append(row)
        workbook.save(file_name)  # save workbook
        workbook.close()  # close workbook
    else:  # create the excel file if doesn't already exist
        with pd.ExcelWriter(path = file_name, engine = 'openpyxl') as writer:
            bp.to_excel(writer, index = False, sheet_name = 'Sheet1')

    #DONT FORGET TO UNCOMMENT THIS!!!!!!!!!!!111
    os.remove(latest_file)

    df = pd.read_excel("Tabulars/Absolute-bands.xlsx")
    # betaFreqs = df["Beta"].tolist()
    # gammaFreqs = df["Gamma"].tolist()
    # allFreqs = betaFreqs + gammaFreqs

    x_data = df[["Beta", "Gamma"]]
    print("XDATA: ", x_data)


    # convertedArr = np.reshape(betaFreqs, (-1, 1))
    # print(convertedArr)
    model = pickle.load(open("kNNModel.pk1", "rb"))
    prediction = model.predict(x_data)

    # os.remove("Tabulars/Absolute-bands.xlsx")

    print(prediction)

    predAsString = np.array_str(prediction)
    # predAsString=predAsString.strip("'")
    # print(predAsString)
    # predAsString = re.sub("[]","", predAsString)
    # print("Array as String: ", predAsString)
    # myStr = "HEyyyy"
    # print(predAsString+myStr)

    # file = open("static/newoutput.txt", "w")
    # # prediction = repr(predAsString)
    # file.write(predAsString)
    # print(predAsString)
    # file.close
    # return render_template("resultshtml.html", prediction=predAsString)
    print(predAsString)
    # randVar = "['Minimal']" 
    # print(randVar)
    return predAsString

if __name__ == "__main__":
    app.run(debug=True, port=5000, use_reloader=False)