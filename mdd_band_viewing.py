import mne
import yasa
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import csv
sns.set(style='white', font_scale=1.2)

# Scientific packages
from numpy import loadtxt, array, mean, logical_and, trapz
from scipy.signal import spectrogram, welch

raw = mne.io.read_raw_edf("D:\IIT\Year 2 Sem 2\SDGP\Dataset 1\Testing-set\MDD-testing\MDD S29 EO.edf", preload=True, verbose=0)

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

rawC4 =raw.pick_channels(['EEG Fp1-LE' ])
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
bp = yasa.bandpower_from_psd(psd1, freqs1, ch_names=chanC4, bands=[(0.5,4, 'Ddelta'),(4, 8, 'THeta'), (8, 13, 'Alpha'),(13,22,'Beta'),(22, 40, 'Gamma')], relative=False)
# print(bp.bands_)  # Tip: see the frequency bands that were used
print("Absolute power bands")
print()
print(bp)

# fields = ["Patient_num","Channel", "Delta", "Theta", "Alpha", "Sigma", "Beta", "Gamma", "1/0"]
# rows = [bp]

# filename = "mdd-bands.csv"

# # writing to csv file 
# with open(filename, 'w') as csvfile: 
#     # creating a csv writer object 
#     csvwriter = csv.writer(csvfile) 
        
#     # writing the fields 
#     csvwriter.writerow(fields) 
        
#     # writing the data rows 
#     csvwriter.writerows(rows)
