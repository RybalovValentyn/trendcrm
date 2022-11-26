import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, forwardRef, useEffect } from 'react';
import { getOpenTableCreate, tHeadFilteredColumnUpdate } from '../../../../../redux/ordersReduser';
import { MenuItem, Select, OutlinedInput, Checkbox, IconButton } from '@mui/material';
import { selectStyles } from './input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getFilteredOrders, getAllOrders } from '../../../../../redux/asyncThunc';
import { colorsRef } from '../../../../../consts/colorConstants';
import { StyledButton } from '../../../../buttons/buttons';
import CloseIcon from '@mui/icons-material/Close';
import {translater} from '../translate';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
        overflowX: 'hidden',
      },
    },
  };

export const ColumnSettings=()=>{
    const dispatch = useDispatch();
    const isOpenColumnSettings = useSelector((state) => state.ordersAll.modalControl.columnSettings);
    const tHeadColumn = useSelector((state) => state.ordersAll.tHeadColumn)
    const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);

    const [columnsCopy, setColumnsCopy] = useState([]);
    const copyTranslster = Object.entries(translater).map((str, i)=>({id: str[0], str: str[1], num: i}))
    const [selectData, setSelectData] = useState([]);

    useEffect(() => {        
        if (tHeadColumn.length > 0 && filteredColumn.length === 0) {            
            let columnCopy = copyTranslster.map((col, i)=>({num:`${i}`, str: col.str, id: col.id, checked: false}))
            setSelectData([...columnCopy])
            setColumnsCopy([...columnCopy])
        } else if (tHeadColumn.length > 0 && filteredColumn.length > 0) {

          let secondColumn = [];
      let firstColumn = filteredColumn.map((col, i)=>{
           let filt =  copyTranslster.find(n=>n.id === col.data)
           if (filt) {
           return {num: col.num, str: filt.str, id: filt.id, checked: true}
           } 
          })
       copyTranslster.map((col, i)=>{
                let filtered = filteredColumn.find(n=>n.data === col.id)
                if (!filtered) {
                     secondColumn.push({num:`${i}`, str: col.str, id: col.id, checked: false}) 
                }})  
            setSelectData([...secondColumn])
            setColumnsCopy([...firstColumn.concat(secondColumn)])  ;
        }        
        }, [isOpenColumnSettings]);
        

   const handleClose = () => {
        let id = 'columnSettings';
        let str = !isOpenColumnSettings;
        dispatch(getOpenTableCreate({id, str}))

    };

    const handleToggle =(e) => {
        let ind = e.target.id
        let check = e.target.checked;
        let str = columnsCopy.find(n=>n.id === e.target.name)        
        let column = {num: str.num, str: str.str, id: str.id, checked: check } 
        let doubleColumn = dubleColumnCheck(columnsCopy, e.target.name)
               if (doubleColumn.length === 0) {               
                columnsCopy.splice(ind,1,column);
                setColumnsCopy([...columnsCopy]);              
                getDataFromSelects()
               } else if (doubleColumn.length > 0) {
console.log('ddddddddddddddddddddddddddddd');
console.log(columnsCopy);
deletedDouble(doubleColumn);
               }
               getDataFromSelects()
      };
      const dubleColumnCheck =(column, name)=>{
      let double =  column.flatMap(col => col.id).filter((str, index, array) => array.indexOf(str) !== index)
return double
      }


    const handleSelectChange =(e)=>{
        let value = e.target.value;

        let strSelect = columnsCopy.find(n=>n.str === value);  
        let indEvent = columnsCopy.find(n=>n.num === e.target.name);  
  
     let columnEvent = {num: strSelect.num, str: strSelect.str, id: strSelect.id, checked: true}
    let doubleColumn = filteredUniqElement(columnsCopy)

  if (doubleColumn.length === 0) {
     let element =  columnsCopy.splice(e.target.name,1,columnEvent);
     console.log(element[0]);  
     let deletedEl = {num: element[0].num, id: element[0].id, str: element[0].str, checked: false} 
    //  columnsCopy.splice(e.target.name+1,0,deletedEl);
      setColumnsCopy([...columnsCopy, deletedEl]);
      getDataFromSelects()
  } else if (doubleColumn.length > 0) {
      console.log('sssssssssssssssssssssssssssssssssssss');
      deletedDouble(doubleColumn);
      getDataFromSelects();
    }}
  const getDataFromSelects =()=>{
    let fiilterFromSelect = columnsCopy.filter(n=>n.checked === false);
    setSelectData([...fiilterFromSelect]);
  }

 const handleCloseApply =()=>{
        let filter = columnsCopy.filter(n=>n.checked === true).map((col, i)=>({num:`${i}`,
                     data: col.id, searchable: true, orderable: true, search:{value: ''}}));
      dispatch(tHeadFilteredColumnUpdate(filter));
      dispatch(getFilteredOrders());
      handleClose();
        }

const handleFResetFilters =()=>{
    dispatch(tHeadFilteredColumnUpdate([]));
    dispatch(getAllOrders())
    handleClose();
}
const filteredUniqElement = (column)=>{
 return column.flatMap(col => col.id)
  .filter((str, index, array) => array.indexOf(str) !== index)
}
const deletedDouble =(doubleColumn)=>{
  let double = columnsCopy.reverse().find(n=>n.id === doubleColumn[0]);
  let index = columnsCopy.reverse().indexOf(double)
  // console.log('deletedDouble', columnsCopy[index]);
  columnsCopy.splice(index, 1)
  setColumnsCopy([...columnsCopy]);
}
const handleOpenSelect=(e)=>{
 let double = filteredUniqElement(columnsCopy)
if (double.length > 0) {
  // console.log('deletedDouble(double)', double);
 deletedDouble(double)
  // console.log('e.target.id', double);
}
}
    return(
        <Dialog
        open={isOpenColumnSettings}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden', '& .MuiPaper-root': {width: '520px', }}}
      >
        <DialogTitle sx={{display: 'flex',justifyContent: 'space-between'}}>{"Відображення на сторінці замовлень"}
        <IconButton onClick={handleClose} aria-label="delete">
        <CloseIcon/>
      </IconButton>
        
        </DialogTitle>
        <DialogContent sx={{height: '600px', borderTop: '2px solid #d0d0d0', borderBottom:'2px solid #d0d0d0', }}>

       <List sx={{}}>
      {columnsCopy.map((name, ind)=>{
              return(
            <ListItem key={ind}>
                <ListItemText sx={{maxWidth: '30px', marginRight: '20px'}} primary={`№${ind+1}`}/>
             <Checkbox
                  edge="start"
                  onChange={handleToggle}
                  name={name.id}
                  
                  id={`${ind}`}
                  tabIndex={-1}
                checked = {name.checked}
                  disableRipple
                /> 
            {/* <ListItemText primary={name.str}/> */}
            <Select name = {`${ind}`}
                    id={`${name.num}`}
                    value={name.str}
                    onFocus = {handleOpenSelect} 
                    defaultValue={name.str}
                     onChange={handleSelectChange}
                    input={<OutlinedInput  sx={selectStyles}/>}
                    MenuProps={MenuProps}
                    renderValue={(value) => `${value}`}
                    >          
                    {selectData.map((name, ind)=>(
                <MenuItem sx={{fontSize: '14px' }} id={name.id} key ={ind} value={name.str} >      
                    {name.str}
                </MenuItem>))}

       </Select>
            </ListItem>
        )
      })}
      </List>
        </DialogContent>

        <DialogActions sx={{justifyContent: 'center'}}>
        <StyledButton
          text={'Застосувати'}
          func= {handleCloseApply}
          border='#0c4b91'
          bgColor={colorsRef.btnAddBgColor}
            />
          <StyledButton
          text={'Відмінити'}
          func= {handleClose}
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
            />
          <StyledButton
          text={'Скинути фільтри'}
          func= {handleFResetFilters}
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
            />
        </DialogActions>
      </Dialog>
    )
}




