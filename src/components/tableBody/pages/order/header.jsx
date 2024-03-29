import Box from '@mui/material/Box';
import {clasListContainer, svgStyle, buttonBoxStyle, BootstrapTooltip, listStyle} from './styles';
import AddIcon from '@mui/icons-material/Add';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import {BpCheckbox} from '../../../inputs/checkBox'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import {getOpenTableCreate, getClouseTableCreate} from '../../../../redux/ordersReduser';
import {StyledButton} from '../../../buttons/buttons';
import { colorsRef } from '../../../../consts/colorConstants';
import { useEffect, useState } from 'react';
import {  CountUpdate, autoUpdate} from '../../../../redux/ordersReduser';
import { getAllOrders, getAllStatuses, getFilteredOrders } from '../../../../redux/asyncThunc';
import { DownloadComponent } from './createHead/downloads'; 
import { ModalMenu } from '../modals/modal'
import { ColumnSettings } from './createHead/columnSettings';
import {OtherMenuComponent} from './createHead/menuother';
import { CustomizedCheckboxAll } from '../../../inputs/checkBox';
import {useNavigate} from 'react-router-dom';
import { getselected } from '../../../../redux/funcReduser';


function HeaderContainer() {
const dispatch = useDispatch();
const navigate = useNavigate();
const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
const paramsCount = useSelector((state) => state.ordersAll.searchParamCount);
const columns = useSelector((state) => state.ordersAll.tHeadColumn);
const [number, setNumber] = useState('');
const autoUdatesTime = useSelector((state) => state.ordersAll.autoupdate);
const isAutoUdate = useSelector((state) => state.ordersAll.isAutoUpdate);
const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
const isAllListProducts =  useSelector((state) => state.ordersAll.isAllListProducts);
let [timer, setTimer] = useState(null);


  useEffect(() => {

if (isAutoUdate && Number(autoUdatesTime) > 29) {
  console.log('start timer');
let time = Number(autoUdatesTime)*1000
setTimer(setInterval(() => {
  handleReload()

}, time))  
} else if (!isAutoUdate) {
  stopTimer()
} 
}, [isAutoUdate, autoUdatesTime]);

useEffect(() => {
  stopTimer()
  if (filteredRows.length > 0 && isAutoUdate && Number(autoUdatesTime) > 29) {
    let time = Number(autoUdatesTime)*1000
    setTimer(setInterval(() => {
      handleReload()
    
    }, time)) 
  } else if (filteredRows.length === 0 && isAutoUdate && Number(autoUdatesTime) > 29) {
    let time = Number(autoUdatesTime)*1000
    setTimer(setInterval(() => {
      handleReload()    
    }, time))}
  }, [filteredRows]);

const stopTimer = ()=>{
  clearInterval(timer);
  setTimer(null)
}

const handleClick = ()=>{
  dispatch(getClouseTableCreate())
  navigate('/order')
  

  
}


const handleResetFilters=()=>{
dispatch(CountUpdate())
if (filteredRows?.length > 0) {
  dispatch(getFilteredOrders())
} else dispatch(getAllOrders())
// navigate('/orders')
}


const onHandleCheck=(e)=>{
  console.log('autoonHandleCheck');
  let check = e.target.checked
  if (number === '' && check) {
    // console.log(check);
    setNumber(30)
    dispatch(autoUpdate({id: 'autoupdate', str: 30}))
    dispatch(autoUpdate({id: 'isAutoUpdate', str: check}));
  } else if (!check) {
    setNumber('');
    dispatch(autoUpdate({id: 'isAutoUpdate', str: check}));
    dispatch(autoUpdate({id: 'autoupdate', str: 0}))
    stopTimer()
  } 
  
}
const handleReload =()=>{
  dispatch(getAllStatuses())
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
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
    stopTimer()
    setNumber('')
  } else if (e.key === "Enter" && e.target.value >= 30) {
    stopTimer()
    dispatch(autoUpdate({id: 'autoupdate', str: number}))
  }else if (e.key === "Enter" && e.target.value < 30) {
    stopTimer()
    setNumber(30)
    dispatch(autoUpdate({id: 'autoupdate', str: 30}))
  };
}

const onchangeAll=(e)=>{
  let s = e.target.checked;
  dispatch(autoUpdate({id: 'isGrabAll', str: s}))
  if (s) {
    const newSelected = bodyTableRows.map((n,ind) => n[0].value);
    sessionStorage.setItem("selected", newSelected);
    dispatch(getselected(newSelected))
    return;
  } else return
   
  
}


const onHandleCheckProduct=(e)=>{
  let check = e.target.checked
  dispatch(autoUpdate({id: 'isAllListProducts', str: check}))

}
  return (
    <Box sx={clasListContainer}  component="section">
<Box sx={buttonBoxStyle}>
      <StyledButton
        text={'Створити'}
        func= {handleClick}
        startIcon = { <AddIcon sx={{fill: colorsRef.fillSvgColor, width: '17px', marginTop: '-2px'}} />}
        bgColor={colorsRef.btnAddBgColor}
        border= {colorsRef.btnAddBorderColor}
           />
      

      {paramsCount>0 && <Box sx={{marginLeft: '20px', marginRight: 'auto'}}>      
      <StyledButton            
        text={`Скинути фільтри: ${paramsCount}`}
        func= {handleResetFilters}
        bgColor={colorsRef.btnAddBgColor}
        border= {'#7bb31a'}        
           />
           </Box>}
  </Box>
  <Box sx={{'@media (max-width:768px)': {width: '100%', textAlign: 'center' },}}>
    <List  sx={listStyle}>

    <ListItem sx={{paddingLeft: '0px', paddingRight: '10px'}}>
        <BpCheckbox name='product_list' onChange={onHandleCheckProduct} tooltip ={'Повний список товарів'} 
        placement="left"  checked={isAllListProducts}/>    
        </ListItem>

      <ListItem sx={{paddingLeft: '10px', paddingRight: '10px', "& :hover": {cursor: 'pointer', }}}>
        <CustomizedCheckboxAll name='product_list' onChange={onchangeAll} tooltip ={'Вибрати все'} checked={isGrabAll} />
      </ListItem>
       
        <ListItem sx={{paddingLeft: '10px', paddingRight: '20px', "& :hover": {cursor: 'pointer', }}}>
        <BootstrapTooltip title="Налаштувати колонки">
          <BuildOutlinedIcon onClick = {handleColumnSettings} sx={svgStyle}/>          
          </BootstrapTooltip>
          {columns.length > 0 && <ColumnSettings/>}
        </ListItem>
       
        <ListItem sx={{padding: '0px 0px 0px 10px', "& :hover": {cursor: 'pointer',}}}>      
        <DownloadComponent/>  
        <ModalMenu/>
        </ListItem>
        
        <ListItem sx={{padding: '0px 0px 0px 0px', "& :hover": {cursor: 'pointer', }}}> 
        <OtherMenuComponent/>        
        
        </ListItem>

        <ListItem sx={{paddingLeft: '5px', paddingRight: '10px', "& :hover": {cursor: 'pointer', }}}>
           <BootstrapTooltip title="Оновити сторінку">
        <ReplayOutlinedIcon onClick={handleReload} sx={svgStyle} />
           </BootstrapTooltip>
        </ListItem>        

        <ListItem>
        <BootstrapTooltip title="Частота автооновлення">
        <input value ={autoUdatesTime?autoUdatesTime:number}  onKeyDown={handleKeyDown} style={{width: '50px', padding: '4px 5px', border: '1px solid #d0d0d0', borderRadius: '4px'}} type='text'  onChange={numberChange}
         ></input>
        </BootstrapTooltip>
        </ListItem>

        <ListItem sx={{paddingLeft: '10px', paddingRight: '10px'}}>
        <BpCheckbox onChange={onHandleCheck} name='auto_reloading' tooltip ={'Увімкнути автооновлення'} checked={isAutoUdate}/>
        </ListItem>


    </List>
    </Box>
    </Box>
  );
};

export default HeaderContainer