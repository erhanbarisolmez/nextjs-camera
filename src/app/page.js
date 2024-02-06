import { HomeContent } from "@/components/home";
import { Grid } from "@mui/joy";
export default async function Home() {
  return (
    <>
      <Grid container spacing={2}  >
       <HomeContent/>
      </Grid>
    </>
  )
}
