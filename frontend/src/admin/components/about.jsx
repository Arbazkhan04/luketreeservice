import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import {getAboutData,updateAboutData} from '../../apiManager/aboutApi';
import Loader from '../../user/components/loader';
import { toast, Bounce } from 'react-toastify';

const About = () => {
  const [aboutData, setAboutData] = useState({});
  const [about, setAbout] = useState(aboutData.about || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState(aboutData.phone || '');
  const [priceStartAt, setPriceStartAt] = useState(aboutData.priceStartAt || '');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getAboutData();
        setAboutData(response.data[0]);
        setAbout(response.data[0].about || '');
        setPhone(response.data[0].phone || '');
        setPriceStartAt(response.data[0].priceStartAt || '');
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      priceStartAt,
      about,
      phone
    };

    try {
      setLoading(true);
      const response = await updateAboutData(aboutData.aboutId, data);
      console.log(response);
      toast(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

    } catch (error) {
      console.log(error);
    }finally {  
      setLoading(false);
    }
    // Add your submission logic here
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        About Section
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price Start At"
              variant="outlined"
              required
              fullWidth
              value={priceStartAt}
              onChange={(e) => setPriceStartAt(e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="outlined"
              required
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
        </Grid>
        <TextField
          label="About"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 13 } }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default About;
