import { Box, CardMedia, Typography, List, ListItem, } from "@mui/material";
import imgLogo from '../../../images/logo.png';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { NavLink } from 'react-router-dom';
import { BootstrapTooltip } from '../pages/order/styles';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState } from "react";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { logoStyle } from "./styles";
import { UserSelectItem } from "./userSelect";
import { MobiNavList } from "./mibiNavList.jsx";
import { boxListStyle, navlogoStyle, navListStyle, mediaIconLogoList } from "./styles";
import { UserSelectMobil } from "./userSelectMob";


export const AppBarComponent = () =>{
    const dispatch = useDispatch();

    const authReduser = useSelector((state) => state.auth);
    const [isShow, setIsShow] =useState(false);

const isShowMediaUserList=()=>{
    setIsShow(!isShow);
}

    return (
    
       <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', height: '47px'}}>
    <Box sx={navlogoStyle}>
         <CardMedia component="img" image= {imgLogo}  alt="logo"sx={logoStyle} />
     
                <Box sx={{paddingTop: '5px', paddingRight: '20px'}}>
                    <Typography sx={{fontSize: '13px', color: '#333333'}}>Тариф:{authReduser.taryf}</Typography>
                    <Typography sx={{fontSize: '13px', color: '#333333'}}>Залишилося днів:{authReduser.daysToEnd}</Typography>
                </Box>
        </Box>
    <Box  sx={navListStyle}>
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

            <ListItem sx={mediaIconLogoList} onClick={isShowMediaUserList}>
                <AccountTreeOutlinedIcon sx={{fill: '#777', marginTop: '5px'}}/>
            </ListItem>


            <ListItem sx={{padding: '0px' ,'@media (max-width:768px)': { display: 'none'},}}  key='card'> 
                 <UserSelectItem/>         

            </ListItem>
        </List>

{ isShow? 
<Box sx={boxListStyle}>
<UserSelectMobil />  
<MobiNavList authReduser={authReduser}/>
</Box>:null}

      </Box>
       </Box>
    )
}