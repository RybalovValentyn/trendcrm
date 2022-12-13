import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const HeaderOrder = ()=>{

    const boxStyle = {
        maxWidth: '80%', 
        minWidth: '200px',
         width: '60%',

    };
const listStyle={
    display: 'flex', 
    justifyContent: 'flex-start',
    padding: '0px',

}

const itemStyle={
    borderRadius: '50%', 
    border: 'none',
    //  padding: '5px 5px',
    //   width: '30px', 
    //   height: '30px', 
      textAlign: 'center',
      marginLeft: '5px',
      '& :hover':{
        backgroundColor: '#f1f1f1',
        border: '1px solid #d2d2d3',
        borderRadius: '50%',
        cursor:'pointer',
        color: '#575757'
      }

}
const iconStyle = {
    color: '#272727',

}
return(
    <Box sx={{boxStyle}}>
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
    </Box>
)
}