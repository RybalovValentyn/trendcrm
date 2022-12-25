import CircularProgress from '@mui/material/CircularProgress';
import { useSelector,  } from 'react-redux';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

export function Preloader() {
  const loading = useSelector((state) => state.ordersAll.isLoading );
  const load = useSelector((state) => state.auth.isLoading);
  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: 3, width: '100%', heigth: '100%'}}
    open={load || loading}
      >
    <CircularProgress sx={{color:"#fff" }} disableShrink thickness={6}/>
  </Backdrop>

  );
}