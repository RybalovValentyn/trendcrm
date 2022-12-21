import CircularProgress from '@mui/material/CircularProgress';
import { useSelector,  } from 'react-redux';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

export function Preloader() {
  // console.log('preloader');
  const loading = useSelector((state) => state.ordersAll.isLoading );
  const load = useSelector((state) => state.auth.isLoading);
  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={load || loading}
      >
    <CircularProgress sx={{color:"#fff" }} disableShrink thickness={6}/>
  </Backdrop>

  );
}