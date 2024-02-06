import requests
import json

center_x = 320
center_y = 240
width = 100
height = 150
hello = 2321

server_url = "http://192.168.4.222:5000/receive_rectangle_data"

rectangle_data = {
    "center_x": center_x,
    "center_y": center_y,
    "width": width,
    "height": height,
    "hello": "hello",
}

try:
    response = requests.post(server_url, json=rectangle_data)
    if response.status_code == 200:
        print("Dikdörtgen bilgileri başarıyla gönderildi.")
    else:
        print("Dikdörtgen bilgileri gönderilemedi. HTTP Status Code:", response.status_code)
except Exception as e:
    print("Hata:", e)