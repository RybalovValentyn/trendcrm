import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography, Autocomplete, List, ListItem} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import {listTextStyle, selectStyle, typoGrafyStyle} from '../components/style';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

 const NewSupliersCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newSuppliers);
    const products = useSelector((state) => state.ordersAll.products);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);
    const cost=useSelector((state)=>state.ordersAll.newProduct.cost)
    const count =useSelector((state)=>state.ordersAll.newProduct.count);
    const [isShow, setIsShow] = useState(false);
    // const discountValue = useSelector((state)=>state.ordersAll.productData.discount)
    const [discount, setDiscount] = useState('');
    const [typeDiscount, setTypeDiscount] = useState('%');
    const [focus, setFocus] = useState(false);
    const [total, setTotal] = useState('')

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'newSuppliers', str: false}));
    // dispatch(newProductUpdate({id: '', str: 'clear'}))
    setIsShow(false)

}
const handleAutocompliteChange=(e, newValue)=>{
    let id = e.target?.id?.split('-')[2]

    if (newValue) {
        setIsShow(true)
    }
}



const handleAtributeChange=(e, newValue)=>{
//     dispatch(newProductUpdate({id: 'name', str: newValue.name}))
//     dispatch(newProductUpdate({id: 'value', str: newValue.name}))
console.log(products.find(n=>n.name === newProduct.name));
}

const handleChange=(e)=>{
console.log('handleChange');

}

const handleChangeDiscount=(e)=>{
    setFocus(true)
    let n = e.target.value.replace(/[^0-9.]/g, '');
    setDiscount(n)
}
const handleChangeSelect=(e)=>{
setTypeDiscount(e.target.value)
}
const createNewProduct={id: '0', name: 'Створити новий товар', data: 'Створити новий товар'}

const Component=()=>(
    <DialogContent>
        
    <Box sx={{width: '100%'}}>
<List sx={{width: '100%'}}>
    <ListItem sx={{width: '100%', padding: '5px'}}>
        <AutocompliteComponent data={[createNewProduct,...products]} disp={handleAutocompliteChange} textContent={'Товар:'}
         value={products.find(n=>n.name === newProduct.name)} dafaultValue={false} label={'Назва товару'} showInput={true} / >
    </ListItem>
    
</List>
  
    </Box >
    </DialogContent>
)


    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Зберегти'} titleText={"Визначити атрибути для товару"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'xs'}/>
  
     )
}

export default NewSupliersCreate