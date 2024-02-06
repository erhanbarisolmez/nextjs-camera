import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';

export default function MediaCover({ cameraURL, cameraNumber, onAreaSelect }) {
 
  const handleAreaSelect = (event) => {
    
    const xCoordinate = Math.round(event.clientX);
    const yCoordinate = Math.round(event.clientY);
    onAreaSelect({ x: xCoordinate, y: yCoordinate });
  };

  return (
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      style={{ width: '50%', height: '100%', objectFit: 'cover' }}
      onClick={handleAreaSelect}
    >
      <Card component="li" >
        <Box sx={{ minWidth: 760, minHeight: 380 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster={cameraURL}
              style={{ width: '100%', height: '100%', objectFit: 'fill' }}
            >
              <source src={cameraURL} />
            </video>
          </CardCover>
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
