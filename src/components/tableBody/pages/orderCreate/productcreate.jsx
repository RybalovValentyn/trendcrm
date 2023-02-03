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
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { productsdataUpdate, getOpenTableCreate } from '../../../../redux/ordersReduser';
import { getDataForAutocompliteList, getAtributesAutocompliteList, getSupliersList, getCategoryList } from '../../../../redux/asyncThunc';

const  ProductCreateComponent=()=>{
const dispatch = useDispatch();
const [add1, setAdd1] = useState(false)
const [add2, setAdd2] = useState(false)
const [value1, setValue1]= useState(0.00)
const [value2, setValue2]= useState(0.00)

const discountValue = useSelector((state)=>state.ordersAll.productData.discount)
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
const handleAddProduct=()=>{
    dispatch(getOpenTableCreate({id: 'productCreate', str: true}));
    dispatch(getDataForAutocompliteList())
    dispatch(getAtributesAutocompliteList())
    dispatch(getSupliersList())
    dispatch(getCategoryList())
    // console.log('sdfsff');

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
const handleChangeSelect=()=>{

}
const handleChangeDiscount=(e)=>{
    let n = e.target.value.replace(/[^0-9.]/g, '');
    console.log(discountValue);
dispatch(productsdataUpdate({id:'discount', str: n}))
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
    <TextField value={discountValue} onChange={handleChangeDiscount} sx={selectStyle} id="outlined-basic" variant="outlined" />
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"        
          label="Age"
          onChange={handleChangeSelect}
          defaultValue= '%'
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
        <Typography  sx={listTextStyle} component={'h5'}>{`Сума замовлення: ${value2}`}</Typography>
        
    </ListItem>
</List>
</Box>

        </Paper>
    )
}

export default ProductCreateComponent