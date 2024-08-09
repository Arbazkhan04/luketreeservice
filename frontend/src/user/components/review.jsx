import { useState } from 'react';
import { Box, TextField, Button, Rating, Typography, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';

const emojisList = ['❤️', '😊', '😍', '😲', '😎'];

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isNextdoorReview, setIsNextdoorReview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleEmojiChange = (emoji) => {
    setSelectedEmojis((prev) => {
      if (prev.includes(emoji)) {
        return prev.filter((item) => item !== emoji);
      }
      return [...prev, emoji];
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      rating,
      selectedEmojis,
      additionalInfo,
      isNextdoorReview,
      selectedImage,
    });
  };

  const {token} = useSelector((state) => state.auth);

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">Admin Review Form</Typography>
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
          {/* Your existing form fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="First name"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Neighborhood name"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Link to your social media account (optional)(example facebook, linkedin, X(twitter), other)"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 13 } }}
            />
          </Grid>
          {token && (
            <>
            <Grid item xs={12} sm={6}>
            <TextField
              label="Select number of emojis"
              variant="outlined"
              fullWidth
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
                  onClick={() => handleEmojiChange(emoji)}
                >
                  {emoji}
                </Box>
              ))}
            </Box>
          </Grid>
          </>
          )
          }
          
        </Grid>
        <Typography component="legend">Select rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Please write your review here"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 13 } }}
        />

        {/* Checkbox for "Review from Nextdoor?" */}
        {token && (
          <>
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
          </>
        )}

        {/* Image upload section */}
        {selectedImage && (
          <Box sx={{ mt: 2 }}>
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height:'300px',width:'300px', borderRadius: 8 }} />
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
