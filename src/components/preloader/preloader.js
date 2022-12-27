import CircularProgress from '@mui/material/CircularProgress';
import { useSelector,  } from 'react-redux';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

export function Preloader() {
  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: 3, width: '100%', heigth: '100%'}}
    open={true}
      >
    <CircularProgress sx={{color:"#fff" }} disableShrink thickness={6}/>
  </Backdrop>

  );
}