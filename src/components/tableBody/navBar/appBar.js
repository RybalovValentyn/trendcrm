import { Box, CardMedia, Typography, List, ListItem,
    Select, InputAdornment, ListItemText, MenuItem, InputBase  } from "@mui/material";
import imgLogo from '../../../images/logo.png';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { NavLink } from 'react-router-dom';
import { BootstrapTooltip } from '../pages/order/styles';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { colorsRef } from "../../../consts/colorConstants";
import { useDispatch, useSelector,  } from 'react-redux';
import userImg from '../../../images/admin.jpg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import { ExitUser } from "../../../redux/authReduser";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
    fontSize: '13px',
    maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    width: 150,
    },
  },
};

export const AppBarComponent = () =>{
    const dispatch = useDispatch();
    const name = useSelector((state) => state.auth.name);
    const [open, setOpen] = useState(false);
    const authReduser = useSelector((state) => state.auth);

const logoStyle ={
    width: '167px',
    height: '40px',
    '@media (max-width:600px)': {
        height: '30px',
        width: '180px',
      },
    marginLeft: '10px',
    objectFit: 'contain'
}
const selectStyles ={
    '& .MuiInputBase-input': {
      // maxHeight: '32px',
      lineHeight: 1.5,
    borderRadius: '8px',
    color: colorsRef.inputTextColor,
    position: 'relative',
    fontSize: 13,
    padding: '5px 0px',
  
  },
  '& .MuiOutlinedInput-root':{
    padding: '0px !important',
    paddingLeft: '14px',
    color: '#fff'
},
  
};
const handleClickOpen = (e) => {
  setOpen(!open);
};

const handleClose = () => {
    console.log('close');
  setOpen(false);
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
    return (
       <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', height: '47px'}}>
    <CardMedia component="img" image= {imgLogo}  alt="logo"
        sx={logoStyle}
      />
      <Box  sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{paddingTop: '5px', paddingRight: '20px'}}>
            <Typography sx={{fontSize: '13px', color: '#333333'}}>Тариф:{authReduser.taryf}</Typography>
            <Typography sx={{fontSize: '13px', color: '#333333'}}>Залишилося днів:{authReduser.daysToEnd}</Typography>
        </Box>
        <List sx={{padding: 0, heigth: '47px', alignItems: 'center', display: 'flex', '& :hover':{backgroundColor: '#eeeeee'}}}>
            <ListItem  sx={{heigth: '100%',width: '54px', padding: '5px 15px'}}>
                <NavLink to="/trendcrm/orders">
                    <BootstrapTooltip  title="Замовлення">
                <ListAltOutlinedIcon sx={{fill: '#777', marginTop: '5px'}} />
                     </BootstrapTooltip>
                </NavLink>
            </ListItem>
            <ListItem sx={{heigth: '100%',width: '54px', padding: '5px 15px'}}>
                <NavLink to="/trendcrm/orders">
                    <BootstrapTooltip  title="Аналітика">
                <LeaderboardOutlinedIcon sx={{fill: '#777', marginTop: '5px'}} />
                     </BootstrapTooltip>
                </NavLink>
            </ListItem>
            <ListItem sx={{heigth: '100%',width: '54px', padding: '5px 15px'}}>
                <NavLink to="/trendcrm/orders">
                    <BootstrapTooltip  title="Info">
                <InfoOutlinedIcon sx={{fill: '#777', marginTop: '5px'}} />
                     </BootstrapTooltip>
                </NavLink>
            </ListItem>



            <ListItem sx={{heigth: '100%', padding: '8px 15px', cursor: 'pointer'}} onClick={handleClickOpen} key='card'>
 
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
                    <MenuItem value={'settings'} >
                        <InfoOutlinedIcon sx={{fill: '#777', marginRight: '10px'}} />
                        <ListItemText onClick={handleUserSettings} sx={{fontSize: '12px' }} primary={'Профіль'} />                     
                    </MenuItem>
                    <MenuItem value={'back'} onClick={handleOut} >
                         <InfoOutlinedIcon sx={{fill: '#777', marginRight: '10px'}} />
                        <ListItemText sx={{fontSize: '12px' }} primary={'Вихід'} />
                    </MenuItem>


                </Select>
         

            </ListItem>
        </List>
      </Box>
       </Box>
    )
}