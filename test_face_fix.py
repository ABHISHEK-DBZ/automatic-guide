import base64
import requests
import json
import numpy as np
import cv2

# Create a dummy image with a face-like white box (since we can't easily generate a real face)
# In reality, this might not be enough for Haar, but we can at least check for no crashes.
img = np.zeros((480, 640, 3), dtype=np.uint8)
# Let's try to simulate a face-like structure (or just a blank frame to check for 'No face')
cv2.rectangle(img, (200, 100), (440, 340), (255, 255, 255), -1)

_, buffer = cv2.imencode('.jpg', img)
base64_image = base64.b64encode(buffer).decode('utf-8')

url = "http://localhost:8001/multimodal/analyze-attention"
payload = {"image_base64": base64_image}

try:
    response = requests.post(url, json=payload, timeout=10)
    print(f"Status: {response.status_code}")
    print(f"Body: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
