import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useState, useEffect } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [errors, setErrors] = useState({});

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {

    if (token) {
      navigate('/admin/reviews');
    }
  }, [token, navigate]);

  
  const handleError = (email,password) => {
    let errors = {};
    if(!email) errors.email = "Email is required";
    if(!password) errors.password = "Password is required";
    return errors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    const data = new FormData(event.currentTarget);
    const eamil = data.get('email');
    const password = data.get('password');

    const errors = handleError(eamil,password);
    if(Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const res = await login({ email: data.get('email'), password: data.get('password') }).unwrap();
      dispatch(setCredentials({ token: res.token }));
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('An error occurred:', error);
      setErrors({api:error.data.message});
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#2563eb' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
            />
             {errors.api && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.api}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
