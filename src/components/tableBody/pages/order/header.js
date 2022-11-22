import Box from '@mui/material/Box';
import {clasListContainer, svgStyle} from './styles';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import { styled } from '@mui/material/styles';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import {BpCheckbox} from '../../../inputs/checkBox'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import {getOpenTableCreate, getClouseTableCreate} from '../../../../redux/ordersReduser';
import {CreateTable} from './createTable';
import {StyledButton} from '../../../buttons/buttons';
import {CreateRows} from './createRow/createRows';
import { ListAutocompliteStatuses } from './createRow/listStatuses';
import { colorsRef } from '../../../../consts/colorConstants';
import { useEffect, useState } from 'react';
import { searchCountUpdate, CountUpdate, autoUpdate } from '../../../../redux/ordersReduser';
import { getAllOrders, getAllStatuses } from '../../../../redux/asyncThunc';
import { DownloadComponent } from './createHead/downloads'; 
import { ModalMenu } from './createHead/modal'
import { BootstrapTooltip } from './styles';
import { ColumnSettings } from './createHead/columnSettings';


export function HeaderContainer() {
const dispatch = useDispatch();
const params = useSelector((state) => state.ordersAll.searchParams);
const copyParams = Object.values(params);
const isOpen = useSelector((state) => state.ordersAll.modalControl.openCreator);
const paramsCount = useSelector((state) => state.ordersAll.searchParamCount);
const columns = useSelector((state) => state.ordersAll.tHeadColumn);
const [number, setNumber] = useState('');
const autoUdates = useSelector((state) => state.ordersAll.autoUdate);

useEffect(() => {
  const searchCount = copyParams.reduce((acc, str) =>(str!==''?acc+=1:acc+=0),0);
  dispatch(searchCountUpdate(searchCount));
  }, [params]);


const handleClick = (e)=>{
  let id = 'openCreator';
  let str = !isOpen;  
  dispatch(getOpenTableCreate({id, str}))
  // console.log(!isOpen);
  dispatch(getClouseTableCreate())
}

const onChangeCheckBox =() =>{
  console.log('sd');
}

const handleResetFilters=()=>{
dispatch(CountUpdate())
dispatch(getAllOrders())

}

const listStyle={
  display: 'flex',
  alignItems: 'center',
padding: 0
}

const listItemStyle={
  // padding: '0px 10px'
}
const onHandleCheck=(e)=>{
  let check = e.target.check
  dispatch(autoUpdate({id: 'isAutoUpdate', str: check}))
}
const handleReload =()=>{
  dispatch(getAllStatuses())
  dispatch(getAllOrders())
}
const handleColumnSettings=()=>{
  let id = 'columnSettings';
  let str = true;
  dispatch(getOpenTableCreate({id, str}))
}

const numberChange = (e)=>{
  if (Number(e.target.value)) {
    setNumber(e.target.value)
  }
}
const handleKeyDown=(e)=>{
  if (e.key === 'Backspace') {
    setNumber('')
  } else if (e.key === "Enter" && e.target.value >= 60) {
    dispatch(autoUpdate({id: 'autoupdate', str: number}))
  }else if (e.key === "Enter" && e.target.value < 60) {
    setNumber(60)
    dispatch(autoUpdate({id: 'autoupdate', str: 60}))
  }

}

  return (
    <Box sx={clasListContainer}  component="section">

      <StyledButton
        text={isOpen?'Cloused': 'Створити'}
        func= {handleClick}
        startIcon = { <AddIcon sx={{fill: colorsRef.fillSvgColor, width: '17px', marginTop: '-2px'}} />}
        bgColor={colorsRef.btnAddBgColor}
        border= {colorsRef.btnAddBorderColor}
           />
      {/* <CreateTable/> */}
      {isOpen && <ListAutocompliteStatuses/>}

      {paramsCount>0 && <Box sx={{marginLeft: '20px', marginRight: 'auto'}}>      
      <StyledButton            
        text={`Скинути фільтри: ${paramsCount}`}
        func= {handleResetFilters}
        bgColor={colorsRef.btnAddBgColor}
        border= {'#7bb31a'}        
           />
           </Box>}
          
      <CreateRows/>
    <List  sx={listStyle}>

    <ListItem sx={{paddingLeft: '0px', paddingRight: '10px'}}>
        <BpCheckbox name='product_list' onChange={onHandleCheck} tooltip ={'Повний список товарів'} placement="left" />    
        </ListItem>

      <ListItem sx={{paddingLeft: '10px', paddingRight: '20px', "& :hover": {cursor: 'pointer', }}}>
      <BootstrapTooltip title="Вибрати все">
      <AddTaskIcon sx={svgStyle}/>
      </BootstrapTooltip>
      </ListItem>
       
        <ListItem sx={{paddingLeft: '10px', paddingRight: '20px', "& :hover": {cursor: 'pointer', }}}>
        <BootstrapTooltip title="Налаштувати колонки">
          <BuildOutlinedIcon onClick = {handleColumnSettings} sx={svgStyle}/>          
          </BootstrapTooltip>
          {columns.length > 0 && <ColumnSettings/>}
        </ListItem>
       
        <ListItem sx={{padding: '0px 0px 0px 10px'}}>      
        <DownloadComponent/>  
        <ModalMenu/>
        </ListItem>
        
        <ListItem sx={{padding: '0px 10px 0px 0px', "& :hover": {cursor: 'pointer', }}}> 
        <SettingsIcon  sx={svgStyle}/>
        
        </ListItem>



        <ListItem sx={{paddingLeft: '10px', paddingRight: '10px', "& :hover": {cursor: 'pointer', }}}>
           <BootstrapTooltip title="Оновити сторінку">
        <ReplayOutlinedIcon onClick={handleReload} sx={svgStyle} />
           </BootstrapTooltip>
        </ListItem>        

        <ListItem>
        <BootstrapTooltip title="Частота автооновлення">
        <input onKeyDown={handleKeyDown} value={number} style={{width: '50px', padding: '4px 5px', border: '1px solid #d0d0d0', borderRadius: '4px'}} type='text'  onChange={numberChange}
         ></input>
        </BootstrapTooltip>
        </ListItem>

        <ListItem sx={{paddingLeft: '10px', paddingRight: '10px'}}>
        <BpCheckbox onChange={onHandleCheck} name='auto_reloading' tooltip ={'Увімкнути автооновлення'} placement="left" />
        </ListItem>


    </List>
    </Box>
  );
}