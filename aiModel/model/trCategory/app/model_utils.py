import pickle
import pandas as pd
import os
from datetime import datetime

# Global model variable to avoid reloading on every request
_model = None

def load_model(model_path='testml/model_v2.pkl'):
    global _model
    if _model is None:
        # Adjust path if necessary based on where this is called from
        if not os.path.exists(model_path):
             # Try absolute path or relative to app root
             base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
             model_path = os.path.join(base_dir, 'testml', 'model_v2.pkl')
        
        print(f"Loading model from {model_path}")
        try:
            _model = pickle.load(open(model_path, 'rb'))
        except Exception as e:
            print(f"Error loading model: {e}")
            return None
    return _model

def predict_transaction(merchant_name, amount, transaction_time):
    """
    Predicts the category of a transaction.
    
    Args:
        merchant_name (str): Name of the merchant.
        amount (float): Transaction amount.
        transaction_time (datetime): Time of the transaction.
        
    Returns:
        dict: {'category': str, 'confidence': float, 'is_unknown': bool}
    """
    model = load_model()
    if model is None:
        return {'category': 'Error', 'confidence': 0.0, 'is_unknown': True}
    
    # Determine TimeOfDay
    hour = transaction_time.hour
    if 5 <= hour < 12:
        time_of_day = 'Morning'
    elif 12 <= hour < 17:
        time_of_day = 'Afternoon'
    elif 17 <= hour < 21:
        time_of_day = 'Evening'
    else:
        time_of_day = 'Night'
        
    # Construct SMS Snippet (Synthetic for consistency with training)
    sms_snippet = f"Debited Rs {amount} at {merchant_name} on {time_of_day}"
    
    # Create DataFrame for prediction
    input_data = pd.DataFrame({
        'Name': [merchant_name],
        'SMS_Snippet': [sms_snippet],
        'Amount': [amount],
        'TimeOfDay': [time_of_day]
    })
    
    try:
        prediction = model.predict(input_data)[0]
        proba = model.predict_proba(input_data)[0]
        confidence = max(proba)
        
        is_unknown = confidence < 0.7
        
        if is_unknown:
            category = "UNKNOWN"
        else:
            category = prediction
            
        return {
            'category': category,
            'confidence': float(confidence),
            'is_unknown': is_unknown,
            'predicted_label': prediction # Keep the original prediction even if unknown
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        return {'category': 'Error', 'confidence': 0.0, 'is_unknown': True}
