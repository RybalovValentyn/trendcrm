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
import NewProductCreateComponent from './newProdCreateComp'

 const NewProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newProductCreate);
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
    dispatch(getOpenTableCreate({id: 'newProductCreate', str: false}));
    // dispatch(newProductUpdate({id: '', str: 'clear'}))
    setIsShow(false)

}

const handleChange=(e)=>{
console.log('handleChange');

}



    return(
        <ModalProductComponent Component={NewProductCreateComponent} funcOnClouse={handleClouse} open={open}  sendButtonText={'Створити'}
         titleText={"Створення товару"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'md'}/>
  
     )
}

export default NewProductCreate