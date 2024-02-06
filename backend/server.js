// server.js
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/stream', async (req, res) => {
  try {
    const pythonProcess = spawn('python', 'backend/opencv.py');
    
    res.writeHead(200, {
      'Content-Type': 'multipart/x-mixed-replace; boundary=frame',
      Connection: 'keep-alive',
    });

    for await (const frameData of pythonProcess.stdout) {
      res.write(frameData);
      res.flush();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error streaming video');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
