import cv2
import matplotlib.pyplot as plt
cap = cv2.VideoCapture('http://192.168.4.222:5000/video_feed')

while True:
  ret, frame = cap.read()
  print("frame")
  
  if not ret:
    print("Unable to open.")

  cv2.imshow("Camera", frame)
  
  if cv2.waitKey(1) & 0xFF == ord("q"):
    break

cap.release()
cv2.destroyAllWindows()






"""
def generate_frames():
    while True:
        success, frame = cap.read()
        cv2.imshow('camera', frame)
        yield frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')"""