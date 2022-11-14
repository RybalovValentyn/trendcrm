import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Preloader() {
  return (
    <Box sx={{ display: 'flex',position: 'fixed', top: '50%', left: '50%' }}>
      <CircularProgress />
    </Box>
  );
}