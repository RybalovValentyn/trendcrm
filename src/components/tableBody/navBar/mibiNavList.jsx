import { Box, CardMedia, Typography, List, ListItem,
    Select, InputAdornment, ListItemText, MenuItem, InputBase  } from "@mui/material";
import imgLogo from '../../../images/logo.png';
import {logoStyle} from './styles';
import { boxListStyle } from "./styles";


export const MobiNavList =(authReduser)=>{


const boxStyleList={
     width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    height: '45px',
    borderTop: '1px solid #d0d0d0',
}
    return(

        <Box sx= {boxStyleList}>
                <CardMedia component="img" image= {imgLogo}  alt="logo"sx={logoStyle} />
                <Box sx={{paddingTop: '5px', paddingRight: '20px'}}>
                    <Typography sx={{fontSize: '13px', color: '#333333'}}>Тариф:{authReduser.taryf}</Typography>
                    <Typography sx={{fontSize: '13px', color: '#333333'}}>Залишилося днів:{authReduser.daysToEnd}</Typography>
                </Box>



        </Box>
    )
}