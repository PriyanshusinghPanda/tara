from app.model_utils import predict_transaction
from datetime import datetime

def test_prediction():
    print("Testing prediction integration...")
    
    # Test Case 1: Known Merchant (Swiggy)
    merchant = "Swiggy"
    amount = 250
    time = datetime(2023, 10, 27, 20, 30, 0) # Night
    print(f"\nTest 1: {merchant}, {amount}, {time}")
    result = predict_transaction(merchant, amount, time)
    print(f"Result: {result}")
    
    # Test Case 2: Unknown/Low Confidence
    merchant = "Unknown Random Store XYZ"
    amount = 5000
    time = datetime(2023, 10, 27, 10, 0, 0) # Morning
    print(f"\nTest 2: {merchant}, {amount}, {time}")
    result = predict_transaction(merchant, amount, time)
    print(f"Result: {result}")
    
    # Test Case 3: High Amount (might influence category)
    merchant = "Lulu Mall"
    amount = 10000
    time = datetime(2023, 10, 27, 15, 0, 0) # Afternoon
    print(f"\nTest 3: {merchant}, {amount}, {time}")
    result = predict_transaction(merchant, amount, time)
    print(f"Result: {result}")

if __name__ == "__main__":
    test_prediction()
