// // import { useState, useEffect } from 'react';
// // import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
// // import {getAboutData,updateAboutData} from '../../apiManager/aboutApi';
// // import Loader from '../../user/components/loader';
// // import { toast, Bounce } from 'react-toastify';

// // const About = () => {
// //   const [aboutData, setAboutData] = useState({});
// //   const [about, setAbout] = useState(aboutData.about || '');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [phone, setPhone] = useState(aboutData.phone || '');
// //   const [priceStartAt, setPriceStartAt] = useState(aboutData.priceStartAt || '');

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         setLoading(true);
// //         const response = await getAboutData();
// //         setAboutData(response.data[0]);
// //         setAbout(response.data[0].about || '');
// //         setPhone(response.data[0].phone || '');
// //         setPriceStartAt(response.data[0].priceStartAt || '');
// //       } catch (err) {
// //         setError(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, []);


// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     const data = {
// //       priceStartAt,
// //       about,
// //       phone
// //     };

// //     try {
// //       setLoading(true);
// //       const response = await updateAboutData(aboutData.aboutId, data);
// //       // console.log(response);
// //       toast(response.message, {
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //         theme: "light",
// //         transition: Bounce,
// //         });

// //     } catch (error) {
// //       // console.log(error);
// //     }finally {  
// //       setLoading(false);
// //     }
// //     // Add your submission logic here
// //   };

// //   if (loading) return <div><Loader /></div>;
// //   if (error) return <div>Error: {error.message}</div>;

// //   return (
// //     <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
// //       <Typography variant="h4" gutterBottom align="center" color="primary">
// //         About Section
// //       </Typography>
// //       <Box
// //         component="form"
// //         onSubmit={handleSubmit}
// //         sx={{
// //           display: 'flex',
// //           flexDirection: 'column',
// //           gap: 3,
// //         }}
// //       >
// //         <Grid container spacing={2}>
// //           <Grid item xs={12} sm={6}>
// //             <TextField
// //               label="Price Start At"
// //               variant="outlined"
// //               required
// //               fullWidth
// //               value={priceStartAt}
// //               onChange={(e) => setPriceStartAt(e.target.value)}
// //               InputLabelProps={{ style: { fontSize: 12 } }}
// //               InputProps={{ style: { fontSize: 14 } }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <TextField
// //               label="Phone"
// //               variant="outlined"
// //               required
// //               fullWidth
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //               InputLabelProps={{ style: { fontSize: 12 } }}
// //               InputProps={{ style: { fontSize: 14 } }}
// //             />
// //           </Grid>
// //         </Grid>
// //         <TextField
// //           label="About"
// //           variant="outlined"
// //           multiline
// //           rows={4}
// //           fullWidth
// //           value={about}
// //           onChange={(e) => setAbout(e.target.value)}
// //           InputLabelProps={{ style: { fontSize: 12 } }}
// //           InputProps={{ style: { fontSize: 13 } }}
// //         />
// //         <Button variant="contained" color="primary" type="submit" fullWidth>
// //           Submit
// //         </Button>
// //       </Box>
// //     </Paper>
// //   );
// // };

// // export default About;



// import { useState, useEffect } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardMedia,
// } from '@mui/material';
// import { getAboutData, updateAboutData } from '../../apiManager/aboutApi';
// import Loader from '../../user/components/loader';
// import { toast, Bounce } from 'react-toastify';

// const About = () => {
//   const [aboutData, setAboutData] = useState({});
//   const [about, setAbout] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [priceStartAt, setPriceStartAt] = useState('');

//   const [landingImages, setLandingImages] = useState([
//     { id: 1, url: 'https://via.placeholder.com/300x150?text=Landing+Image+1' },
//     { id: 2, url: 'https://via.placeholder.com/300x150?text=Landing+Image+2' },
//     { id: 3, url: 'https://via.placeholder.com/300x150?text=Landing+Image+3' },
//   ]);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await getAboutData();
//         setAboutData(response.data[0]);
//         setAbout(response.data[0].about || '');
//         setPhone(response.data[0].phone || '');
//         setPriceStartAt(response.data[0].priceStartAt || '');
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = { priceStartAt, about, phone };

//     try {
//       setLoading(true);
//       const response = await updateAboutData(aboutData.aboutId, data);
//       toast(response.message, {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//         transition: Bounce,
//       });
//     } catch (error) {
//       toast('Failed to update About section', { type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (event, index) => {
//     const file = event.target.files[0];
//     if (file) {
//       const newImages = [...landingImages];
//       newImages[index].url = URL.createObjectURL(file);
//       setLandingImages(newImages);
//     }
//   };

//   const handleLandingImagesSubmit = (e) => {
//     e.preventDefault();
//     toast('Landing page images updated successfully (dummy update)', {
//       position: 'top-right',
//       autoClose: 4000,
//       theme: 'light',
//       transition: Bounce,
//     });
//   };

//   if (loading) return <Loader />;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
//       {/* About Section */}
//       <Typography variant="h4" gutterBottom align="center" color="primary">
//         About Section
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 3,
//         }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Price Start At"
//               variant="outlined"
//               required
//               fullWidth
//               value={priceStartAt}
//               onChange={(e) => setPriceStartAt(e.target.value)}
//               InputLabelProps={{ style: { fontSize: 12 } }}
//               InputProps={{ style: { fontSize: 14 } }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Phone"
//               variant="outlined"
//               required
//               fullWidth
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               InputLabelProps={{ style: { fontSize: 12 } }}
//               InputProps={{ style: { fontSize: 14 } }}
//             />
//           </Grid>
//         </Grid>
//         <TextField
//           label="About"
//           variant="outlined"
//           multiline
//           rows={4}
//           fullWidth
//           value={about}
//           onChange={(e) => setAbout(e.target.value)}
//           InputLabelProps={{ style: { fontSize: 12 } }}
//           InputProps={{ style: { fontSize: 13 } }}
//         />
//         <Button variant="contained" color="primary" type="submit" fullWidth>
//           Submit
//         </Button>
//       </Box>

//       {/* Landing Page Images Section */}
//       <Typography
//         variant="h4"
//         gutterBottom
//         align="center"
//         color="primary"
//         sx={{ mt: 8 }}
//       >
//         Landing Page Images
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleLandingImagesSubmit}
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 3,
//           mt: 3,
//         }}
//       >
//         <Grid container spacing={3} justifyContent="center">
//           {landingImages.map((img, index) => (
//             <Grid item xs={12} sm={4} key={img.id}>
//               <Card sx={{ textAlign: 'center', p: 2 }}>
//                 <CardMedia
//                   component="img"
//                   image={img.url}
//                   alt={`Landing Image ${index + 1}`}
//                   sx={{
//                     borderRadius: 2,
//                     mb: 2,
//                     width: '100%',
//                     height: 150,
//                     objectFit: 'cover',
//                   }}
//                 />
//                 <Button variant="outlined" component="label" fullWidth>
//                   Change Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={(e) => handleImageChange(e, index)}
//                   />
//                 </Button>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Submit Landing Images
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default About;






// import { useState, useEffect } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardMedia,
// } from '@mui/material';
// import { getAboutData, updateAboutData } from '../../apiManager/aboutApi';
// import Loader from '../../user/components/loader';
// import { toast, Bounce } from 'react-toastify';

// const GET_IMAGES_API =
//   'https://vnkmxwyep1.execute-api.us-east-1.amazonaws.com/LandingImageManagementRouter/getLandingImages';
// const UPDATE_IMAGE_API =
//   'https://vnkmxwyep1.execute-api.us-east-1.amazonaws.com/LandingImageManagementRouter/updateLandingImage';

// const About = () => {
//   const [aboutData, setAboutData] = useState({});
//   const [about, setAbout] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [priceStartAt, setPriceStartAt] = useState('');

//   const [landingImages, setLandingImages] = useState([]);

//   // Fetch About Data
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await getAboutData();
//         setAboutData(response.data[0]);
//         setAbout(response.data[0].about || '');
//         setPhone(response.data[0].phone || '');
//         setPriceStartAt(response.data[0].priceStartAt || '');
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Fetch Landing Images
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(GET_IMAGES_API);
//         const data = await response.json();
//         if (data.items) {
//           // Add file field for local state tracking
//           setLandingImages(data.items.map((img) => ({ ...img, file: null })));
//         } else {
//           setLandingImages([]);
//         }
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Update About Section
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = { priceStartAt, about, phone };

//     try {
//       setLoading(true);
//       const response = await updateAboutData(aboutData.aboutId, data);
//       toast(response.message, {
//         position: 'top-right',
//         autoClose: 5000,
//         theme: 'light',
//         transition: Bounce,
//       });
//     } catch {
//       toast('Failed to update About section', { type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Local Image Preview
//   const handleImageChange = (event, index) => {
//     const file = event.target.files[0];
//     if (file) {
//       const updated = [...landingImages];
//       updated[index].file = file;
//       updated[index].previewUrl = URL.createObjectURL(file);
//       setLandingImages(updated);
//     }
//   };

//   // Upload Single Image to AWS via API Gateway
//   const handleSingleImageUpload = async (index) => {
//     const image = landingImages[index];
//     if (!image.file) {
//       toast('Please select an image first.', { type: 'warning' });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', image.file);
//     formData.append('imageId', image.imageId);

//     console.log('Uploading image:', image.imageId, image.file);

//     try {
//       setLoading(true);
//       const response = await fetch(UPDATE_IMAGE_API, {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         toast(`Image ${index + 1} uploaded successfully.`, {
//           type: 'success',
//           transition: Bounce,
//         });

//         // Update the preview to reflect new URL
//         const updated = [...landingImages];
//         updated[index].imageUrl = result.updatedItem?.imageUrl || image.previewUrl;
//         updated[index].file = null;
//         setLandingImages(updated);
//       } else {
//         toast(result.error || 'Upload failed.', { type: 'error' });
//       }
//     } catch (error) {
//       toast('Failed to upload image.', { type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
//       {/* About Section */}
//       <Typography variant="h4" gutterBottom align="center" color="primary">
//         About Section
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Price Start At"
//               variant="outlined"
//               required
//               fullWidth
//               value={priceStartAt}
//               onChange={(e) => setPriceStartAt(e.target.value)}
//               InputLabelProps={{ style: { fontSize: 12 } }}
//               InputProps={{ style: { fontSize: 14 } }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Phone"
//               variant="outlined"
//               required
//               fullWidth
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               InputLabelProps={{ style: { fontSize: 12 } }}
//               InputProps={{ style: { fontSize: 14 } }}
//             />
//           </Grid>
//         </Grid>

//         <TextField
//           label="About"
//           variant="outlined"
//           multiline
//           rows={4}
//           fullWidth
//           value={about}
//           onChange={(e) => setAbout(e.target.value)}
//           InputLabelProps={{ style: { fontSize: 12 } }}
//           InputProps={{ style: { fontSize: 13 } }}
//         />

//         <Button variant="contained" color="primary" type="submit" fullWidth>
//           Submit
//         </Button>
//       </Box>

//       {/* Landing Images Section */}
//       <Typography
//         variant="h4"
//         gutterBottom
//         align="center"
//         color="primary"
//         sx={{ mt: 8 }}
//       >
//         Landing Page Images
//       </Typography>

//       <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
//         {landingImages.map((img, index) => (
//           <Grid item xs={12} sm={4} key={img.imageId}>
//             <Card sx={{ textAlign: 'center', p: 2 }}>
//               <CardMedia
//                 component="img"
//                 image={img.previewUrl || img.imageUrl}
//                 alt={`Landing Image ${index + 1}`}
//                 sx={{
//                   borderRadius: 2,
//                   mb: 2,
//                   width: '100%',
//                   height: 150,
//                   objectFit: 'cover',
//                 }}
//               />
//               <Button variant="outlined" component="label" fullWidth sx={{ mb: 1 }}>
//                 Change Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={(e) => handleImageChange(e, index)}
//                 />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 disabled={!img.file}
//                 onClick={() => handleSingleImageUpload(index)}
//               >
//                 Upload Image
//               </Button>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Paper>
//   );
// };

// export default About;




import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
} from '@mui/material';
import { getAboutData, updateAboutData, getLandingImages, updateLandingImage } from '../../apiManager/aboutApi';
import Loader from '../../user/components/loader';
import { toast, Bounce } from 'react-toastify';

const About = () => {
  const [aboutData, setAboutData] = useState({});
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState('');
  const [priceStartAt, setPriceStartAt] = useState('');
  const [landingImages, setLandingImages] = useState([]);

  // Fetch About Data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getAboutData();
        const data = response.data[0];
        setAboutData(data);
        setAbout(data.about || '');
        setPhone(data.phone || '');
        setPriceStartAt(data.priceStartAt || '');
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch Landing Images
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getLandingImages();
        const items = response.items || [];
        setLandingImages(items.map((img) => ({ ...img, file: null })));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Update About Section
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { priceStartAt, about, phone };

    try {
      setLoading(true);
      const response = await updateAboutData(aboutData.aboutId, data);
      toast(response.message, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
        transition: Bounce,
      });
    } catch {
      toast('Failed to update About section', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Local Image Preview
  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updated = [...landingImages];
      updated[index].file = file;
      updated[index].previewUrl = URL.createObjectURL(file);
      setLandingImages(updated);
    }
  };

  // Upload Single Image
  const handleSingleImageUpload = async (index) => {
    const image = landingImages[index];
    if (!image.file) {
      toast('Please select an image first.', { type: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('imageId', image.imageId);

    try {
      setLoading(true);
      const response = await updateLandingImage(formData);
      toast(`Image ${index + 1} uploaded successfully.`, {
        type: 'success',
        transition: Bounce,
      });

      const updated = [...landingImages];
      updated[index].imageUrl = response.data?.updatedItem?.imageUrl || image.previewUrl;
      updated[index].file = null;
      setLandingImages(updated);
    } catch (err) {
      toast('Failed to upload image.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        About Section
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

      <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mt: 8 }}>
        Landing Page Images
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {landingImages.map((img, index) => (
          <Grid item xs={12} sm={4} key={img.imageId}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardMedia
                component="img"
                image={img.previewUrl || img.imageUrl}
                alt={`Landing Image ${index + 1}`}
                sx={{
                  borderRadius: 2,
                  mb: 2,
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                }}
              />
              <Button variant="outlined" component="label" fullWidth sx={{ mb: 1 }}>
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!img.file}
                onClick={() => handleSingleImageUpload(index)}
              >
                Upload Image
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default About;
