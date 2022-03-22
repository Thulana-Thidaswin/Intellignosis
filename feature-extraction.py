import mne
import yasa
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import csv
import os
import openpyxl
import pandas as pd
from scipy.signal import welch
from scipy import signal
from openpyxl.utils.dataframe import dataframe_to_rows
sns.set(style='white', font_scale=1.2)

# Scientific packages
from numpy import loadtxt, array, mean, logical_and, trapz
from scipy.signal import spectrogram, welch

#Read input file here
raw = mne.io.read_raw_edf("D:\IIT\Year 2 Sem 2\SDGP\Dataset 1\Testing-set\MDD-testing\MDD S34 TASK.edf", preload=True, verbose=0)

# Keep only the EEG channels
raw.pick_types(eeg=True)

# Extract the data and convert from V to uV
data = raw._data * 1e6
sf = raw.info['sfreq']
chan = raw.ch_names

#Select a channel
rawC4 =raw.pick_channels(['EEG A2-A1' ])

# Extract the data and convert from V to uV
dataC4 = rawC4._data * 1e6
sfC4 = rawC4.info['sfreq']
chanC4 = rawC4.ch_names

win = int(4 * sf)
freqs, psd = welch(dataC4, sf, nperseg=win, average='median') 

win = 4 * sf
freqs1, psd1 = signal.welch(dataC4, sf, nperseg=win)

psd1 = psd1.reshape(513)

# Absolute power, using different bands
bp = yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4, bands=[(0.5,4, 'Ddelta'),(4, 8, 'THeta'), (8, 13, 'Alpha'),(13,22,'Beta'),(22, 40, 'Gamma')], relative=False)

file_name = "Test-A2 A1.xlsx"

# create excel file
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
print("Saved")