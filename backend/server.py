from fastapi import FastAPI, Response, Request
from fastapi.responses import StreamingResponse
from fastapi.templating import Jinja2Templates
import cv2
import numpy as np
import asyncio
import uvicorn
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel
app = FastAPI()
templates = Jinja2Templates(directory="templates")
url = "http://192.168.4.222:5000/video_feed"

received_rectangles = []
async def generate_frames():
    video_capture = cv2.VideoCapture(url)
    video_capture.set(cv2.CAP_PROP_FPS, 50)

    while True:
        success, frame = video_capture.read()
        if not success:
            break
        else:
            # Görüntüye metni eklemek için gerekli kod
            h = str(frame.shape[0])
            w = str(frame.shape[1])
            text = (f"h**** = {h} w***** = {w}")
            font = cv2.FONT_HERSHEY_SIMPLEX
            font_size = 1
            font_thickness = 2
            font_color = (0, 255, 0)  # BGR formatında (blue, green, red)
            bottom_left_corner = (10, frame.shape[0] - 10)
            cv2.putText(frame, text, bottom_left_corner, font, font_size, font_color, font_thickness)

            _, buffer = cv2.imencode('.jpeg', frame, [cv2.IMWRITE_JPEG_QUALITY, 50])
            frame = buffer.tobytes()

            await asyncio.sleep(0.05)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    video_capture.release()
    cv2.destroyAllWindows()


@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/video_feed")
async def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

@app.post("/receive_rectangle_data")
async def receive_rectangle_data(request: Request, rectangle_data: dict = Body(...)):
    try:
        center_x = rectangle_data.get("center_x")
        center_y = rectangle_data.get("center_y")
        width = rectangle_data.get("width")
        height = rectangle_data.get("height")

        received_rectangles.append({
            "center_x": center_x,
            "center_y": center_y,
            "width": width,
            "height": height
        })

        print(f"Alınan dikdörtgen verileri: center_x={center_x}, center_y={center_y}, width={width}, height={height}")

        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/get_received_rectangles")
async def get_received_rectangles():
    return {"received_rectangles": received_rectangles}
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=False)