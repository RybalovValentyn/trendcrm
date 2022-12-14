import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { AddProductComponent } from './product';
import { AddHistoryComponent } from './history';
import {boxStyle, listStyle, itemStyle, iconStyle} from './style';


export const HeaderOrder = ()=>{

  
return(
    <Box sx={boxStyle}>
       <List sx={listStyle}>

        <ListItem sx={itemStyle}>
        <MailOutlineOutlinedIcon  sx={iconStyle}/>
        </ListItem>

        <ListItem sx={itemStyle}>
        <PhoneOutlinedIcon sx={iconStyle}/>
        </ListItem>

        <ListItem sx={itemStyle}>
        <NotificationsNoneOutlinedIcon sx={iconStyle}/>
        </ListItem>

        </List>

        <List sx={listStyle}>
            <ListItem  sx={{padding: '5px 0px 5px 10px', "& :hover": {cursor: 'pointer', borderRadius: '50px'} }}>
                <AddProductComponent/>
            </ListItem>

            <ListItem sx={{padding: '5px 0px 5px 10px', "& :hover": {cursor: 'pointer',borderRadius: '50px' } }}>
                <AddHistoryComponent/>
            </ListItem>
        </List>
    </Box>
)
}