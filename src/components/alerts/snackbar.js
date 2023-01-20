import { useEffect } from "react";
import {  useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { JoinFull } from "@mui/icons-material";

export const CustomSnackBar=()=>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const message = useSelector((state) => state.ordersAll.sneckBarMessage);
    const type = useSelector((state) => state.ordersAll.typeMessage);
    let newMessage= []

    const Component =()=>{
        return(
        <Box sx={{ display: 'block', height: '100%', alignItems: 'center', maxHeight: '200px', overflowY: 'auto' }}>
        {message[0]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[0]}</Typography>:null}
        {message[1]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[1]}</Typography>:null}
        </Box>
        )
    }
    const Messages=()=>(
        <Box sx={{maxWidth: '300px', maxHeight: '400px', overflowY: 'auto'}}>
            {message[0]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[0]}</Typography>:null}
           {newMessage.map((n, i)=>{
            if (n.replace('</br>', '').replace('</b>', '').replace('<b>', '') !== ' ') {
                return(
                    <span key={i}>{n?n.replace('</br>', '').replace('</b>', ',').replace('<b>', ''):null}</span>
                )
            }
           })}
        </Box>
    )
    useEffect(() => {

        if (message?.length >1) {
                newMessage = message[1]?.split('</br>').join(',').split(',')
        }
      
        if (message?.length >=1) {
            enqueueSnackbar(Messages()?Messages():Component(),{autoHideDuration: 5000, children:Component,direction:'down', variant: type?type:'default',
            preventDuplicate: 'true', anchorOrigin:{ horizontal: 'right', vertical:'bottom' }   }) 
        } else if (typeof(message) === 'string') {
            enqueueSnackbar(message,{autoHideDuration: 5000})
        }
        
      }, [message]);
}