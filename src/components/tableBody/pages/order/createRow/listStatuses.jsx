import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { colorsRef } from '../../../../../consts/colorConstants';
import { Paper, Typography, Autocomplete, TextField } from '@mui/material';
import {autocompliteInputStyle, BootstrapInput,
    textFieldStyles, Label, inputStyle, boxStyle} from './styles';
import { getFormTable } from '../../../../../redux/ordersReduser';
import { modalOpenUpdate } from '../../../../../redux/statusReduser';

import { ValidationTextField } from '../../../../inputs/stylesInputs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const ListAutocompliteStatuses =()=>{
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.ordersAll.getStatuses);
    const statusCreate = {name: 'створити статус', statusId: '0'};
    const renderStatuses = statuses.concat(statusCreate).reverse()
    const defaultStatus = renderStatuses.find(str=> str.id === '4'); 

    const renderFilteredStatus = renderStatuses.reduce((acc, status, index, array)=>{
        let el = array.filter(option => option.name === status.name)
        if (el.length > 1 ) {
            array.splice(index, 1)
        }
       return array
     },[])

    const responsibleList = useSelector((state) => state.ordersAll.responsible);
    const groups = useSelector((state)=> state.addStatus.groups);
    const newGroup = {id: "0", name: "Без групи", disabled: "0"};
    const noGroups = groups.concat(newGroup).reverse();
    const defaultGroup = noGroups.find(str=> str.id === '0');
    const storeUrl = useSelector((state) => state.ordersAll.createRows.store_url);
    const clientDate = useSelector((state) => state.ordersAll.createRows.datetime);


const onAutocompliteChange=(e)=>{    
    let id = e.target.id.split('-')[0]
    let ind = e.target.id.split('-')[2]
    let stat = renderFilteredStatus[ind]
    console.log(Number(stat?.statusId) === 0);
    if (Number(stat?.id)) {
        let str = stat?.id? stat.id: 0;        
       dispatch( getFormTable({id, str }))
    } else if (Number(stat?.statusId) === 0) {
             dispatch(modalOpenUpdate(true))
    }};

const onAutocompliteResponsible=(e)=>{
    let id = e.target.id.split('-')[0]
    let ind = e.target.id.split('-')[2]
    let str = ind
    dispatch( getFormTable({id, str }))
}
const onAutocompliteGrop =(e)=>{
    let id = e.target.id.split('-')[0]
    let ind = e.target.id.split('-')[2]
    let str = noGroups[ind]?noGroups[ind].id: ''
    dispatch( getFormTable({id, str }))
}
const inputChange=(e)=>{
    let id = e.target.id
    let str = e.target.value
    dispatch( getFormTable({id, str }))
}

const daateChange =(newValue) =>{
    let id = 'datetime'
    let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString();
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

    return(
        <Paper sx={{width: '100%', backgroundColor: colorsRef.boxTableColor, boxShadow: 'none'}}>
        <List sx={{padding: '0px',  display: 'flex'}}>
            <ListItem sx={listItemStyles}>

            <Autocomplete
                id={'status'}
                onChange={onAutocompliteChange}
                value={defaultStatus}                
                options={renderFilteredStatus}
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
                 onChange={onAutocompliteResponsible}
                defaultValue={responsibleList[0]}
                options={responsibleList}          
                sx={autocompliteInputStyle}
                renderInput={(params) => <TextField sx={textFieldStyles}  {...params} />}
                 />
    </ListItem>
    <ListItem sx={listItemStyles}>
        <Autocomplete
            disablePortal
                id={'group_name'}
                 onChange={onAutocompliteGrop}
                value={defaultGroup}
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

    <ListItem sx={listItemStyles} >
            <BootstrapInput   
            onChange={inputChange}
            sx={{backgroundColor: colorsRef.formBgColor,minWidth: '100px', maxWidth: '160px', width: '100%'}} 
            placeholder={'Сайт'}
             value={storeUrl}
              id="store_url"
             variant="outlined" />
     </ListItem>
     <ListItem sx={listItemStyles} >
        <LocalizationProvider   dateAdapter={AdapterDayjs}>
             <DatePicker
             id={'datetime'}            
            inputFormat="YYYY-MM-DD"
             value={clientDate}
             onChange={daateChange}
            renderInput={(params) => <ValidationTextField sx={{backgroundColor: colorsRef.formBgColor, borderRadius: '8px'}} align='center' {...params} />}
        />
    </LocalizationProvider>
     </ListItem>
        </List>
        </Paper>
    )
}