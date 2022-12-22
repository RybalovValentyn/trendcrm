import { useDispatch, useSelector,  } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SimpleBackdrop() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const load = useSelector((state) => state.auth.isLoading);
  const loading = useSelector((state) => state.ordersAll.isLoading );

console.log('global preloader');
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load || loading}
          >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}