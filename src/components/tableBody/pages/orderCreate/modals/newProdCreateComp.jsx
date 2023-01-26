import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate, newProductCreate } from "../../../../../redux/ordersReduser";
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
import { getDescriptionList } from "../../../../../redux/asyncThunc";

const NewProductCreateComponent=()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newProductCreate);
    const products = useSelector((state) => state.ordersAll.products);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);
    const descriptionList = useSelector((state) => state.ordersAll.descriptionList);

    const handleAutocompliteChange=(e, newValue)=>{
        let id = e.target?.id?.split('-')[2]
    
    }
    const createNewProduct={id: '0', name: 'Створити новий товар', data: 'Створити новий товар'}

    return(
        <DialogContent>

<Box sx={{ flexGrow: 1 , }}>
      <Grid container spacing={2}>
        <Grid xs={11} sm={6} sx={{padding: '20px'}}>
        <InputTextComponent id={'name'} textContent={'Назва*:'} disp={newProductCreate} num={false} path={'productCreate'} label={''} alignCenter={true} alignText={true} />
        <AutocompliteComponent data={descriptionList} disp={newProductCreate} textContent={'Назва*:'}
             value={products.find(n=>n.name === newProduct.name)} dafaultValue={false} label={''} showInput={true} alignCenter={true} alignText={true}/ >
        </Grid>
        <Grid xs={11} sm={6} sx={{padding: '20px'}}>
        <AutocompliteComponent data={[createNewProduct,...products]} disp={newProductCreate} textContent={'Товар:'}
             value={products.find(n=>n.name === newProduct.name)} dafaultValue={false} label={'Назва товару'} showInput={true} alignCenter={true}/ >
        </Grid>

      </Grid>
    </Box>
        

        </DialogContent>
    )
}

export default NewProductCreateComponent