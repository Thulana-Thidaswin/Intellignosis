import mne
import yasa
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import csv
import os
import openpyxl
import pandas as pd
from openpyxl.utils.dataframe import dataframe_to_rows
sns.set(style='white', font_scale=1.2)

# Scientific packages
from numpy import loadtxt, array, mean, logical_and, trapz
from scipy.signal import spectrogram, welch

raw = mne.io.read_raw_edf("D:\IIT\Year 2 Sem 2\SDGP\Dataset 1\Testing-set\MDD-testing\MDD S31 EC.edf", preload=True, verbose=0)

# raw.plot

# Keep only the EEG channels
raw.pick_types(eeg=True)

# Extract the data and convert from V to uV
data = raw._data * 1e6
sf = raw.info['sfreq']
chan = raw.ch_names

# Let's have a look at the data
print()
print("-----------------------------------------------")
print()
print('Chan =', chan)
print()
print("-----------------------------------------------")
print()
# print('Sampling frequency =', sf, 'Hz')
# print('Data shape =', data.shape)


rawC4 =raw.pick_channels(['EEG C3-LE' ])
print("Selected channel: ", rawC4)
print("-----------------------------------------------")

# rawC4.plot()

# Extract the data and convert from V to uV
dataC4 = rawC4._data * 1e6
sfC4 = rawC4.info['sfreq']
chanC4 = rawC4.ch_names

# Let's have a look at the data
# print('Chan =', chanC4)
# print('Sampling frequency =', sfC4, 'Hz')
# print('Data shape =', dataC4.shape)

from scipy.signal import welch

win = int(4 * sf)  # Window size is set to 4 seconds
freqs, psd = welch(dataC4, sf, nperseg=win, average='median')  # Works with single or multi-channel data

# print(freqs.shape, psd.shape)  # psd has shape (n_channels, n_frequencies)

from scipy import signal

win = 4 * sf
freqs1, psd1 = signal.welch(dataC4, sf, nperseg=win)


psd1 = psd1.reshape(513)

# plt.plot(freqs1, psd1, 'k', lw=2)
# plt.fill_between(freqs1, psd1[1], cmap='Spectral')
# plt.xlim(0, 50)
# plt.yscale('log')
# sns.despine()
 
# plt.xlabel('Frequency [Hz]')
# plt.ylabel('PSD log($uV^2$/Hz)');

# Relative power: sum of all (non-overlapping and sequential) bands equals to 1
print()
print("Relative power bands")
print()
print(yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4))
print()
print("-----------------------------------------------")

# Absolute power, using different bands
bp = yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4, bands=[(13,22,'Beta'),(22, 40, 'Gamma')], relative=False)
# print(bp.bands_)  # Tip: see the frequency bands that were used
print("Absolute power bands")
print()
print(bp)
# Create a Numpy Array of integers
arr = np.array([])
test = bp.bands_[2]
print(test)
print(arr)

file_name = "M-F3-list-EO.xlsx"

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

