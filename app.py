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
model = pickle.load(open("src/model.pk1", "rb"))

@app.route('/')
# def results():
#    return render_template('ResultsScreenHTML.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Scientific packages
    list_of_files = glob.glob('src/Upload/*.edf')
    # print(list_of_files)
    latest_file = max(list_of_files, key=os.path.getctime)

    raw = mne.io.read_raw_edf(latest_file, preload=True, verbose=0)

    # Keep only the EEG channels
    raw.pick_types(eeg=True)

    # Extract the data and convert from V to uV
    data = raw._data * 1e6
    sf = raw.info['sfreq']
    chan = raw.ch_names

    # Let's have a look at the data
    # print()
    # print("-----------------------------------------------")
    # print()
    # print('Chan =', chan)
    # print()
    # print("-----------------------------------------------")
    # print()

    rawC4 =raw.pick_channels(['EEG C3-LE' ])
    # print("Selected channel: ", rawC4)
    # print("-----------------------------------------------")

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

    # Relative power: sum of all (non-overlapping and sequential) bands equals to 1
    # print()
    # print("Relative power bands")
    # print()
    # print(yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4))
    # print()
    # print("-----------------------------------------------")

    # Absolute power, using different bands
    bp = yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4, bands=[(13,22,'Beta'),(22, 40, 'Gamma')], relative=False)

    # print("Absolute power bands")
    # print()
    # print(bp)
    # Create a Numpy Array of integers
    arr = np.array([])
    test = bp.bands_[2]
    # print(test)
    # print(arr)
    # os.chdir("src/Tabulars")

    file_name = "src/Tabulars/Absolute-bands.xlsx"

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

    # os.chdir("../src/Upload")
    os.remove(latest_file)

    # os.chdir("../src/Tabulars")

    df = pd.read_excel("src/Tabulars/Absolute-bands.xlsx")
    betaFreqs = df["Beta"].tolist()
    gammaFreqs = df["Gamma"].tolist()
    allFreqs = betaFreqs + gammaFreqs

    convertedArr = np.reshape(betaFreqs, (-1, 1))
    print(convertedArr)

    prediction = model.predict(convertedArr)

    os.remove("src/Tabulars/Absolute-bands.xlsx")

    print(prediction)

    predAsString = np.array_str(prediction)
    # predAsString=predAsString.strip("'")
    # print(predAsString)
    # predAsString = re.sub("[]","", predAsString)
    # print("Array as String: ", predAsString)
    # myStr = "HEyyyy"
    # print(predAsString+myStr)

    file = open("newoutput.txt", "w")
    # prediction = repr(predAsString)
    file.write(predAsString)
    file.close
    return render_template('ResultsScreenHTML.html', prediction_text=prediction)
predict()    

if __name__ == "__main__":
    app.run(debug=True)

app.listen(5000)