import { useState } from 'react';
import { Box, TextField, Button, Rating, Typography, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { createReview } from '../../apiManager/reviewApi';
import Loader from './loader';
import { toast,Bounce } from 'react-toastify';
import Resizer from 'react-image-file-resizer';


const emojisList = ['❤️', '😊', '😍', '😲', '😎'];

const ReviewForm = () => {
  const [ratting, setRating] = useState(0);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [selectNumberOfEmojis, setSelectNumberOfEmojis] = useState(0);
  const [selectedEmojiIndices, setSelectedEmojiIndices] = useState('');
  const [review, setAdditionalInfo] = useState('');
  const [isNextdoorReview, setIsNextdoorReview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [neighbourhoodName, setNeighbourhoodName] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');

  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState('');
  const [loading,setLoading] = useState(false);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!neighbourhoodName) errors.neighbourhoodName = 'Neighbourhood name is required';
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!city) errors.city = 'City is required';
    if (ratting === 0) errors.ratting = 'Rating is required';
    if (review.trim().length < 10) errors.review = 'Review must be at least 10 characters long';
    if (selectedEmojis.length > 2) errors.selectedEmojis = 'You can select up to 2 emojis only';

    if (!selectedImage) errors.selectedImage = 'Image is required';
    if (imageError) errors.imageError = imageError; // Ensure image format is valid

    return errors;
  };



  const handleEmojiChange = (emoji, index) => {
    setSelectedEmojis((prev) => {
        if (prev.includes(emoji)) {
            // Emoji already selected: Remove it and its index from selected lists
            const updatedEmojis = prev.filter((item) => item !== emoji);
            setSelectedEmojiIndices((prevIndices) => {
                // Remove the index from the string
                const updatedIndices = prevIndices.split('')
                    .filter(i => i !== index.toString())
                    .join('');
                return updatedIndices;
            });
            return updatedEmojis;
        } else if (prev.length < 2) {
            // New emoji selection: Add it and its index, ensuring no duplicates
            setSelectedEmojiIndices((prevIndices) => {
                // Check if the index is already in the string
                if (!prevIndices.includes(index.toString())) {
                    return prevIndices + index.toString();
                }
                return prevIndices;
            });
            return [...prev, emoji];
        } else {
            return prev;  // No changes if more than 2 emojis are selected
        }
    });
};


const handleImageChange = (event) => {
  const file = event.target.files[0];
  const validImageTypes = ['image/jpeg', 'image/png'];

  if (file && validImageTypes.includes(file.type)) {
    Resizer.imageFileResizer(
      file,
      81, // width in pixels
      77, // height in pixels
      file.type === 'image/jpeg' ? 'JPEG' : 'PNG', // output format
      100, // quality percentage
      0, // rotation degree
      (uri) => {
        setImageError('');
        setSelectedImage(uri);
      },
      'blob' // output type: 'base64' or 'blob'
    );
  } else {
    setImageError('Please upload a jpg or png file.');
    setSelectedImage(null);
  }
};

  const resetForm = () => {
    setRating(0);
    setSelectedEmojis([]);
    setSelectNumberOfEmojis(0);
    setSelectedEmojiIndices('');
    setAdditionalInfo('');
    setIsNextdoorReview(false);
    setSelectedImage(null);
    setFirstName('');
    setLastName('');
    setCity('');
    setNeighbourhoodName('');
    setSocialMediaLink('');
    setValidationErrors({});
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('city', city);
    formData.append('neighbourhoodName', neighbourhoodName);
    formData.append('ratting', ratting.toString());
    formData.append('status', '1');
    formData.append('socialMediaLink', socialMediaLink);
    formData.append('review', review);
    formData.append('indexsOfEmoji', selectedEmojiIndices);
    formData.append('totalNumberOfEmoji', selectNumberOfEmojis.toString());
    formData.append('isNextDoorReview', isNextdoorReview ? '1' : '0');
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      setLoading(true);
      const response = await createReview(formData);
      console.log(response);
      resetForm();
      
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
      setError(error);
    }finally{
      setLoading(false);
    }
  };

  const { token } = useSelector((state) => state.auth);

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">Write Review</Typography>
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
              label="First name"
              variant="outlined"

              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!validationErrors.firstName}
              helperText={validationErrors.firstName}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"

              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={!!validationErrors.city}
              helperText={validationErrors.city}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Neighborhood name"
              variant="outlined"
              fullWidth
              value={neighbourhoodName}
              onChange={(e) => setNeighbourhoodName(e.target.value)}
              error={!!validationErrors.neighbourhoodName}
              helperText={validationErrors.neighbourhoodName}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Link to your social media account (optional)"
              variant="outlined"
              fullWidth
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 13 } }}
            />
          </Grid>

          {token && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Emoji selected"
                  variant="outlined"
                  fullWidth
                  value={selectNumberOfEmojis}
                  onChange={(e) => setSelectNumberOfEmojis(e.target.value)}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  InputProps={{ style: { fontSize: 13 } }}
                  sx={{ mt: 3 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography>Select up to 2 Emojis:</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {emojisList.map((emoji, index) => (
                    <Box
                      key={index}
                      sx={{
                        padding: 1,
                        borderRadius: 2,
                        border: `2px solid ${selectedEmojis.includes(emoji) ? '#1976d2' : '#ccc'}`,
                        cursor: 'pointer',
                        fontSize: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                      }}
                      onClick={() => handleEmojiChange(emoji, index)}
                    >
                      {emoji}
                    </Box>
                  ))}
                </Box>
                {selectedEmojiIndices}
              </Grid>
            </>
          )}
        </Grid>
        <Typography component="legend">Select ratting</Typography>
        <Rating
          name="ratting"
          value={ratting}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          error={!!validationErrors.ratting}
          helperText={validationErrors.ratting}
          sx={{ mb: 2 }}
        />
        {validationErrors.ratting && (
          <Typography color="error">{validationErrors.ratting}</Typography>
        )}
        <TextField
          label="Please write your review here"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={review}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          error={!!validationErrors.review}
          helperText={validationErrors.review}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 13 } }}
        />

        {token && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isNextdoorReview}
                onChange={(e) => setIsNextdoorReview(e.target.checked)}
                color="primary"
              />
            }
            label="Review from Nextdoor?"
            sx={{ mt: 2 }}
          />
        )}

        {(imageError || validationErrors.selectedImage) && (
          <Typography color="error" sx={{ mb: 2 }}>
            {imageError || validationErrors.selectedImage}
          </Typography>
        )}

        {selectedImage && (
          <Box sx={{ mt: 2 }}>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', height: '300px', width: '300px', borderRadius: 8 }} />
          </Box>
        )}
        <Button
          variant="contained"
          component="label"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#115293',
            },
            textTransform: 'none',
          }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

export default ReviewForm;
