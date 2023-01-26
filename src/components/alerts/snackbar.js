import { useEffect, useState } from "react";
import {  useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { JoinFull } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';
import { autoUpdate } from "../../redux/ordersReduser";


export const CustomSnackBar=()=>{
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const message = useSelector((state) => state.ordersAll.sneckBarMessage);
    const type = useSelector((state) => state.ordersAll.typeMessage);

    let newMessage= []


    const handleClouse=()=>{
        console.log('clouse');
        // dispatch(autoUpdate({id: 'openMessage', str: false}));
        dispatch(autoUpdate({id: 'sneckBarMessage', str: null}));
        dispatch(autoUpdate({id: 'message', str: []}));
        closeSnackbar()
    }

    const Component =()=>{
        console.log('Component');
        return(
        <Box sx={{ display: 'block', height: '100%', alignItems: 'center', maxHeight: '200px', overflowY: 'auto', maxWidth: '250px' }}>
        <IconButton aria-label="delete" size="small">
        <CancelOutlinedIcon fontSize="inherit" />
        </IconButton>
        {message[0]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[0]}</Typography>:null}
        {message[1]?<Typography sx={{display: 'block', maxWidth: '250px'}}>{message[1]}</Typography>:null}
        </Box>
        )
    }
    const Messages=()=>(
            <Box sx={{maxWidth: '250px', maxHeight: '200px', overflowY: 'auto'}}>
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

    const ComponentClose=()=>(
        `<div class='noty-style' >
        <button id='noty-style-button' >{ Закрити всі } </button>      
       </div>`
    )
    const el = document.querySelector('.SnackbarContainer-bottom')
   
    useEffect(()=>{
        if (el) {
            // console.log(el.childElementCount);
            el.addEventListener("click",(e)=>{
                  if (e.target.nodeName === 'BUTTON') {
                    handleClouse()
                }
            })
            const secondElement = document.querySelector('#noty-style-button')
            if (!secondElement) {
                el.insertAdjacentHTML('afterbegin',ComponentClose()   )   
            }
            
        }

    }, [el, message])

    useEffect(() => {

        if (message?.length >1) {
                newMessage = message[1]?.split('</br>').join(',').split(',')
        }
      
        if (message?.length >=1) {
            enqueueSnackbar(Messages()?Messages():Component(),{autoHideDuration: 10000, children:Component, direction:'down', variant: type?type:'default',
            preventDuplicate: 'true', anchorOrigin:{ horizontal: 'right', vertical:'bottom' },
        }) 

        } else if (typeof(message) === 'string') {
            enqueueSnackbar(message,{autoHideDuration: 8000,
        })
        }
        
      }, [message]);
}