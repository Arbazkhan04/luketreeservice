import SwipeableTextMobileStepper from './carousel'
import { Container, Box, Typography } from '@mui/material';
import ReviewCard from './reviewCard';



export default function Home() {
    return (
        <Container>
            <Box my={1}>

                <Typography variant="h4" component="h1" gutterBottom>
                    Reviews
                </Typography>
                <Typography variant="body2" sx={{ marginTop: -2 }}>
                    223 Reviews
                </Typography>

                <Typography variant="body1" paragraph sx={{ marginTop: 5, fontSize: '1.2rem'}}>
                    Prices start at 💲65. <br />
                    We trim/prune tree branches &lt; 25' high, trim any tree of any height, and remove trees &lt; 40' high.
                    Serving Seattle, Bothell, Mill Creek, Eastside, and surrounding areas.
                    <br />
                    Tap here to 📞 <a href="tel:+12063212510">206-321-2510</a>. Ask for Luke.
                    <br />
                    WA State licensed ✔️ and Insured ✔️
                </Typography>

            </Box>

           {/* carousel section */}
           <SwipeableTextMobileStepper />

           {/* review sections */}
            <ReviewCard/>

        </Container >
    )
}