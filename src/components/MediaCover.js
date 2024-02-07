import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';
export default function MediaCover({ cameraURL, cameraNumber, onAreaSelect, onAreaSelect2, isAreaSelected, selectedCoordinates, selectedCoordinatesWidth }) {


  const handleAreaSelect = (event) => {
    const boundingBox = event.currentTarget.getBoundingClientRect();
    const xCoordinate = Math.round(event.clientX - boundingBox.left);
    const yCoordinate = Math.round(event.clientY - boundingBox.top);
    
    // Koordinat belli eksende çizilecek, taşma önlencek, çizim yaparken seçili alan(ön izleme) görüntülenecek.
    // if ((!selectedCoordinates || xCoordinate >= selectedCoordinates.x) &&(!selectedCoordinates || yCoordinate >= selectedCoordinates.y)) {
    // }
    onAreaSelect({ x: xCoordinate, y: yCoordinate });

  };

  const handleAreaSelect2 = (event) => {

      const  boundingBox = event.currentTarget.getBoundingClientRect();
      const wCoordinate = Math.round(event.clientX - boundingBox.left);
      const hCoordinate = Math.round(event.clientY - boundingBox.top);

      const width = Math.abs(wCoordinate- selectedCoordinates.x)
      const height = Math.abs(hCoordinate - selectedCoordinates.y);
      console.log("w :",width,"y", height);
      onAreaSelect2({
        x: Math.min(selectedCoordinates.x, hCoordinate),
        y: Math.min(selectedCoordinates.y, wCoordinate),
        w:width,
        h:height,
      })
  }


  return (
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      style={{ width: '50%', height: '100%', objectFit: 'cover' }}
      onMouseDown={handleAreaSelect}
      onMouseUp={handleAreaSelect2}
    >
      <Card component="li" >
        <Box sx={{ minWidth: 760, minHeight: 380 } }>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster={cameraURL}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                
              }}
            >
              <source src={cameraURL} />
            </video>
          </CardCover>
          {isAreaSelected && (
            <div
              style={{
                position: 'absolute',
                top: selectedCoordinates.y, // Adjust based on your requirement
                left: selectedCoordinates.x, // Adjust based on your requirement
                height: selectedCoordinatesWidth.h,
                width: selectedCoordinatesWidth.w,
                border: '2px solid red',
                pointerEvents: 'none', // Make sure the overlay doesn't interfere with clicks
              }}
            >
            </div>
          )}
        </Box>

        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            {cameraNumber}
          </Typography>
        </CardContent>

      </Card>
    </Box>
  );
}
