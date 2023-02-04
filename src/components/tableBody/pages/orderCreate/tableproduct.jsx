import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, useEffect, useMemo, memo } from "react";
import Typography from '@mui/material/Typography';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import BackspaceIcon from '@mui/icons-material/Backspace';
import s from './components/style.module.scss';
import TableInput from './components/tableInput'
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {alertMessageUpdate} from "../../../../redux/ordersReduser";

export default function TableProduct() {
  const dispatch =useDispatch();
  const products = useSelector((state) => state.ordersAll.productData);
  const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
  const suppliers = useSelector((state) => state.ordersAll.suppliers);
  const atributes = useSelector((state) => state.ordersAll.atributes);
  const categoryList = useSelector((state) => state.ordersAll.category);
  const [rows, setRows] =useState([])

  useEffect(()=>{
let renderRows  = products.map((str,i)=>(createData(str)))
setRows(renderRows)
  },[products])

  function createData({data, name, attribute_id, price, count =1, discount, cost, supplier_id, category}) {
    let atr = attribute_id.split(',')
    let atrCategoryProd = []
    if (atr[0]) {
      let categoryProduct = categoryList.find(n=>n.id === category).attribute
      let atributesProduct = categoryProduct.map(n=>(atributes[n]))
           atrCategoryProd = categoryProduct.map((n, i )=>{
        let nameProd = atrCategory.find(s=>s.id === n)?.name
        let atributeProduct = ''
        let data = atributesProduct[i]?.find(s=>s.id === atr[i])?.name
        if (data) {
          atributeProduct = data
        } 
        return ([nameProd, atributeProduct])
      }
         )
    }
    let supplier = supplier_id.map((n=>(suppliers.find(s=>s.id === n).name)))
    let typeDiscount = '%'
    if (cost && price && count) {
      let sum = Number(price)*Number(count)
      let allSumm = sum - Number(discount)
      if (Number(cost) == allSumm.toFixed(2) ) {
        typeDiscount= 'ua'
        }
         }
    return {data, name, atrCategoryProd, price, count, discount, cost, supplier, typeDiscount };
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.black,
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      padding: '5px'
      // textWrap: 'none'
      
    },
  }));

  const selectStyle={
    minWidth: '60px', 
    maxWidth: '80px',
    width: '100%',
    maxHeight: '30px',
    borderRadius: '8px',
    marginLeft: '10px',
    fontSize: '12px',
    '& .MuiOutlinedInput-root':{
        padding: 0,
        maxHeight: '33px',
        borderRadius: '8px',       
        alignItems: 'center',
                          
  },
    '& .MuiInputBase-input':{
        padding: '5px',
        borderRadius: '8px'
    }
  }
const handleDeleteClick=(i)=>{
let newRows = [...rows]
 newRows.splice(i, 1)
  setRows(newRows)
}

const handleInputChange=(e,i, row)=>{
  let id = e.target.id
  const el = document.getElementById(id)
  const textEl = document.getElementById(`${i}-cost`)
  let copyRow = {...row}
  let cost = priceUpdate(copyRow.price, copyRow.count ,copyRow.discount ,copyRow.typeDiscount )
  textEl.value = cost
  let str = e.target.value.replace(/[^0-9.]/g, ''); 
  el.value = str
}
const handleBlurAction=(e,i, row)=>{
  let id = e.target.id.split('-')[1]
let value = e.target.value
let copyRow = {...row}
copyRow[id] = value
updateState(i,copyRow)
}

const handleChangeSelect=(e, i, row)=>{
 let value = e.target.value
 let copyRow = {...row}
 copyRow.typeDiscount = value
 updateState(i,copyRow)
}
const updateState=(i,copyRow)=>{
  copyRow.cost = priceUpdate(copyRow.price, copyRow.count ,copyRow.discount ,copyRow.typeDiscount )
  let copyRows = [...rows]
 copyRows.splice(i, 1, copyRow)
 setRows(copyRows)
}

const priceUpdate=(price, count, discount, type)=>{
let t = ((price?Number(price):0) * (count?Number(count):1)).toFixed(2)
if (type === '%') {
    let d = t* Number(discount)/100        
    let num = t - d
    if (price !== t) {
 return num.toFixed(2)
    }  
    } else if (type === 'ua') {
        let num = t- (discount?Number(discount):0)
        if (price !== t) {
    return num.toFixed(2)
          }  
    } else dispatch(alertMessageUpdate({message: 'alert1', type: 'info'}))
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, fontSize: '12px', padding: 0 }}  aria-label="a table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{width: '2%'}}>ID</StyledTableCell>
            <StyledTableCell sx={{width: '26%'}} align="center">Назва</StyledTableCell>
            <StyledTableCell sx={{width: '20%'}} align="left">Атрибути</StyledTableCell>
            <StyledTableCell sx={{width: '5%'}} align="center">Ціна</StyledTableCell>
            <StyledTableCell sx={{width: '5%'}} align="center">Кількість</StyledTableCell>
            <StyledTableCell sx={{width: '20%'}} align="center">Скидка</StyledTableCell>
            <StyledTableCell sx={{width: '10%'}} align="center">Всього</StyledTableCell>
            <StyledTableCell sx={{width: '10%'}} align="center">Постачальник</StyledTableCell>
            <StyledTableCell sx={{width: '2%'}} align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <TableRow
            key={`${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.data}
              </StyledTableCell>
              <StyledTableCell align="center" >{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.atrCategoryProd.length>0 && row.atrCategoryProd.map((str,i)=>(
                <Typography sx={{fontSize: '12px',}} key ={i}>{`${str[0]}: ${str[1]}`}</Typography>
              ))}</StyledTableCell>
              <StyledTableCell align="center">{<TableInput func = {handleInputChange} id={'price'} row = {row} i={i} funcBlur={handleBlurAction}></TableInput>}</StyledTableCell>
              <StyledTableCell align="center">{<TableInput func = {handleInputChange} id={'count'} row = {row} i={i} funcBlur={handleBlurAction}></TableInput>}</StyledTableCell>

              <StyledTableCell align="center">{<Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}><TableInput func = {handleInputChange} id={'discount'} row = {row} i={i} funcBlur={handleBlurAction}></TableInput>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"        
                label="Discount"
                onChange={(e)=>handleChangeSelect(e,i,row)}
                defaultValue= '%'
                value={row.typeDiscount}
                sx={selectStyle}
                >
                            <MenuItem value={'%'}>{'%'}</MenuItem>
                             <MenuItem value={'ua'}>{'UAH'}</MenuItem>
                </Select>
                 </Box> }</StyledTableCell>

              <StyledTableCell align="center" > <input className={s.inputTableNoboard} id={`${i}-cost`}  role="presentation" autoComplete="off" defaultValue={row.cost} ></input></StyledTableCell>
              <StyledTableCell align="center">{row.supplier.length>0 ? row.supplier.map((str,i)=>(
                <Typography sx={{fontSize: '12px',}} key ={i}>{str}</Typography>
              )): 'Не вибрано'}</StyledTableCell>
              <StyledTableCell align="center"><BackspaceIcon onClick={()=>handleDeleteClick(i)} sx={{color: 'red', '&:hover': {cursor: 'pointer'}}}/></StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
