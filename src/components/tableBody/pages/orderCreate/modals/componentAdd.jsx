import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate, alertMessageUpdate, autoUpdateAllReducer} from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography,List, ListItem} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import { useState, useEffect, useMemo, memo } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import {selectStyle, typoGrafyStyle} from '../components/style';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { getDataForAutocompliteList, getCategoryList, getDescriptionList } from "../../../../../redux/asyncThunc";
import { priceUpdate } from '../../order/functionOrder';

export const Component=()=>{
    const dispatch =useDispatch();
    const products = useSelector((state) => state.ordersAll.products);
    const atributes = useSelector((state) => state.ordersAll.atributes);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);
    const suppliers = useSelector((state) => state.ordersAll.suppliers);
    const cost=useSelector((state)=>state.ordersAll.newProduct.cost);
    const amount=useSelector((state)=>state.ordersAll.newProduct.amount);
    const categoryList = useSelector((state) => state.ordersAll.category);
    const discount =useSelector((state)=>state.ordersAll.newProduct.discount);
    const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
    const typeDiscount = useSelector((state)=>state.ordersAll.newProduct.typeDiscount);
    const price =useSelector((state)=>state.ordersAll.newProduct.price);
    const [attribute, setAtribute] = useState([])

const handleAutocompliteChange=(e, newValue)=>{
   let category =  categoryList.find(n=>n.id === newValue.category)
   if (category?.attribute?.length > 0) {
    let atribyteTooRender = category?.attribute.map(str=>(atrCategory.find(n=>n.id === str)))
    setAtribute(atribyteTooRender)
   } else setAtribute([])
    
 if (newValue.id === 'new_product') {   
    dispatch(getDescriptionList())
        dispatch(getCategoryList())
    dispatch(newProductUpdate({ str: 'clear'}))
    dispatch(getOpenTableCreate({id: 'newProductCreate', str: true}));
    return
 }
 dispatch(newProductUpdate({id: 'all', str: newValue}))
}

useEffect(()=>{
   let cost =  priceUpdate(price, amount ,discount ,typeDiscount)

   dispatch(newProductUpdate({id: 'cost', str: cost}))

},[price, amount, discount,typeDiscount])

const handleAtributeChange=(e, newValue,text, index)=>{  
    // console.log(newValue);
let productAtributes = newProduct?.attribute_id?.length > 0 ?[...newProduct.attribute_id]:[]
    if (newValue.id === 'new_atribute') { 
        if (productAtributes) {
            let prodCategory = categoryList.find(n=>n.id === newProduct.category).attribute[index]
            let prodAtrCat = atrCategory.find(n=>n.id === prodCategory)
            dispatch(autoUpdateAllReducer({id: 'category', state: 'newAtribute', str: prodAtrCat.id}))
          return  dispatch(getOpenTableCreate({id: 'newAtribute', str: true}));
        } else dispatch(getOpenTableCreate({id: 'newCreateAtribute', str: true}));  
        return
     }
let value = []
// console.log(productAtributes, attribute);
if (productAtributes.length > 0 && attribute.length > 1) {  
     if (productAtributes.length === attribute?.length) {       
        let atr = [...productAtributes]
         atr.splice(index,1, newValue.id) 
      return dispatch(newProductUpdate({id: 'attribute_id', str: atr}))
    } else console.log('sssssssssssssssss',productAtributes);
    //  else
    // console.log([...newProduct.attribute_id, newValue.id]);
    // return  value = [...newProduct.attribute_id, newValue.id]
   
} else if (newProduct.attribute_id.length > 0 && attribute.length === 1) {
     value = [newValue.id]
}  else if (newProduct.attribute_id.length === 0 && attribute.length > 0) {
    let arr =[ ...attribute].fill('')
    arr.splice(index,1, newValue.id)
    console.log(arr);
  return  dispatch(newProductUpdate({id: 'attribute_id', str: arr}))
} else value = [newValue.id]
    dispatch(newProductUpdate({id: 'attribute_id', str: value}))

}
const handleSupliersChange=(e, newValue)=>{    
    if (newValue.id === 'new_suppliers') {
          dispatch(getOpenTableCreate({id: 'newSuppliers', str: true}));
        return
     }
    dispatch(newProductUpdate({id: 'supplier_id', str: [newValue.id]}))
}


const handleChangeDiscount=(e)=>{
    let t = ((cost?Number(cost):1) * (amount?Number(amount):1))
    let n = e.target.value.replace(/[^0-9.]/g, '');
    if (typeDiscount === '%' && n <= 100) {
        dispatch(newProductUpdate({id: 'discount', str: n}))
    } else if (typeDiscount === 'ua' && n <= t) {
        dispatch(newProductUpdate({id: 'discount', str: n})) 
    }
    
}

const handleChangeSelect=(e)=>{
    dispatch(newProductUpdate({id: 'discount', str: ''})) 
    dispatch(newProductUpdate({id: 'typeDiscount', str: e.target.value})) 
    // setTypeDiscount(e.target.value)
}
const createNewProduct={id: 'new_product', name: 'Створити новий товар', data: 'Створити новий товар'}
const addAtribute = {id: 'new_atribute', name: 'Встановити атрибут', data: 'Встановити атрибут'}
const newSupliers = {id: 'new_suppliers', name: 'Створити постачальника', data: 'Створити постачальника'}

const handleOnProductChange=(value)=>{
dispatch(newProductUpdate({str: 'clear'}))
setAtribute([])
}
const handleOnAtributesChange=(value)=>{
    // dispatch(getDataForAutocompliteList(value))
    dispatch(newProductUpdate({id: 'attribute_id',str: ''}))
    }

const getSupliersAutocompliteList=(value)=>{
    // dispatch(newProductUpdate({id: 'parent_id', str: ''}))
  
}
const getValue=(str,i)=>{
    // console.log(str, i, newProduct);
    if (newProduct?.attribute_id[i] && attribute?.length === 1) {
         return  atributes[str.id].find(n=>n.id === newProduct.attribute_id[i])    
    } else if (newProduct?.attribute_id[i] && attribute?.length > 1) {
        if (atributes[str.id]?.find(n=>n.id === newProduct.attribute_id[i]) ) {
            return atributes[str.id]?.find(n=>n.id === newProduct.attribute_id[i]) 
        } else return atributes[str.id][0]?atributes[str.id][0]:str
    } else  return str
   
}

const ListItemStyle = {width: '100%', padding: '5px'}
    return(
    <DialogContent>

    <Box sx={{width: '100%'}}>
<List sx={{width: '100%'}}>
    <ListItem sx={ListItemStyle}>
        <AutocompliteComponent data={[createNewProduct,...products]} disp={handleAutocompliteChange} textContent={'Товар:'} id={'name'}
         value={products.find(n=>n.name === newProduct.name)} dafaultValue={createNewProduct.name} label={'Назва товару'} 
         showInput={true}  onInputFunc={handleOnProductChange} sort={true} onInputfocus={handleOnProductChange} render={'value'}/ >
    </ListItem>
{ attribute.length === 0 ?   <ListItem  sx={ListItemStyle}>
            <AutocompliteComponent  data={[addAtribute]} disp={handleAtributeChange} textContent={'Атрибути:'}
                 value={null} dafaultValue={false} index={0}
                 label={'Не встановлено'} onInputFunc={false} showInput={attribute.length >0 || newProduct.name !== ''} sort={false} / >
            </ListItem>:null }
            
    {attribute.length >0 ? attribute.map((str,i)=>{
     let data = []
     if (atributes[str.id]) {
        data = [...atributes[str.id]]
     }
    //  console.log(data);
        return(
            <ListItem key = {i} sx={ListItemStyle}>
            <AutocompliteComponent key={i} data={[addAtribute, ...data]} disp={handleAtributeChange} textContent={i === 0?'Атрибути:':''}
                   value={getValue(str,i)} 
                 dafaultValue={false} index={i}
                 label={'Не встановлено'} onInputFunc={false} showInput={true} sort={false} / >
            </ListItem> 
        )
    }):null}
    <ListItem sx={ListItemStyle}>
        <InputTextComponent id={'price'} textContent={'Ціна:'} num={true} path={'newProduct'} label={'Ціна'} />
    </ListItem>
    <ListItem sx={ListItemStyle}>
        <InputTextComponent id={'amount'} textContent={'Кількість:'} num={true} path={'newProduct'} label={'Кількість'}/>
    </ListItem>
    <ListItem sx={{width: '100%', padding: '5px', }}>
    <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
    <Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
        <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', '@media (min-width:599px)':{textAlign: 'right'  }}} >
        <Typography sx={typoGrafyStyle} component={'h5'}>Скидка:</Typography>
        </Grid>
        <Grid xs={6} sm={6} sx={{maxWidth: '250px',width: '250px', justifyContent: 'space-between',maxHeight: '32px', '@media (min-width:599px)':{textAlign: 'right'  }, display: 'flex', justifyContent: 'space-between'}} >
        <TextField autoComplete='off'  value={discount} onChange={handleChangeDiscount} sx={selectStyle} id="outlined-basic" variant="outlined" placeholder="Скидка" />
        <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"        
                label={!typeDiscount?"Discount":''}
                onChange={handleChangeSelect}
                defaultValue= '%'
                value={typeDiscount}
                sx={selectStyle}
                
                >
                            <MenuItem value={'%'}>{'%'}</MenuItem>
                             <MenuItem value={'ua'}>{'UAH'}</MenuItem>
                </Select>
  </Grid>

</Grid>
</Box>
    </ListItem>
    <ListItem sx={ListItemStyle}>   
        <AutocompliteComponent data={[newSupliers, ...suppliers]} disp={handleSupliersChange} textContent={'Постачальник:'}
         value={suppliers.find(n=>n.id === newProduct?.supplier_id[0])} dafaultValue={false} label={'Не встановлено'}
         onInputFunc={getSupliersAutocompliteList} showInput={true} free={false} sort={true}/ >
    </ListItem>
    <ListItem sx={{width: '100%', padding: '5px', alignItems: 'center', maxHeight: '30px'}}>
    <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
    <Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
        <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', alignItems: 'center', '@media (min-width:599px)':{textAlign: 'right'  }}} >
        <Typography component={'h5'}>Всього:</Typography>
        </Grid>
        <Grid xs={4} sm={6} sx={{maxWidth: '250px', justifyContent: 'space-around', alignItems: 'center', maxHeigth: '40px' }} >
        {cost >0 && <Typography sx={{fontSize: '16px', textAlign: 'center', alignItems: 'center'}} component={'h5'}>{Number(cost).toFixed(2)}</Typography>}
       
  </Grid>

</Grid>
</Box>
    </ListItem>
    
</List>
  
    </Box >
    </DialogContent>
)}