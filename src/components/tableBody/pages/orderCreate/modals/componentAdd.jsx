import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate, alertMessageUpdate } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography, Autocomplete, List, ListItem} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import { useState, useEffect, useMemo, memo } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import {selectStyle, typoGrafyStyle} from '../components/style';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { getDataForAutocompliteList, getCategoryList, getDescriptionList } from "../../../../../redux/asyncThunc";

export const Component=()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.productCreate);
    const products = useSelector((state) => state.ordersAll.products);
    const atributes = useSelector((state) => state.ordersAll.atributes);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);
    const suppliers = useSelector((state) => state.ordersAll.suppliers);
    const cost=useSelector((state)=>state.ordersAll.newProduct.cost)
    const count =useSelector((state)=>state.ordersAll.newProduct.count);
    const [isShow, setIsShow] = useState(false);
    const discount =useSelector((state)=>state.ordersAll.newProduct.discount);
      const [typeDiscount, setTypeDiscount] = useState('%');
    const price =useSelector((state)=>state.ordersAll.newProduct.price);

const handleAutocompliteChange=(e, newValue)=>{
 if (newValue.id === 'new_product') {
    dispatch(getDescriptionList())
        dispatch(getCategoryList())
    dispatch(newProductUpdate({ str: 'clear'}))
    dispatch(getOpenTableCreate({id: 'newProductCreate', str: true}));
    return
 }
 dispatch(newProductUpdate({id: 'all', str: newValue}))
   if (newValue) {
        setIsShow(true)
    }
}

useEffect(()=>{
    let t = ((cost?Number(cost):0) * (count?Number(count):1))
    if (typeDiscount === '%') {
        let d = t* Number(discount)/100        
        let num = t - d
        dispatch(newProductUpdate({id: 'price', str: num})
        )} else if (typeDiscount === 'ua') {
            let num = t- (discount?Number(discount):0)
            dispatch(newProductUpdate({id: 'price', str: num}))   
        } else dispatch(alertMessageUpdate({message: 'alert1', type: 'info'}))

},[cost, count, discount,typeDiscount])


const handleAtributeChange=(e, newValue)=>{    
    if (newValue.id === 'new_atribute') {
        console.log(newValue);
          dispatch(getOpenTableCreate({id: 'newAtribute', str: true}));
        return
     }
    dispatch(newProductUpdate({id: 'attribute_id', str: newValue.id}))
console.log('newValue');
}
const handleSupliersChange=(e, newValue)=>{    
    if (newValue.id === 'new_suppliers') {
          dispatch(getOpenTableCreate({id: 'newSuppliers', str: true}));
        return
     }
    dispatch(newProductUpdate({id: 'parent_id', str: newValue.name}))
    dispatch(newProductUpdate({id: 'supplier_id', str: newValue}))
}


const handleChangeDiscount=(e)=>{
    let t = ((cost?Number(cost):1) * (count?Number(count):1))
    let n = e.target.value.replace(/[^0-9.]/g, '');
    if (typeDiscount === '%' && n <= 100) {
        dispatch(newProductUpdate({id: 'discount', str: n}))
    } else if (typeDiscount === 'ua' && n <= t) {
        dispatch(newProductUpdate({id: 'discount', str: n})) 
    }
    
}

const handleChangeSelect=(e)=>{
    dispatch(newProductUpdate({id: 'discount', str: ''})) 
    dispatch(newProductUpdate({id: 'price', str: ''}))
    setTypeDiscount(e.target.value)
}
const createNewProduct={id: 'new_product', name: 'Створити новий товар', data: 'Створити новий товар'}
const addAtribute = {id: 'new_atribute', name: 'Встановити атрибут', data: 'Встановити атрибут'}
const newSupliers = {id: 'new_suppliers', name: 'Створити постачальника', data: 'Створити постачальника'}

const handleOnProductChange=(value)=>{
dispatch(getDataForAutocompliteList(value))
dispatch(newProductUpdate({str: 'clear'}))
}
const handleOnAtributesChange=(value)=>{
    // dispatch(getDataForAutocompliteList(value))
    dispatch(newProductUpdate({id: 'attribute_id',str: ''}))
    }

const getSupliersAutocompliteList=(value)=>{
    dispatch(newProductUpdate({id: 'parent_id', str: ''}))
  
}

const ListItemStyle = {width: '100%', padding: '5px'}
    return(
    <DialogContent>

    <Box sx={{width: '100%'}}>
<List sx={{width: '100%'}}>
    <ListItem sx={ListItemStyle}>
        <AutocompliteComponent data={[createNewProduct,...products]} disp={handleAutocompliteChange} textContent={'Товар:'} id={'name'}
         value={products.find(n=>n.name === newProduct.name)} dafaultValue={createNewProduct.name} label={'Назва товару'} 
         showInput={true}  onInputFunc={handleOnProductChange} sort={false}/ >
    </ListItem>
    <ListItem sx={ListItemStyle}>
    <AutocompliteComponent data={[addAtribute, ...atributes]} disp={handleAtributeChange} textContent={'Атрибути:'}
         value={atributes.find(n=>n.name === newProduct.attribute_id)} dafaultValue={addAtribute.name}
         label={'Не встановлено'} onInputFunc={handleOnAtributesChange} showInput={isShow} sort={false} / >
    </ListItem>
    <ListItem sx={ListItemStyle}>
        <InputTextComponent id={'cost'} textContent={'Ціна:'} num={true} path={'newProduct'} label={'Ціна'} />
    </ListItem>
    <ListItem sx={ListItemStyle}>
        <InputTextComponent id={'count'} textContent={'Кількість:'} num={true} path={'newProduct'} label={'Кількість'}/>
    </ListItem>
    <ListItem sx={{width: '100%', padding: '5px', }}>
    <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
    <Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
        <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', '@media (min-width:599px)':{textAlign: 'right'  }}} >
        <Typography sx={typoGrafyStyle} component={'h5'}>Скидка:</Typography>
        </Grid>
        <Grid xs={6} sm={6} sx={{maxWidth: '250px',width: '250px', justifyContent: 'space-between',maxHeight: '32px', '@media (min-width:599px)':{textAlign: 'right'  }, display: 'flex', justifyContent: 'space-between'}} >
        <TextField  value={discount} onChange={handleChangeDiscount} sx={selectStyle} id="outlined-basic" variant="outlined" placeholder="Скидка" />
        <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"        
                label="Age"
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
         value={suppliers.find(n=>n.name === newProduct.parent_id)} dafaultValue={newSupliers.name} label={'Не встановлено'}
         onInputFunc={getSupliersAutocompliteList} showInput={true} free={false} sort={true}/ >
    </ListItem>
    <ListItem sx={{width: '100%', padding: '5px', alignItems: 'center', maxHeight: '30px'}}>
    <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
    <Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
        <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', alignItems: 'center', '@media (min-width:599px)':{textAlign: 'right'  }}} >
        <Typography component={'h5'}>Всього:</Typography>
        </Grid>
        <Grid xs={4} sm={6} sx={{maxWidth: '250px', justifyContent: 'space-around', alignItems: 'center', maxHeigth: '40px' }} >
        {price >0 && <Typography sx={{fontSize: '16px', textAlign: 'center', alignItems: 'center'}} component={'h5'}>{Number(price).toFixed(2)}</Typography>}
       
  </Grid>

</Grid>
</Box>
    </ListItem>
    
</List>
  
    </Box >
    </DialogContent>
)}