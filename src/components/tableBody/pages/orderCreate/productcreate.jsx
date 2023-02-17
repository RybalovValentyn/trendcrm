import {Paper,Typography} from '@mui/material';
// import { StyledList } from "./styles"
import { useDispatch, useSelector,  } from 'react-redux';
import { typographyStyle } from '../order/forms/styles';
import { formStyle } from '../order/forms/styles';
// import { boxStyle } from './styles';
// import {Label } from './styles';
// import { setClientForm } from '../../../../../redux/ordersReduser';
import {Box, } from '@mui/material';
import TableProduct from './tableproduct';
import { StyledButton } from '../../../buttons/buttons';
import { colorsRef } from '../../../../consts/colorConstants';
// import { colorsRef } from '../../../../../consts/colorConstants';
import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { productsdataUpdate, getOpenTableCreate, getFormTable } from '../../../../redux/ordersReduser';
import { getDataForAutocompliteList, getAtributesAutocompliteList, getSupliersList, getCategoryList, setAtributeCategoryList } from '../../../../redux/asyncThunc';
import { priceUpdate } from '../order/functionOrder';


const  ProductCreateComponent=()=>{
const dispatch = useDispatch();
const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
const total = useSelector((state) => state.ordersAll.createRows.total);
const [add1, setAdd1] = useState(false)
const [add2, setAdd2] = useState(false)
const [value1, setValue1]= useState(0.00)
const [value2, setValue2]= useState(0.00)
const [discount, setDiscount] = useState(0)
const [type, setType] = useState('%')

const products = useSelector((state) => state.ordersAll.productData);

const switchBoxStyle={
display: 'flex',
alignItems: 'center',
padding: '0 10px'

}
const listTextStyle={
    fontWeight: '500',
     fontSize: '19px',
     marginLeft: 'auto'
}
const selectStyle={
    maxWidth: '81px',   
    minWidth: '80px', 
    marginLeft: '10px',
    '& .MuiInputBase-input':{
        padding: '5px',

    }

}

useEffect(()=>{
    let summ = getSum()
    let cost =  priceUpdate(summ, '1' ,discount ,type )
    if (cost && !isUpdateRows) {
        setValue2(cost) 
        dispatch(getFormTable({id:'backward_delivery_summ', str: cost}))        
    }else if (products.length === 0 && !isUpdateRows) {
        setValue2(0) 
        dispatch(getFormTable({id:'backward_delivery_summ', str: 0}))  
    }
    
 },[discount, type, products])


function getSum(){
 return (products.reduce((acc,str,i)=>{
        if (Number(str.cost)) {
            acc = acc+Number(str.cost)
        }
        return acc
            },0) ) 
}
const handleAddProduct=()=>{
    dispatch(getOpenTableCreate({id: 'productCreate', str: true}));
    dispatch(getDataForAutocompliteList())
    dispatch(getAtributesAutocompliteList())
    dispatch(getSupliersList())
    dispatch(getCategoryList())
    dispatch(setAtributeCategoryList())

}
const handleAddGroupProducts=()=>{

}

const ButtonComponent =()=>(
    <Box sx={{padding: '10px 0'}}>
    <StyledButton
          text={'Добавити товар'}
          func= {handleAddProduct}
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
            />  
    <StyledButton
          text={'Набір товарів'}
          func= {handleAddGroupProducts}
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
          margin={'0px 0px 0px 10px'}
            /> 
        </Box>
)
const handleChangeSelect=(e)=>{
    setType(e.target.value)
}
const handleChangeDiscount=(e)=>{
    let n = e.target.value.replace(/[^0-9.]/g, '');
    setDiscount(n)
}

    return(
        <Paper component="form" sx={formStyle}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         ТОВАРИ:
        </Typography >

        <TableProduct/>

        <ButtonComponent/>
        <Box>
            <Box>
                <Box sx={switchBoxStyle}>
                    <Switch onChange={(e)=>setAdd1(e.target.checked)} color="warning"/>
                    <Typography sx={{fontSize: '13px'}}>
                        Допродажа №1 (послуги)
                    </Typography>
                </Box>
            {  add1?    <StyledButton
                text={'Додати товар'}
                func= {handleAddGroupProducts}
                border={colorsRef.buttonBorderInModal}
                bgColor={colorsRef.btnAddBgColor}
                margin={'0px 0px 0px 10px'}
                />: null}
        </Box>
        <Box>
                <Box sx={switchBoxStyle}>
                    <Switch onChange={(e)=>setAdd2(e.target.checked)} color="warning"/>
                    <Typography sx={{fontSize: '13px'}}>
                        Допродажа №1 (послуги)
                    </Typography>
                </Box>
              { add2? <ButtonComponent/>: null}
        </Box>
        </Box>
<Box>
<List sx={{textAlign: 'right'}}>
    <ListItem sx={{padding: 0}}>
        <Typography sx={listTextStyle} component={'h5'}>Скидка:</Typography>
    <TextField value={discount} onChange={handleChangeDiscount} sx={selectStyle} id="outlined-basic" variant="outlined" />
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"        
          label="Age"
          onChange={handleChangeSelect}
          defaultValue= '%'
          value = {type}
        sx={selectStyle}
        >
        <MenuItem value={'%'}>{'%'}</MenuItem>
        <MenuItem value={'ua'}>{'UAH'}</MenuItem>
    </Select>

    </ListItem>
    <ListItem sx={{padding: 0}}>
        <Typography  sx={listTextStyle} component={'h5'}>{`Сума допродажі: ${value1}`}</Typography>
        
    </ListItem>
    <ListItem sx={{padding: 0}}>
        <Typography  sx={listTextStyle} component={'h5'}>{`Сума замовлення: ${isUpdateRows?total:value2}`}</Typography>
        
    </ListItem>
</List>
</Box>

        </Paper>
    )
}

export default ProductCreateComponent