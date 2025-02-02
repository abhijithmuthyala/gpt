'use client';
import { login, signup } from "@/app/actions/auth";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          pt: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Welcome back
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please sign in to your account or create a new one
          </Typography>
          
          {/* Add method="post" to the form */}
          <Box component="form" method="post" width="100%" noValidate>
            <Stack spacing={2}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
              />
              
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
              />
              
              {/* Add type="submit" to buttons */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                formAction={login}
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
              
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                size="large"
                formAction={signup}
              >
                Create new account
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}