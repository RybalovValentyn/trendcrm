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
import {alertMessageUpdate, autoUpdateAllReducer, autoUpdate, getFormTable} from "../../../../redux/ordersReduser";
import { priceUpdate } from '../order/functionOrder';
import { setProductInOrderFromId, postRowsProductDelete } from '../../../../redux/asyncThunc';
import Swal from 'sweetalert2'


export default function TableProduct() {
  const dispatch =useDispatch();
  const products = useSelector((state) => state.ordersAll.productData);
  const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
  const suppliers = useSelector((state) => state.ordersAll.suppliers);
  const atributes = useSelector((state) => state.ordersAll.atributes);
  const categoryList = useSelector((state) => state.ordersAll.category);
  const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
  const id = useSelector((state) => state.ordersAll.createRows.id);
  const messageType = useSelector((state) => state.ordersAll.typeMessage);
  const message = useSelector((state) => state.ordersAll.messageFromSwal);
  
  const [rows, setRows] =useState([])
  const [isUpdate, setIsUpdate] = useState('')

const supplierUpdate =[{id: 'slose', name: '-закрити-'}, {id: 'null', name: '-пусто-'}]

useEffect(()=>{
let renderRows  = products.map((str,i)=>(createData(str)))
setRows(renderRows)
if (!isUpdateRows) {
let totalAmount = renderRows.reduce((acc, prod, i)=>{return acc +=Number(prod.amount)},0)
let totalWeight = products?.reduce((acc, prod, i)=>{return acc +=Number(prod?.weight)},0)
let totaVolume = products?.reduce((acc, prod, i)=>{return acc +=Number(prod?.volume_general)},0)
dispatch(getFormTable({id:'seats_amount', str: totalAmount}))
dispatch(getFormTable({id:'weight', str: totalWeight?totalWeight:0}))
dispatch(getFormTable({id:'volume_general', str: totaVolume?totaVolume:0}))
let atrArray = renderRows.map(n=>([n.name,n.atrCategoryProd?.map(s=>(s[1])).join('-'),String(n.amount)].join('-')))
dispatch(getFormTable({id:'novaposhta_comment', str: atrArray.join(';')}))
}
  },[products])

  function createData({data, name, attribute_id, price, count ,amount, discount, cost, supplier_id, category, typeDiscount, categoryListFrom, attribute }) {
    let atr = typeof(attribute_id) === 'string'?attribute_id?.replace(/[']/g, [])?.split(','): (attribute_id?.length > 0 ? [...attribute_id]: []);

    let atrCategoryProd = []
    if (atr.length > 0 && category && !attribute) {
      let categoryProduct = categoryList.find(n=>n.id === category)?.attribute 
      let atributesProduct = categoryProduct.map(n=>(atributes[n]))
           atrCategoryProd = categoryProduct.map((n, i )=>{
              let nameProd = atrCategory.find(s=>s.id === n)?.name
              let atributeProduct = ''        
              let data = atributesProduct[i]?.find(s=> s.id === atr[i])?.name
              if (data) {
                atributeProduct = data
              } 
              return ([nameProd, atributeProduct])
      }
         )      
    } else if (categoryListFrom?.length > 0 ) {
      atrCategoryProd = [...categoryListFrom]
    }else if (attribute?.length > 0) {
      let responseData = attribute.reduce((acc,str,i)=>{
          if (str.category) {
            console.log(str);
            let s = [str.category, str.name ]
            acc =[...acc, s]
          }
    return acc
      },[])
      atrCategoryProd = [...responseData]
    }
    amount=amount?amount:count
    return {data, name, atrCategoryProd, price, amount, discount, cost, supplier_id, typeDiscount };
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
        padding: '7.5px',
        borderRadius: '8px'
    }
  }
const handleDeleteClick=(i)=>{
  if (isUpdateRows) {
    successAlert(i)    
   }else if (!isUpdateRows) {
    let newRows = [...products]
    newRows.splice(i, 1)
     dispatch(autoUpdate({ id: 'productData', str: newRows})) 
   }
}

const handleInputChange=(e,i, row)=>{
  let id = e.target.id
  const el = document.getElementById(id)
  let str = e.target.value.replace(/[^0-9.]/g, ''); 
  el.value = str
}
const handleBlurAction=(e,i, row)=>{
    let id = e.target.id.split('-')[1]
let value = e.target.value
let product = {...products[i]}
product[id] = value
updateState(i,product)
if (isUpdateRows) {
dispatch(setProductInOrderFromId({id: row.data, data:{[id]:value }}))
}
}

const handleChangeSelect=(e, i, row)=>{
 let type = e.target.value
 let product = {...products[i]}
product.typeDiscount = type 
 updateState(i, product, type)
 if (isUpdateRows) {
  console.log(i);
  let t = type === '%'?'0':'1'
  dispatch(setProductInOrderFromId({id: row.data, data:{type_discount:t }}))
  }
 
}

const updateState=(i,product, type)=>{
 product.cost = priceUpdate(product.price, product.amount ,product.discount ,type?type:product.typeDiscount )
  let productCopy = [...products]
  productCopy.splice(i, 1, product)
 dispatch(autoUpdate({ id: 'productData', str: productCopy}))
 dispatch(autoUpdate({id: 'resolutionExit', str: false}));
 }
const handleChangeInput=()=>{}

const handleChangeSelectSupplier=(e, i, row)=>{
  let suplier = e.target.value
  if (suplier === 'slose') {
    setIsUpdate('')
    return
  } else if (suplier === 'null') {
    suplier = ''
  }
  let product = {...products[i]}
  product.supplier_id = [suplier]
  let productCopy = [...products]
  productCopy.splice(i, 1, product)
 dispatch(autoUpdate({ id: 'productData', str: productCopy}))
  setIsUpdate('')
  if (isUpdateRows) {
    console.log(i);
    dispatch(setProductInOrderFromId({id: row.data, data:{supplier_id:suplier }}))
    }
}

const handleSuppliersDoubleClick =(e,i)=>{
  setIsUpdate(i)
}

const successAlert = (i) => {
    Swal.fire({  
        title: 'Увага!',  
        text: 'Ви дійсно хочете Видалити товар?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ні',
        confirmButtonText: 'Так',
      }).then((result) => {        
        if (result.isConfirmed) {
          let newRows = [...products]
          newRows.splice(i, 1)
           dispatch(autoUpdate({ id: 'productData', str: newRows})) 
          dispatch(postRowsProductDelete({id:id, dataSend: {order_product_id: products[i].data}}))
          Swal.fire(            
           `${ message[0]}`,
           `${ message[1]}`,
           messageType,
           )
        }
      }); 
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
              <StyledTableCell align="center">{<TableInput func = {handleInputChange} id={'amount'} row = {row} i={i} funcBlur={handleBlurAction}></TableInput>}</StyledTableCell>

              <StyledTableCell align="center">{<Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}><TableInput func = {handleInputChange} id={'discount'} row = {row} i={i} funcBlur={handleBlurAction}></TableInput>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"        
                label=""
                onChange={(e)=>handleChangeSelect(e,i,row)}
                defaultValue= '%'
                value={row.typeDiscount}
                sx={selectStyle}
                >
                            <MenuItem value={'%'}>{'%'}</MenuItem>
                             <MenuItem value={'ua'}>{'UAH'}</MenuItem>
              </Select>
                 </Box> }</StyledTableCell>

              <StyledTableCell align="center" > <input className={s.inputTableNoboard} id={`${i}-cost`}  role="presentation" autoComplete="off"
                                    onChange={handleChangeInput}  value={row.cost}></input></StyledTableCell>
              <StyledTableCell   align="center"><div onDoubleClick={(e)=>handleSuppliersDoubleClick(e,i)}>{row?.supplier_id?.length && (isUpdate !== i) >0 ? 
              row?.supplier_id?.map((str,i)=>(
               <Typography  sx={{fontSize: '12px',"&:hover":{cursor:'pointer'}}} key ={i}>{suppliers.find(s=>s.id === str)?.name?suppliers.find(s=>s.id === str)?.name:'Не вибрано'}</Typography>
              )): null}
              </div>
            
              {isUpdate === i && <Select
                labelId="supplierst-label"
                id="supplierst"        
                label=""
                autoWidth
                onChange={(e)=>handleChangeSelectSupplier(e,i,row)}
                defaultValue= {suppliers.find(s=>s.id === row.supplier_id[0])?suppliers.find(s=>s.id === row.supplier_id[0]).id: ''}
                value={suppliers.find(s=>s.id === row?.supplier_id[0])?suppliers.find(s=>s.id === row?.supplier_id[0])?.id: 'Не вибрано'}
                sx={selectStyle}
                >
          {[...supplierUpdate, ...suppliers].map((str) => (
            <MenuItem key={str.id} value={str.id}>
                  {str.name}
            </MenuItem>
          ))}
                </Select>}
              </StyledTableCell>
              <StyledTableCell align="center"><BackspaceIcon onClick={()=>handleDeleteClick(i)} sx={{color: 'red', '&:hover': {cursor: 'pointer'}}}/></StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
