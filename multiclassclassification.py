from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\Dataset-4\Datase\Eyes-closed EEG.xlsx")
print(df.head())
