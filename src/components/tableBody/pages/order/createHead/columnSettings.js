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
import { getFilteredOrders } from '../../../../../redux/asyncThunc';
import { colorsRef } from '../../../../../consts/colorConstants';
import { StyledButton } from '../../../../buttons/buttons';
import CloseIcon from '@mui/icons-material/Close';

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
    const columns = useSelector((state) => state.ordersAll.tHeadColumn)
    const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const [group, setGroup] = useState('')
    const [columnsCopy, setColumnsCopy] = useState([]);



    useEffect(() => {        
        if (columns.length > 0 && filteredColumn.length === 0) {            
            let columnCopy = columns.map((col, i)=>({num:`${i}`, str: col.str, id: col.id, checked: true}))
            setColumnsCopy([...columnCopy])
        } else if (columns.length > 0 && filteredColumn.length > 0) {
            let columnCopyFiltered = columns.map((col, i)=>{
                let filtered = filteredColumn.find(n=>n.data === col.id)
                if (filtered) {
                   return  {num:`${i}`, str: col.str, id: col.id, checked: true}
                } else return {num:`${i}`, str: col.str, id: col.id, checked: false}
            })     
            setColumnsCopy([...columnCopyFiltered])  
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
        let filter = columnsCopy.splice(ind,1,column)
        setColumnsCopy([...columnsCopy])
      };


    const handleSelectChange =(e)=>{
        let value = e.target.value;
        console.log(e.target.name);
        let strSelect = columnsCopy.find(n=>n.str === value);  
        let indEvent = columnsCopy.find(n=>n.num === e.target.name);      
        let columnSelect = {num: indEvent.num, str: indEvent.str, id: indEvent.id, checked: false}
        let columnEvent = {num: strSelect.num, str: strSelect.str, id: strSelect.id, checked: true}
            columnsCopy.splice(indEvent.num,1,columnEvent)
            columnsCopy.splice(columnEvent.num,1,columnSelect)
        setColumnsCopy([...columnsCopy])
        setGroup(e.target.value)
      }

      const handleCloseApply =()=>{
        let filter = columnsCopy.filter(n=>n.checked === true).map((col, i)=>({num:`${i}`,
                     data: col.id, searchable: true, orderable: true, search:{value: ''}}));
      dispatch(tHeadFilteredColumnUpdate(filter));
      dispatch(getFilteredOrders());
      handleClose();
        }
    return(
        <Dialog
        open={isOpenColumnSettings}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden', '& .MuiPaper-root': {width: '820px', }}}
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
            <ListItemText primary={name.str}/>
            <Select name = {`${ind}`}
                    id={`${name.num}`}
                    value={name.str}
                    defaultValue={name.str}
                    onChange={handleSelectChange}
                    input={<OutlinedInput  sx={selectStyles}/>}
                    MenuProps={MenuProps}
                    >          
                    {columnsCopy.map((name, ind)=>(
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
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
            />
          <StyledButton
          text={'Відмінити'}
          func= {handleClose}
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
            />
        </DialogActions>
      </Dialog>
    )
}




