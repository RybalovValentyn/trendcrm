import { Box, CardMedia, Typography,  ListItemText,List, ListItem  } from "@mui/material";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import userImg from '../../../images/admin.jpg';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState } from "react";
import { ExitUser } from "../../../redux/authReduser";
import { mediaUserBoxStyle, mediaUserListStyle } from "./styles";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


export const UserSelectMobil = ()=>{


    const dispatch = useDispatch();
    const name = useSelector((state) => state.auth.name);
    const [open, setOpen] = useState(false);

const handleClickOpen = (e) => {
        setOpen(!open);
 };
    const handleChange=()=>{
        handleClose()
    }
    
    const handleUserSettings=()=>{
        console.log('handleUserSettings');
    
    }
    const handleOut =()=>{
    dispatch(ExitUser())
    }

    const handleClose = () => {
        console.log('close');
      setOpen(false);
    };

    return(
        <Box sx={{width: '100%', heigth: '100%', backgroundColor: open?'#f7f7f7':'#fff' }}>
        <Box sx={{"& :hover":{cursor: 'pointer', backgroundColor: '#eeeeee'},}}  onClick={handleClickOpen}>
                 <Box sx={mediaUserBoxStyle}>
                  <CardMedia component="img" image= {userImg}  alt="logo"
                        sx={{width: '30px', heigth: '30px',borderRadius: '50%', marginRight: '10px'}}  /> 
    
                    <Typography sx={{color: '#333333', fontSize: '13px', display: 'block'}}>{name}</Typography>
                    <KeyboardArrowDownOutlinedIcon sx={{color: '#777'}}/>
                    </Box>
                     {open?<List sx={mediaUserListStyle}>
                    <ListItem value={'settings'}>
                        <AccountBoxOutlinedIcon sx={{fill: '#777', marginRight: '10px'}} />
                        <ListItemText onClick={handleUserSettings} sx={{fontSize: '12px', color: "#000", }} primary={'Профіль'} />                     
                    </ListItem>
                    <ListItem  value={'back'} onClick={handleOut} >
                         <LogoutOutlinedIcon sx={{fill: '#777', marginRight: '10px'}} />
                        <ListItemText sx={{fontSize: '12px', color: "#000", }} primary={'Вихід'} />
                    </ListItem>
                    </List>: null}
                
        </Box>
        </Box>
    )
}