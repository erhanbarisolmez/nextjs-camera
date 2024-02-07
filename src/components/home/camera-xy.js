import { Button, Grid, Typography } from '@mui/joy'
export const CameraXY = ({ x, y, h, w}) => {
  return (
    <Grid container item xs={12} sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      mt: 2
    }} >
      <Typography>
        Koordinat X / Y : {x} - {y}
      </Typography>
      <Typography>
        Yükseklik / Genişlik : {h} - {w}
      </Typography>
      <Button  variant="soft" >Gönder</Button>
    </Grid>
  )
}
