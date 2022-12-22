import {TablePagination, Box, Select, MenuItem, Typography, List, ListItem,
         IconButton, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { autoUpdate } from '../../../../redux/ordersReduser';
import {useMemo, useState, useEffect}  from 'react';
import { colorsRef } from '../../../../consts/colorConstants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getAllOrders, getFilteredOrders } from '../../../../redux/asyncThunc';
import { bodyPaginationStyle, dataRowsStyle } from './styles';

const MyTablePagination =({length, rowsPerPage, page})=>{
const dispatch = useDispatch();
const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
const startRows = useSelector((state) => state.ordersAll.start);
const [optionPage, setOptionPage] = useState([10, 25, 50, 100,250, 500]);
const [paginLength, setPaginLength] =useState(3);
const isLoading = useSelector((state) => state.ordersAll.isLoading);

let pages = Array.from(Array(Math.ceil(length/rowsPerPage)).keys());
let lengtTable = Array.from(Array(Math.ceil(length/rowsPerPage)).keys()).length;

if (page === 0 && pages.length > paginLength) {    
  pages= pages.splice(0, paginLength) 

} 

if (pages.length > paginLength) {
    pages = pages.splice(page-1, paginLength) 
}

const pageUpdate=()=>{
    if (filteredRows?.length > 0) {
        dispatch(getFilteredOrders())
} else dispatch(getAllOrders())
}

 const handleChangeRowsPerPage = (event) => {
    dispatch(autoUpdate({id: 'rowsPerPage', str: parseInt(event.target.value)}));
    dispatch(autoUpdate({id: 'start', str: 0}));
    dispatch(autoUpdate({id: 'page', str: 0}))
    pageUpdate();
      };

const inputStyle ={
    '& .MuiInputBase-input': {
        maxHeight: '32px',
        lineHeight: 1.5,
     color: colorsRef.inputTextColor,
      position: 'relative',
      backgrounColor: '#fff',
      fontSize: 13,
      padding: '2px 32px 2px 12px',
      width:'100%',
      maxWidth: '250px', 
      
      },

  };
const handleSelect =()=>{

}
const handleNextClick=()=>{
    if (Number(page) === lengtTable-1) {
        console.log("endTable");
        return
    }
    dispatch(autoUpdate({id: 'start', str: Number(startRows+rowsPerPage)}));
    pageUpdate();
    dispatch(autoUpdate({id: 'page', str: Number(page+1)}));
}
const handleNextPrev=()=>{    
    if (Number(page)=== 0) {
        return
    } else if ( Number(startRows-rowsPerPage)<0) {
        onFirstHandleClick()
     return
    }
    dispatch(autoUpdate({id: 'start', str: Number(startRows-rowsPerPage)}));
    pageUpdate();
    dispatch(autoUpdate({id: 'page', str: Number(page-1)}));
}
const SelectPagination =()=>(
    <Box sx={{display: 'flex', alignItems: 'center', marginRight: '10px',
    '@media (max-width:898px)': { marginLeft: 'auto', width: 'min-content', marginBottom: '20px' }}}>
    <Typography sx={{marginRight: '10px', fontSize: '14px'}}>{'Показати:'}</Typography>
    <Select
        onChange={handleChangeRowsPerPage}
        id="multiple-checkbox"
        value ={rowsPerPage}      
        sx={inputStyle}
    >
        {optionPage.map((nam, ind) => (
        <MenuItem sx={{fontSize: '12px' }}  id={ind} key ={ind} value={nam}>
        {nam}
        </MenuItem>
        ))}
    </Select>
</Box>
)

const onFirstHandleClick=()=>{
    dispatch(autoUpdate({id: 'start', str: 0}));
    pageUpdate();
    dispatch(autoUpdate({id: 'page', str: 0}));
}

const onHandleLastClick =()=>{
    dispatch(autoUpdate({id: 'start', str: Number(length-rowsPerPage)}));
    pageUpdate();
    dispatch(autoUpdate({id: 'page', str: Number(lengtTable-1)}));
}
const onHandleNumberClick=(num)=>{
    if (pages.length===1) {
        console.log(pages.length);
        return
    }
let start = num*rowsPerPage
dispatch(autoUpdate({id: 'start', str: Number(start)}));
pageUpdate();
dispatch(autoUpdate({id: 'page', str: Number(num)}));

}
    return(
<Box sx={bodyPaginationStyle}> 
    <Box sx={{ '@media (max-width:898px)': {display: 'none', width: 0, height: 0 },}}>
    <SelectPagination/>
    </Box>
    <Box sx={dataRowsStyle}>
     <Button variant="text" disabled={Number(page) === 0 || isLoading} onClick={onFirstHandleClick} sx={{color: '#272727', textTransform: 'none' }}>Перша</Button>
        <IconButton onClick={handleNextPrev} color="primary" aria-label="pagination prev" 
        disabled={Number(page) === 0 || isLoading} component="label">
        <ArrowBackIcon />
        </IconButton>
            <List sx={{display: 'flex',  fontSize: '12px',    alignItems: 'center',}}>
                {pages.map((num, i)=>{ 
                let isActiv = (Number(page) === num)?true:false;
                return (<ListItem key={i} onClick={()=>onHandleNumberClick(num)} sx={{
                    padding: '0px',
                borderRadius: '50%',
                border: isActiv&&pages.length!==1?'1px solid #186efd':'1px solid #d0d0d0', 
            marginRight: '5px', 
            backgroundColor: isActiv?'#e9ecfa':'#fff',
            fontSize: isActiv?'16px': '12px',
            height: isActiv?'35px': '25px',
            width: isActiv?'35px': '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            "&:hover": {cursor: 'pointer',
                    backgroundColor: isActiv?'#cbd2f0':'#dedede'}}}>
                    <span >{num+1}</span>
                    </ListItem>)
            })}
            </List>
        <IconButton onClick={handleNextClick} color="primary" aria-label="pagination-next"
         size='small' component="label" disabled={Number(page) === lengtTable-1 || isLoading} sx={{marginLeft: '-5px',}}>
        <ArrowForwardIcon />
        </IconButton>
        <Button variant="text" disabled={Number(page) === lengtTable-1 || isLoading} onClick={onHandleLastClick} sx={{color: '#272727', textTransform: 'none'}}>Остання</Button>
    </Box>
    <Box sx={{ '@media (min-width:899px)': {display: 'none', width: 0, height: 0 },
                '@media (max-width:898px)': {display: 'block' }}}>
    <SelectPagination/>
    </Box>
</Box>


    )
}

export default MyTablePagination