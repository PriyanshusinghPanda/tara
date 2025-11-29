import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
import pickle
import random

# Load existing data
df = pd.read_csv('resultdata.csv')
df = df[df['Type'] != 'Others'] # Filter out 'Others' for training specific categories

# --- Synthetic Data Generation ---
def generate_synthetic_features(row):
    # Amount: Random between 10 and 5000
    amount = random.randint(10, 5000)
    
    # Time: Random hour 0-23
    hour = random.randint(0, 23)
    if 5 <= hour < 12:
        time_of_day = 'Morning'
    elif 12 <= hour < 17:
        time_of_day = 'Afternoon'
    elif 17 <= hour < 21:
        time_of_day = 'Evening'
    else:
        time_of_day = 'Night'
        
    # SMS Snippet
    merchant = row['Name']
    snippet = f"Debited Rs {amount} at {merchant} on {time_of_day}"
    
    # UPI ID (Mock)
    upi_id = f"{merchant.replace(' ', '').lower()}@upi"
    
    return pd.Series([amount, time_of_day, snippet, upi_id])

print("Generating synthetic features...")
df[['Amount', 'TimeOfDay', 'SMS_Snippet', 'UPI_ID']] = df.apply(generate_synthetic_features, axis=1)

# --- Preprocessing ---
# We will use Merchant Name and SMS Snippet (Text), Amount (Numeric), and TimeOfDay (Categorical)

# Text Preprocessing (Merchant Name + SMS Snippet)
# We can combine them or treat them separately. Let's treat them separately to capture distinct signals.
text_features = 'Name'
sms_features = 'SMS_Snippet'
numeric_features = ['Amount']
categorical_features = ['TimeOfDay']

# Define transformers
text_transformer = TfidfVectorizer(stop_words='english', max_features=1000)
sms_transformer = TfidfVectorizer(stop_words='english', max_features=1000)
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Combine transformers
preprocessor = ColumnTransformer(
    transformers=[
        ('name', text_transformer, text_features),
        ('sms', sms_transformer, sms_features),
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# --- Model ---
# Using Random Forest as a robust baseline
clf = Pipeline(steps=[('preprocessor', preprocessor),
                      ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))])

# Split data
X = df[['Name', 'SMS_Snippet', 'Amount', 'TimeOfDay']]
y = df['Type']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
print("Training model...")
clf.fit(X_train, y_train)

# Evaluate
print("Model score: %.3f" % clf.score(X_test, y_test))

# Save
print("Saving model...")
pickle.dump(clf, open('model_v2.pkl', 'wb'))
print("Model saved to model_v2.pkl")

# Test Prediction
test_sample = pd.DataFrame({
    'Name': ['Swiggy'],
    'SMS_Snippet': ['Debited Rs 250 at Swiggy'],
    'Amount': [250],
    'TimeOfDay': ['Night']
})
prediction = clf.predict(test_sample)
proba = clf.predict_proba(test_sample)
print(f"Test Prediction for Swiggy: {prediction[0]} (Confidence: {max(proba[0]):.2f})")
