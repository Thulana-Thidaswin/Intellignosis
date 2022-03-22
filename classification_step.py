from math import gamma
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn import preprocessing
import numpy as np

df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ML-github-component\Intellignosis\EO-EC-TA-full\C3-full.xlsx")
df.head()

x_train = df.drop(['Chan', 'TotalAbsPow', 'Ddelta', 'THeta', 'Alpha', 'FreqRes', 'Relative', 'Patient', 'MDD/HEL', 'Type'], axis=1, inplace=True)
y_train = df["MDD/HEL"]

from sklearn.neighbors import KNeighborsClassifier as KNN
knn = KNN(n_neighbors = 4)

# train model
model = knn.fit(x_train, y_train)

predicted= model.predict([[ 8.215278, 4.824871]])
print(predicted)