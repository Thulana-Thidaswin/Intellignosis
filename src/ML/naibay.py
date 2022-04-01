import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import sklearn
import pickle 

df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ML-github-component\Intellignosis\EO-EC-TA-full\C3-full.xlsx")
print(df.head())
X = df.iloc[:,4:5].values
y = df.iloc[:, 12].values

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
X[:,0] = le.fit_transform(X[:,0])

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)

pickle.dump(classifier, open("model.pk1", "wb"))
model = pickle.load(open("model.pk1", "rb"))
# # Save the trained model as a pickle string.
# saved_model = pickle.dumps(classifier)

# # Load the pickled model
# model_from_pickle = pickle.loads(saved_model)

print("X_test: ", X_test)

print(type(X_test))
y_pred  = model.predict(X_test)

print(y_pred)
print("--------------------------------------------------")
print(y_test)
from sklearn.metrics import confusion_matrix,accuracy_score
cm = confusion_matrix(y_test, y_pred)
ac = accuracy_score(y_test,y_pred)
print("--------------------------------------------------")
print(ac)
print(cm)

#https://www.analyticsvidhya.com/blog/2021/01/a-guide-to-the-naive-bayes-algorithm/