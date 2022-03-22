import mne

input_fname=("D:\IIT\Year 2 Sem 2\SDGP\Dataset 2\ds003474\sub-001\eeg\sub-001_task-ProbabilisticSelection_eeg.fdt")
 
mne.io.read_raw_eeglab(input_fname, eog=(), preload=False, uint16_codec=None, verbose=None)
