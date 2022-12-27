import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import vodafone from '../../../../images/vodafone.png';
import { CardMedia, Box, Link } from '@mui/material';
import tel from '../../../../images/tel.png';
import kievstar from '../../../../images/kyivstar.png';
import lifecall from '../../../../images/life.png';
import instagram from '../../../../images/instagram.png';
import { NavLink } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import { BootstrapTooltip } from './styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function GetRowsComparator({row}) {
   
const {value, id, color} = row
const dataForSelect = useSelector((state) => state.ordersAll.payment_type);

    const operators = {
        "63": "lifecell",
        "93": "lifecell",
        "73": "lifecell",
        "50": "vodafone",
        "66": "vodafone",
        "95": "vodafone",
        "99": "vodafone",
        "39": "kievstar",
        "67": "kievstar",
        "68": "kievstar",
        "96": "kievstar",
        "97": "kievstar",
        "98": "kievstar",
      };
 const logoStyle ={
        width: '15px',
        height: '15px',
        display: 'block',
        borderRadius: '50%',
        marginRight: '5px',    
      };
const phoneBoxStyle={
        display: 'flex',
        alignItems: 'center',  
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
         minWidth: 'max-content',
      } ;

switch (id) {
        case 'client_phone':
if (value!=='' && value!== ' ') {

        let num = value?.split('').splice(3,2).join('') ;

        const imageReplace=()=>{
            if (operators[num] === "vodafone") {
                return vodafone
            } else if (operators[num] === "kievstar") {
                return kievstar
            } else if (operators[num] === "lifecell") {
                return lifecall
            }else return tel
        }

        return (  <Box sx={phoneBoxStyle}> {(value && imageReplace()) && <CardMedia component="img" image= {imageReplace()} sx={logoStyle} alt='tel_image'/>} 
            <span style={{marginLeft: imageReplace()?'0px':'17px'}}>{value}</span></Box>)    
        };
break;
case 'status_name':
            return(<Chip sx={{backgroundColor: color, maxHeight: '18px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis',
             color: '#fff', padding: '0px 10px', border: 'none'}} label={value} size="small" variant="outlined" />)
case 'ttn_status':
    let ttnStatusStyle={
        display: 'block',
        maxWidth: '150px',
        backgroundColor: '#fff',
        overflow: 'clip'
    }
    return (<p style={ttnStatusStyle}>{value}</p>)
case 'ig_username':
if (value) {
return (  <Box sx={phoneBoxStyle}> {value && <CardMedia component="img" image= {instagram} sx={{width: '19px',height: '19px', marginRight: '5px'}} alt='instagram'/>} 
    <NavLink style={{ color: '#bf1c80', '&:hover':{color: '#1E88E5',}}} to='/trendcrm/message'>{value}</NavLink></Box>) 

};
break;
case 'store_url':
    if (value) {
        return ( <a style={{color: '#1E88E5', width: '100%', alignContent: 'left'}}  
        rel="noreferrer" target="_blank" underline="none" href={`https://${value}`}>{value}</a>)    
    };
    break;
case 'comment':
        return (<Box sx={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis',
         display: 'flex', alignItems: 'center'}}><HelpIcon sx={{width: '17px', heigth: '17px', marginRight: '5px'}}/>
         <BootstrapTooltip  title={value}><span>{value}</span></BootstrapTooltip>
        </Box> )  
case 'delivery_type_id':
    return (`??? ${value}` );
    
case 'delivery_type':
    let textColor = "#d0d0d0"
    if (value === "Новая Почта") {
        textColor = "#dc3545"
    } else if(value === "justin"){
        textColor = "#304ffe"
    } else if(value === "УкрПочта"){
        textColor = "#104f6e"
    }
    return (<span style = {{color: `${textColor}`}}>{value}</span> ); 
 case 'payment_type':
          let data = dataForSelect.find(n=>n.id===value)?dataForSelect.find(n=>n.id===value).name:'Нема даних'
// console.log(dataForSelect, value);
        return data
case 'products_names':
        return (
            <Box sx={{maxWidth: '100px', overflow: 'hidden'}}>
                {value}
            </Box>
    );
    

        default:
           return value
            
    }

// if (id ==='client_phone') {
//     if (value) {
//         return (<Chip label={value} size="small" variant="outlined" />)
//     } 
// }
// return(
//     value
// )

}




// 'client_phone'