import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { getReviewById, updateReviewById } from "../../apiManager/reviewApi";
import { Box, TextField, Button, Rating, Typography, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { formatMeridiem } from "@mui/x-date-pickers/internals";
import Loader from '../../user/components/loader';
import { toast, Bounce } from 'react-toastify';

const emojisList = ['❤️', '😊', '😍', '😲', '😎'];

function EditReview() {

  const { reviewId } = useParams();

  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    if (file) {
      setSelectedImage(file); // Store the actual file, not the URL
    }
  };

  //fetch the review by id
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewById(reviewId);

        // Set form fields with the fetched data
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setCity(data.city || '');
        setNeighbourhoodName(data.neighbourhoodName || '');
        setSocialMediaLink(data.socialMediaLink === '<empty>' ? '' : data.socialMediaLink);
        setRating(data.ratting || 0);
        setSelectNumberOfEmojis(data.totalNumberOfEmoji || 0);
        setSelectedEmojiIndices(data.indexsOfEmoji === '<empty>' ? '' : data.indexsOfEmoji);

        setAdditionalInfo(data.review || '');
        setIsNextdoorReview(data.isNextDoorReview === "1" ? true : false || false);
        setSelectedImage(data.imageUrl || null);

        //populate the emoji list 
        data.indexsOfEmoji.split('').forEach((index) => {
          const emojiIndex = parseInt(index, 10);
          if (emojiIndex >= 0 && emojiIndex < emojisList.length) {
            setSelectedEmojis(pre => [...pre, emojisList[emojiIndex]]);
          }
        })

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [reviewId]);


  //update the review by id
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('city', city);
    formData.append('neighbourhoodName', neighbourhoodName);
    formData.append('ratting', ratting.toString());
    formData.append('status', '1');
    formData.append('socialMediaLink', socialMediaLink || '<empty>');
    formData.append('review', review);
    formData.append('indexsOfEmoji', selectedEmojiIndices.toString());
    formData.append('totalNumberOfEmoji', selectNumberOfEmojis.toString());
    formData.append('isNextDoorReview', isNextdoorReview ? '1' : '0');

    if (selectedImage instanceof File) {
      formData.append('image', selectedImage);
    } 
    

     try {
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      setLoading(true);
      const response = await updateReviewById(reviewId, formData);
      // console.log(response);
      toast('Review Updated Successfully!', {
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

  if (loading) return <h1><Loader /></h1>
  if (error) return <h1>error.message</h1>

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
              required
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
          </Grid>
        </Grid>
        <Typography component="legend">Select ratting</Typography>
        <Rating
          name="ratting"
          value={ratting}
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
          value={review}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 13 } }}
        />

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

        {selectedImage && (
          <Box sx={{ mt: 2 }}>
            <img
              src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage}
              alt="Selected"
              style={{ maxWidth: '100%', height: '300px', width: '300px', borderRadius: 8 }}
            />
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
  )
}

export default EditReview
