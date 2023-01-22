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

 const ProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.productCreate);
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
    dispatch(getOpenTableCreate({id: 'productCreate', str: false}));
    dispatch(newProductUpdate({id: '', str: 'clear'}))
    setIsShow(false)

}
const handleAutocompliteChange=(e, newValue)=>{
    let id = e.target?.id?.split('-')[2]
 if (id === '0') {
    console.log('newValue');
    dispatch(newProductUpdate({id: 'name', str: ''}))
    dispatch(getOpenTableCreate({id: 'newProductCreate', str: true}));
    return
 }

    dispatch(newProductUpdate({id: 'name', str: newValue.name}))
    dispatch(newProductUpdate({id: 'value', str: newValue.name}))
    if (newValue) {
        setIsShow(true)
    }
}

useEffect(()=>{
    let disc = 1;
    let t = (cost?cost:0 *count?count:1)
    if (discount && typeDiscount === '%') {
      disc = discount/100 
      return  setTotal(t - (t*disc))
    } else if (discount && typeDiscount === 'ua') {
        return  setTotal(t-discount)
    }
    
    setTotal(cost)

},[cost, count, discount,typeDiscount])


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

const ListItemStyle = {width: '100%', padding: '5px'}
const Component=()=>(
    <DialogContent>
        
    <Box sx={{width: '100%'}}>
<List sx={{width: '100%'}}>
    <ListItem sx={ListItemStyle}>
        <AutocompliteComponent data={[createNewProduct,...products]} disp={handleAutocompliteChange} textContent={'Товар:'}
         value={products.find(n=>n.name === newProduct.name)} dafaultValue={false} label={'Назва товару'} showInput={true} / >
    </ListItem>
    <ListItem sx={ListItemStyle}>
    <AutocompliteComponent data={products} disp={handleAtributeChange} textContent={'Атрибути:'}
         value={products.find(n=>n.name === newProduct.name)} dafaultValue={false} label={'Атрибути'} showInput={isShow}/ >
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
        <TextField autoFocus={focus} onBlur={()=>setFocus(false)} value={discount} onChange={handleChangeDiscount} sx={selectStyle} id="outlined-basic" variant="outlined" placeholder="Скидка" />
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
        <AutocompliteComponent data={products} disp={handleAutocompliteChange} textContent={'Постачальник:'}
         value={products.find(n=>n.name === newProduct.name)} dafaultValue={false} label={'Не вибрано'} showInput={true} free={false}/ >
    </ListItem>
    <ListItem sx={{width: '100%', padding: '5px', alignItems: 'center', maxHeight: '30px'}}>
    <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
    <Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
        <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', alignItems: 'center', '@media (min-width:599px)':{textAlign: 'right'  }}} >
        <Typography component={'h5'}>Всього:</Typography>
        </Grid>
        <Grid xs={4} sm={6} sx={{maxWidth: '250px', justifyContent: 'space-around', alignItems: 'center', maxHeigth: '40px' }} >
        {total >0 && <Typography sx={{fontSize: '16px', textAlign: 'center', alignItems: 'center'}} component={'h5'}>{Number(total).toFixed(2)}</Typography>}
       
  </Grid>

</Grid>
</Box>
    </ListItem>
    
</List>
  
    </Box >
    </DialogContent>
)


    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Добавити'} titleText={"Добавити товар"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'}/>
  
     )
}

export default ProductCreate