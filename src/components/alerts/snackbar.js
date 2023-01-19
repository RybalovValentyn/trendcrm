import { useEffect } from "react";
import {  useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';

export const CustomSnackBar=()=>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const message = useSelector((state) => state.ordersAll.sneckBarMessage);
    const type = useSelector((state) => state.ordersAll.typeMessage);

    const Component =()=>{
        return(
        <Box sx={{ display: 'block', height: '100%', alignItems: 'center' }}>
        {message[0]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[0]}</Typography>:null}
        {message[1]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[1]}</Typography>:null}
        </Box>
        )
    }
    
    useEffect(() => {
        if (message?.length >=1) {
            console.log(message);
            enqueueSnackbar(Component(),{autoHideDuration: 5000, children:Component,direction:'down', variant: type?type:'default',
            preventDuplicate: 'true', anchorOrigin:{ horizontal: 'right', vertical:'bottom' }   }) 
        } else if (typeof(message) === 'string') {
            enqueueSnackbar(message,{autoHideDuration: 5000})
        }
        
      }, [message]);
}