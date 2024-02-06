import { Button, Grid, Typography } from '@mui/joy'
export const CameraXY = ({x, y}) => {
  return (
    <Grid container item xs={12} sx={{
      display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'space-evenly',mt:2
    }} >
      <Typography>
          Seçilen alan (x) : {x}
      </Typography>
      <Typography>
          Seçilen alan (y) : {y}
      </Typography>
      <Button variant="soft" >Gönder</Button>
    </Grid>
  )
}
