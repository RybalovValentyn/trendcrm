import {forwardRef,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { autoUpdate } from '../../redux/ordersReduser';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';


export default function CustomizedSnack() {
    const dispatch=useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const message = useSelector((state) => state.ordersAll.snackMessage);
  const type = useSelector((state) => state.ordersAll.typeMessage);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // dispatch(autoUpdate({id: 'message', str: ''}));
    
      setOpen(false);
  };
 
  useEffect(()=>{
 if (message[0]) {
    // enqueueSnackbar('I love hooks');
}
  },[message])

//   return (

//       <Snackbar
//        open={open}
//         autoHideDuration={6000}
//          onClose={handleClose}
//          anchorOrigin={{  vertical: 'bottom', horizontal: 'right',}}
//          >
//         <Alert onClose={handleClose} severity={type!==''?type:"success"} sx={{ width: '100%', alignItems:'center' }}>
//         {message[0]?<Typography sx={{display: 'block'}}>{message[0]}</Typography>:null}
//         {message[1]?<Typography sx={{display: 'block'}}>{message[1]}</Typography>:null}
//          </Alert>
//       </Snackbar>

 
//   );
}