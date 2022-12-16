import { Box, CardMedia, Typography, Select, ListItemText, MenuItem, InputBase  } from "@mui/material";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import userImg from '../../../images/admin.jpg';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState } from "react";
import { ExitUser } from "../../../redux/authReduser";
import { selectStyles, mediaUserList } from "./styles";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;



export const UserSelectItem = ()=>{
    const MenuProps = {
        PaperProps: {
          style: {
          fontSize: '13px',
          maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,    
            width: 150,
          },
        },
      };
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
        <Box onClick={handleClickOpen}>
<Box sx={mediaUserList}>
        <CardMedia component="img" image= {userImg}  alt="logo"
                        sx={{width: '30px', heigth: '30px',borderRadius: '50%', marginRight: '10px'}}
                    /> 
    
                    <Typography sx={{color: '#333333', fontSize: '13px', display: 'block'}}>{name}</Typography>
                    <Select 
                    id="demo"
                    value={''}
                    open={open}
                    onChange={handleChange}
                    input={<InputBase  sx={selectStyles}/>}
                    MenuProps={MenuProps}
                >   
                    <MenuItem value={'settings'}>
                        <AccountBoxOutlinedIcon sx={{fill: '#777', marginRight: '10px'}} />
                        <ListItemText onClick={handleUserSettings} sx={{fontSize: '12px' }} primary={'Профіль'} />                     
                    </MenuItem>
                    <MenuItem value={'back'} onClick={handleOut} >
                         <LogoutOutlinedIcon sx={{fill: '#777', marginRight: '10px'}} />
                        <ListItemText sx={{fontSize: '12px' }} primary={'Вихід'} />
                    </MenuItem>
                </Select>
                </Box>
        </Box>
    )
}