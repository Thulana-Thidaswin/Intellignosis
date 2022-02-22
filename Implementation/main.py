import chan as chan
import mne
import yasa
import matplotlib.pyplot as plt
from matplotlib.mlab import psd
from scipy.signal import freqs

file = "D:\IIT\Year 2 Sem 2\SDGP\Dataset 1\H S1 EC.edf"
data = mne.io.read_raw_edf(file)
raw_data = data.get_data()

#bandpass filter
# raw_data.filter(30, 100)

#Converting Volts to microVolts
# data = raw_data._data * 1e6
# sf = raw_data.info['sfreq']

print(raw_data)
print("Shape: ", raw_data.shape)
# print('Sampling frequency =', sf, 'Hz')

info = data.info
print(info)

channels = data.ch_names
print(channels)

print("Printing data[0[0]]")
print(data[19])
print("rawdata")
print(raw_data[0])
print(type(raw_data))
print(raw_data[0,0])
print(raw_data[0,1])
print(raw_data[0,2])

# raw_data.pick_channels(["EEG Fp1-LE"])

# yasa.bandpower_from_psd(psd, freqs, ch_names=chan)
# low_freq, high_freq = 30.0, 80.0 # values in Hz
# raw_data = raw_data.filter(low_freq, high_freq, n_jobs=4)
# data = raw_data.get_data()
# raw_data.plot_psd(fmax=50)
plt.plot(raw_data[0,:4999])
plt.show()
