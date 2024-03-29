import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, forwardRef, useEffect } from 'react';
import { getOpenTableCreate, tHeadFilteredColumnUpdate } from '../../../../../redux/ordersReduser';
import {Checkbox, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getFilteredOrders, getAllOrders } from '../../../../../redux/asyncThunc';
import { colorsRef } from '../../../../../consts/colorConstants';
import { StyledButton } from '../../../../buttons/buttons';
import CloseIcon from '@mui/icons-material/Close';
import {translater} from '../translate';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { textFieldStyles } from './style';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


export const ColumnSettings=()=>{
    const dispatch = useDispatch();
    const isOpenColumnSettings = useSelector((state) => state.ordersAll.modalControl.columnSettings);
    const tHeadColumn = useSelector((state) => state.ordersAll.tHeadColumn)
    const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const [columnsCopy, setColumnsCopy] = useState([]);
    const copyTranslster = Object.entries(translater).map((str, i)=>({id: str[0], str: str[1], num: i}));
    const [search, setSearch] = useState('')

    useEffect(() => {        
        if (tHeadColumn.length > 0 && filteredColumn.length === 0) {            
            let columnCopy = copyTranslster.map((col, i)=>({num:`${i}`, str: col.str, id: col.id, checked: false}))
   
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
                columnsCopy.splice(ind,1,column);
                setColumnsCopy([...columnsCopy]);  
                };

    const handleSelectChange =(e,ind)=>{
      let currentColumn = e.target.id.split('-')[0];
      let newColumn = e.target.id.split('-')[2];
      let newSelectData = {};
      if (!currentColumn || !newColumn ) {
        return
      }
      if (search !== '') {
        newColumn = columnsCopy.findIndex(n=>n.str === e.target.innerText)
        newSelectData = columnsCopy.find(n=>n.str === e.target.innerText)
      } else if (search === '') {
        newSelectData = columnsCopy[newColumn];
      }
    let currentSelectColumn = columnsCopy[currentColumn];
    let currentDataColumn = {num: currentColumn.num, str: currentSelectColumn.str, id: currentSelectColumn.id, checked: false}
    let newDataColumn = {num: ind, str: newSelectData.str, id: newSelectData.id, checked: true }

     columnsCopy.splice(ind,1,newDataColumn);
     columnsCopy.splice(newColumn,1,currentDataColumn);
      setColumnsCopy([...columnsCopy]);
      setSearch('')
    }

 const handleCloseApply =()=>{
        let filter = columnsCopy.filter(n=>n.checked === true).map((col, i)=>({num:`${i}`,
                     data: col.id, searchable: true, orderable: true, search:{value: ''}}));
        sessionStorage.setItem("selected", '');
      dispatch(tHeadFilteredColumnUpdate(filter));
      dispatch(getFilteredOrders());
      handleClose();
        }

const handleFResetFilters =()=>{
    dispatch(tHeadFilteredColumnUpdate([]));
    dispatch(getAllOrders())
    handleClose();
};

const listItemStyle ={
  maxWidth: '455px',
  minWidth: '200px',
  alignItems: 'center'
}


    return(
        <Dialog
        open={isOpenColumnSettings}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden', '& .MuiPaper-root': {width: '500px', },}}
      >
        <DialogTitle sx={{display: 'flex',justifyContent: 'space-between'}}>{"Відображення на сторінці замовлень"}
        <IconButton onClick={handleClose} aria-label="delete">
        <CloseIcon/>
      </IconButton>
        
        </DialogTitle>
         <DialogContent sx={{height: '600px', borderTop: '2px solid #d0d0d0', borderBottom:'2px solid #d0d0d0', '@media (max-width: 520px)': {
          padding: 0
           },}}>

       <List >
      {columnsCopy.map((name, ind)=>{
              return(
            <ListItem key={ind} sx={listItemStyle}>
                <ListItemText sx={{ maxWidth: '30px', marginRight: '10px'}} primary={`№${ind+1}`}/>
             <Checkbox
                  edge="start"
                  onChange={handleToggle}
                  name={name.id}
                  sx={{'@media (max-width:320px)': {marginLeft: '5px',},}}
                  id={`${ind}`}
                  tabIndex={-1}
                checked = {name.checked}
                  disableRipple
                /> 
            <Autocomplete
            sx={{ '@media (max-width: 520px)': {
              width: '100%',
              maxWidth: '250px',

            alignItems: 'center',
            }}}
                name={`${ind}`}
                id={`${ind}`}                
                options={columnsCopy}
                onChange={(e)=>handleSelectChange(e,ind)}
                getOptionDisabled={(option) =>
                  option.checked === true
                }
                value={name}
                // readOnly={ind === 0}
                disableClearable
                getOptionLabel={(option) => option.str}
                renderInput={(params) => <TextField  onChange={(e)=>setSearch(e.target.value)} disabled={name.checked}
                   sx={textFieldStyles} 
                    {...params}/>}
              />

            </ListItem>
        )
      })}
      </List>
        </DialogContent>

        <DialogActions sx={{justifyContent: 'center', '@media (max-width: 520px)': {flexWrap: 'wrap' } }}>
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




