import pandas as pd
import numpy as np
from sklearn import preprocessing
import matplotlib.pyplot as plt 
plt.rc("font", size=14)
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import seaborn as sns
sns.set(style="white")
sns.set(style="whitegrid", color_codes=True)

df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ML-github-component\Intellignosis\EO-EC-TA-full\Fp1-full.xlsx")
print(df.head())

print(df['MDD/HEL'].value_counts())

sns.countplot(x='MDD/HEL', df=df, palette='hls')
plt.show()
plt.savefig('count_plot')


# count_hel = len(df[df['y']==0])
# count_dep = len(df[df['y']==1])
# pct_of_no_sub = count_hel/(count_hel+count_dep)
# print("percentage of no subscription is", pct_of_no_sub*100)
# pct_of_dep = count_dep/(count_hel+count_dep)
# print("percentage of subscription", pct_of_dep*100)