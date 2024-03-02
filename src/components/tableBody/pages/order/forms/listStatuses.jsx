import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { colorsRef } from '../../../../../consts/colorConstants';
import { Paper, Autocomplete, TextField, Typography } from '@mui/material';
import {autocompliteInputStyle, BootstrapInput,
    textFieldStyles} from './styles';
import { getFormTable } from '../../../../../redux/ordersReduser';
import { modalOpenUpdate } from '../../../../../redux/statusReduser';

import { ValidationTextField } from '../../../../inputs/stylesInputs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { getCookie } from '../functionOrder';
import { useEffect } from 'react';

export const ListAutocompliteStatuses =()=>{
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.ordersAll.getStatuses);
    const statusCreate = {name: 'створити статус', statusId: '0'};
    const renderStatuses = statuses.concat(statusCreate).reverse()
    const defaultStatus = renderStatuses.find(str=> str.id === '4'); 
    const [locale, setLocale] = useState('uk');
    const renderFilteredStatus = renderStatuses.reduce((acc, status, index, array)=>{
        let el = array.filter(option => option.name === status.name)
        if (el.length > 1 ) {
            array.splice(index, 1)
        }
       return array
     },[])
     const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
    const responsibleList = useSelector((state) => state.ordersAll.responsible);
    const groups = useSelector((state)=> state.addStatus.groups);
    const newGroup = {id: "0", name: "Без групи", disabled: "0"};
    const noGroups = groups.concat(newGroup).reverse();
    const userGroup = String(getCookie('user.group'))
    const defaultGroup = noGroups.find(str=> str.id === userGroup);
    const defaultRespinsible = responsibleList.find(str=> str.id === '0');
    const storeUrl = useSelector((state) => state.ordersAll.createRows.store_url);
    const clientDate = useSelector((state) => state.ordersAll.createRows.date_create);
     const createRows = useSelector((state) => state.ordersAll.createRows);
     const id = useSelector((state) => state.ordersAll.createRows.id);
     const date =new Date()
     const [value, setValue] =useState(dayjs(date));

     useEffect(()=>{
        if (!isUpdateRows) {
            let str = value.format('YYYY-MM-DD T HH:mm:ss').toString().split(' ')[0];
            dispatch(getFormTable({id: 'date_create', str }))         
        }   
     },[])

const onAutocompliteChange=(e, newValue, id)=>{   
     if (newValue.statusId === '0') {
       return dispatch(modalOpenUpdate(true)) 
    } else dispatch( getFormTable({id, str: newValue.id }))

};

const onAutocompliteResponsible=(e, newValue, id)=>{
    console.log('userGroup');
    dispatch( getFormTable({id, str:newValue.id }))
}
const inputChange=(e)=>{
    let id = e.target.id
    let str = e.target.value
    dispatch( getFormTable({id, str }))
}

const daateChange =(newValue) =>{
    let id = 'date_create'
    let str = newValue?.format('YYYY-MM-DD HH:mm:ss')?.toString()?.split(' ')[0];
    dispatch(getFormTable({id, str }))
      }

const listStyle={
    display: 'flex',
    padding: '7px 12px',
    borderRadius: '8px',
    width: 'max-content'
   
}

const listItemStyles={
    margin: '0px 5px',
    padding: 0,
    maxWidth: '160px'
}
const paperStyle={
    width: '80%',
    maxWidth: '870px',
     minWidth: '600px',
      boxShadow: 'none',
       backgroundColor: '#ededed',
 '@media (max-width:924px)': {
    maxWidth: '100%',
     width: '100%',
     justifyContent: 'space-between',
      },
}

    return(
        <Paper sx={paperStyle}>
        <List sx={{padding: '0px',  display: 'flex'}}>
            {id?<ListItem sx={{margin: '0px 5px',padding: 0,maxWidth: '130px'}}>
                <Typography sx={{fontWeight: '700', fontSize: '14px'}}>Замовлення № {id}</Typography>
            </ListItem>:null}
            <ListItem sx={listItemStyles}>

            <Autocomplete
                id={'status'}
                onChange={(e, newValue, id)=>onAutocompliteChange(e, newValue, id ='status' )}
                value={createRows.status && createRows.status !== '0'?renderFilteredStatus.find(n=>n.id === createRows.status): defaultStatus}                
                options={renderFilteredStatus}
                readOnly={!isUpdateRows}
                disableClearable
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                    <li key={option.id} style={listStyle} {...props}>
                      {option.style && <span style={{display: 'block',width: '15px', height: '15px', 
                      borderRadius: '50%', backgroundColor: option.style, marginRight: '10px'}}></span>}
                      {option.name}
                    </li>
                  )}              
                  sx={autocompliteInputStyle}
                  renderInput={(params) => <TextField sx={textFieldStyles}  {...params} />}
              />

    </ListItem>
    <ListItem sx={listItemStyles}>
        <Autocomplete
            disablePortal
                id={'responsible'}
                 onChange={(e, newValue, id)=>onAutocompliteResponsible(e, newValue, id = 'responsible')}
                value={(createRows?.responsible && createRows?.responsible !== '0'?
                responsibleList?.find(n=>n.id === createRows?.responsible):defaultRespinsible)
                ?responsibleList?.find(n=>n.id === createRows?.responsible):null }
                options={responsibleList} 
                 getOptionLabel={(option) => option.name}        
                sx={autocompliteInputStyle}
                disableClearable
                renderInput={(params) => <TextField sx={textFieldStyles}  {...params} />}
                 />
    </ListItem>
    <ListItem sx={listItemStyles}>
        <Autocomplete
            disablePortal
            disableClearable
               id={'responsible_group'}
                 onChange={(e, newValue, id)=>onAutocompliteResponsible(e, newValue, id = 'responsible_group')}
                value={createRows.responsible_group && createRows.responsible_group !== '0'?groups.find(n=>n.id === createRows.responsible_group):defaultGroup}
                options={noGroups}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li style={listStyle} {...props}>
                    {option.style && <span style={{display: 'block',width: '15px', height: '15px', 
                    borderRadius: '50%', backgroundColor: option.style, marginRight: '10px'}}></span>}
                    {option.name}
                  </li>
                )}              
                sx={autocompliteInputStyle}
                renderInput={(params) => <TextField sx={textFieldStyles}  {...params} />}
                 />
     </ListItem>

   { !isUpdateRows ? <ListItem sx={listItemStyles} >
            <BootstrapInput   
            onChange={inputChange}
            sx={{backgroundColor: colorsRef.formBgColor,minWidth: '100px', maxWidth: '160px', width: '100%',  textAlign: 'center' }} 
            placeholder={'Сайт'}
             value={storeUrl}
              id="store_url"
             variant="outlined" />
   </ListItem>:null}
   {  !isUpdateRows ? <ListItem sx={listItemStyles} >
     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DatePicker
             id={'date_create'}            
            inputFormat="YYYY-MM-DD"
             value={clientDate?clientDate:null}
             onChange={daateChange}
            renderInput={(params) => <ValidationTextField sx={{backgroundColor: colorsRef.formBgColor, borderRadius: '8px'}} align='center' {...params} />}
        />
    </LocalizationProvider>
     </ListItem>: null}
        </List>
        </Paper>
    )
}