import {Paper,Typography, List } from '@mui/material';
import { StyledList } from "./styles"
import { useDispatch, useSelector,  } from 'react-redux';
import { typographyStyle } from './styles';
import { formStyle } from './styles';
import { boxStyle } from './styles';
import {Label } from './styles';
import { setClientForm } from '../../../../../redux/ordersReduser';
import {Box, } from '@mui/material';
import { BootstrapInput } from './styles';
import { colorsRef } from '../../../../../consts/colorConstants';
import { IMaskInput } from 'react-imask';
import { forwardRef, useState, useRef } from 'react';


export const ClientForm = ()=>{
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.client);
    const updateClient = useSelector((state) => state.ordersAll.updateClient);
    const clientPhone = useSelector((state) => state.ordersAll.client.phone);
    const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);


  const handleChangeTel=(value)=>{
    // console.log(value);
dispatch(setClientForm({id: 'phone', str: String(value)}))
  }

  const inputSwicher=(e)=>{
    let id = e.target.id;
    let str = e.target.value
 dispatch(setClientForm({id, str}))
 };

    const renderComponents=[
        {label:'ПІБ:', name:'fio', type:'text'},
        {label:'Телефон:', name:'phone', type:'text'},
        {label:'E-mail:', name:'email', type:'e-mail'},
        {label:'Instagram:', name:'ig_username', type:'text'},
        {label:'Коментарій:', name:'comment', type:'textarea'},
        {label:'Доп. поле:', name:'additional_field', type:'textarea'},
        
    ]
    return(
        <Paper component="form" sx={formStyle}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         КЛІЄНТ:
        </Typography >
        <List>
    {renderComponents.map((str, ind)=>(
        <StyledList key={ind} >
        <Box sx={boxStyle} autoComplete="off" >
        {str.label && <Label htmlFor="named-select">
        {str.label}
        </Label>}
{  (str.name !== 'comment' && str.name !== 'additional_field' && str.name !== 'phone' ) && <BootstrapInput
             key ={str.name}
            id={str.name}
            name ={str.name}
             autoComplete="off"
             value={client[str.name]}
            // onKeyDown={keyCodeInput}
            // onFocus={inputFocus}      
            onChange={inputSwicher}
           variant="outlined"
         sx={{boxShadow: updateClient[str?.name] === 1?'0px 0px 5px 1px #0322ff9e':null}}
         />}
  {  (str.name !== 'comment' && str.name !== 'additional_field' && str.name === 'phone' ) && 
<Box sx={{border: '1px solid #d0d0d0', borderRadius: '8px', width: '100%', maxWidth: '250px', padding: '2px 5px 2px 10px', 
boxShadow: updateClient.phone === 1?'0px 0px 5px 1px #0322ff9e':null, overflowX: 'hidden', fontSize: '14px'
}}>
<IMaskInput
    mask={!isUpdateRows?"+38(#00) 000-00-00":"##(#00) 000-00-00"}
    value={clientPhone}
    unmask={true} 
    definitions={!isUpdateRows?{
      '#': /[0-9]/,
    }:{'#': /[0-9]/}}
    onAccept={
      (value, mask) =>handleChangeTel(value)
    }
    placeholder='+38(___) ___-___'
/>
</Box>
         }

 {(str.name === 'comment' || str.name === 'additional_field' ) &&  <textarea
        style={{maxWidth: '250px',
         border: `1px solid ${colorsRef.modalInputBorderColor}`,
        borderRadius: '8px',
        width: '100%',
        resize: 'vertical',
        outline: 'none',
       height: '100px',
       boxShadow: updateClient[str?.name] === 1?'0px 0px 5px 1px #0322ff9e':null
        }}
        
        value={client[str.name]}
        id={str.name}
        onChange={inputSwicher}
         ></textarea>}
        </Box>

        </StyledList>
    ))}

</List>
        </Paper>
    )
}