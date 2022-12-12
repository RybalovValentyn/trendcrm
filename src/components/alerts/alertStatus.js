import Snackbar from '@mui/material/Snackbar';
import {  useSelector} from 'react-redux';
import { useEffect, useState, forwardRef  } from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  function SimpleSnackbar() {
    const isError = useSelector((state) => state.ordersAll.isError);
    const message = useSelector((state) => state.ordersAll.error.error);
    const [open, setOpen] = useState(false);
   const vertical= 'top';
   const horizontal= 'center';

    useEffect(()=>{
        if (isError) {
          setOpen(true);
        }
         },[isError, message])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
       <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  
    </div>
  );
}
