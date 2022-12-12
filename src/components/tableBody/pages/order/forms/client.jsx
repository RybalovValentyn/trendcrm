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

export const ClientForm = ()=>{
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.client);


    const telNumberMask = (e)=>{      
        let id = e.target.id;
        let str = e.target.value.split('');
        let isNUmber = str.slice(-1);
          if (Number(isNUmber) || String(isNUmber) === '0') {
             if (str.length ===7) {
              str.push(')')
            } else if (str.length ===11) {
              str.push('-')
            } else if (str.length ===14) {
              str.push('-')
            }else if (str.length ===18) {
             return
            }
            let string = str.join('')
            dispatch(setClientForm({id, str: string}))
          }
      }
      const keyCodeInput = (e) =>{ 
        let id = e.target.id; 
        if (id === 'client_phone' && e.key === 'Backspace') {
          let str = '+38(0'
          dispatch(setClientForm({id, str})) 
        } else if (e.key === 'Backspace') {
            let s = e.target.value
          let str = s.slice(0, s.length)        
          dispatch(setClientForm({id, str}))
        }
      }
  
  const inputFocus =(e)=>{
    let id = e.target.id;
    if (id === 'client_phone'){
      let str = '+38(0'
     return dispatch(setClientForm({id, str}));
    }
    //   let str = ''
    // return  dispatch(setClientForm({id, str}))
    
  }
  const inputSwicher=(e)=>{
    let id = e.target.id;
    let str = e.target.value
    let name = e.target.name
    console.log(str);
  if (id === 'client_phone') {
    telNumberMask(e);
 } else dispatch(setClientForm({id, str}))
 };
    const renderComponents=[
        {label:'ПІБ:', name:'fio', type:'text'},
        {label:'Телефон:', name:'client_phone', type:'text'},
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
{  (str.name !== 'comment' && str.name !== 'additional_field' ) && <BootstrapInput
             key ={str.name}
            id={str.name}
            name ={str.name}
             autoComplete="off"
             value={client[str.name]}
            onKeyDown={keyCodeInput}
            onFocus={inputFocus}      
            onChange={inputSwicher}
         variant="outlined" />}
 {(str.name === 'comment' || str.name === 'additional_field' ) &&  <textarea
        style={{maxWidth: '250px',
         border: `1px solid ${colorsRef.modalInputBorderColor}`,
        borderRadius: '8px',
        width: '100%',
        resize: 'vertical',
        outline: 'none',
       height: '100px'

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