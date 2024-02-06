import { Grid } from '@mui/joy'
import TabsVertical from '../CameraContent'
export const HomeContent = () => {
  return (

    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', mt:3}}>
        <TabsVertical />
    </Grid>
  )
}
