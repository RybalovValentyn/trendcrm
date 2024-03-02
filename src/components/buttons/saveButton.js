import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import IconButton from '@mui/material/IconButton';
import { colorsRef } from '../../consts/colorConstants';
import { useDispatch, useSelector,  } from 'react-redux';
import { postRowsFromForm, getRowsAfterAdd, getAllOrders, postRowsAfterUpdate } from '../../redux/asyncThunc';
import { useEffect, useState } from 'react';
import { getClouseTableCreate, getOpenTableCreate, autoUpdate } from '../../redux/ordersReduser';
import {useNavigate} from 'react-router-dom';
import { BootstrapTooltip } from '../tableBody/pages/order/styles';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import Box from '@mui/material/Box';

export function onChangeConstInInput(e) {
    // console.log(e);
}

export const SaveButton = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector((state) => state.ordersAll.createRows.id);
    const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
    const products = useSelector((state) => state.ordersAll.productData);
    const rows = useSelector((state) => state.ordersAll.createRows);
    const updateClient = useSelector((state) => state.ordersAll.updateClient);
    const updateRows = useSelector((state) => state.ordersAll.updateRows);
    const client = useSelector((state) => state.ordersAll.client);
    const copyRowsUpdateAction = useSelector((state) => state.ordersAll.copyRowsUpdateAction);
    const copyClientUdateAction= useSelector((state) => state.ordersAll.copyClientUdateAction);

    useEffect(() => {
        let s = isUpdated()
        if (s && id && isUpdateRows) {
                       window.onbeforeunload = (e) => { 
                e.preventDefault();
                return ""
        }} else if (!s) {
            window.onbeforeunload = null  
        }           
       
      }, [updateClient, updateRows]);


    useEffect(() => {
     if (id && !isUpdateRows) {
        setTimeout(update, 200);
     }
   }, [id]);

const sendNewProduct =({attribute_id, category,count, discount,price, data, supplier_id,typeDiscount})=>{
    let atr = typeof(attribute_id) === 'string'?attribute_id?.replace(/[']/g, []).split(','): (attribute_id?.length > 0 ? [...attribute_id]: []);
    let attribute = atr.length > 0 ? atr.map((str,i)=>{ return {id: Number(str)}}) : []
    let amount = count;
    let discount_type = typeDiscount === '%'?'0': '1'
    let presale_type = '0';
    let product_id = data;
    let supplier = supplier_id[0]?supplier_id[0]:null
return {attribute,amount,discount, presale_type, price, product_id, supplier, discount_type}
}
const update=()=>{
    if (id) {
    dispatch(getRowsAfterAdd(id));
    dispatch(autoUpdate({id: 'isUpdateRows', str: true}));   
    navigate(`/order/${id}`); 
}
}

const updateAndexit = ()=>{
    dispatch(getAllOrders());
    dispatch(autoUpdate({id: 'isUpdateRows', str: false}));  
    navigate(`/orders`); 
}

const isUpdated=()=>{
    let up = Object.values({...updateClient, ...updateRows}).filter(n=>n===1).length
    return up ===0?false:true
}

const arrayData = ['amount', 'cost', 'discount', 'name', 'price', 'product_id', 'supplier_id', 'type_discount']

const productsSendUpdated=(data)=>{
    if (data === 'supplier_id') {
        return {[data]: products.map(n=>(n[data]?n[data][0]:''))}   
    }else if (data === 'type_discount') {
        return {type_discount: products.map(n=>(n.typeDiscount === "%"? '0':'1'))}   
    }else if (data === 'amount') {
        return {amount: products.map(n=>(n.count?n.count:'0'))}   
    }else return {[data]: products.map(n=>(n[data]?n[data]:''))}
}

const dataSendForm = ()=>{
const dataSendProducts =products.length > 0 ? arrayData.reduce((acc,n)=>{
    acc[n] = productsSendUpdated(n)[n]
    return acc
},{}): []
let objKeys = Object.keys(rows)
let dataObjectRows = objKeys.reduce((acc, str, i)=>{
    if (rows[str] && rows[str] !== '' && Number(rows[str]) !== 0) {
        acc[str] = rows[str]
    }
 return acc
},{})
return {...dataObjectRows, ...dataSendProducts, ...client}
}

const btnChangeSave =()=>{
    if (!isUpdateRows) {
        let sendData = products.length > 0 ? products.map(n=>(sendNewProduct(n))): []
        dispatch(postRowsFromForm(sendData))  
            setTimeout(update, 200);      
 
    } else if (isUpdateRows) {
        window.onbeforeunload = null
       let dataSend =  dataSendForm()
      dispatch(postRowsAfterUpdate({id, dataSend}))  
    }
}

const btnChangeSaveAndExit=()=>{
 window.onbeforeunload = null
let dataSend =  dataSendForm()
dispatch(postRowsAfterUpdate({id, dataSend}))  
setTimeout(updateAndexit, 200)
}

const icoBtnStyle = {
    color: colorsRef.inputTextColor,
    width: '45px',
    height: '45px',
    borderRadius: '50%',    
    boxShadow: '0px 0px 5px 1px #43a047',
    "&:hover":{
        boxShadow: '0px 0px 5px 5px #43a047',   
    } 
}
const boxIcoStyle={
    position: 'fixed',
    bottom: '50px',
    right: '66px',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center'
}
const firstButtonStyle={
    color: colorsRef.inputTextColor,
    boxShadow: '0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    marginBottom: '20px',
    "&:hover":{
        boxShadow: '0px 0px 5px 1px #43a047',   
    }

}



    return(
        
        <Box sx={boxIcoStyle}>
        {isUpdateRows?<BootstrapTooltip title="Зберегти та вийти" placement="left" >
        <IconButton sx={{...icoBtnStyle, ...firstButtonStyle}} onClick={btnChangeSaveAndExit} color="primary" aria-label="upload picture" component="label">
        <ReplyAllIcon />
      </IconButton>
      </BootstrapTooltip>:null}
    <BootstrapTooltip title="Зберегти" placement="left" >
        <IconButton sx={icoBtnStyle} onClick={btnChangeSave} color="primary" aria-label="upload picture" component="label">
        <SaveAsOutlinedIcon />
      </IconButton >
      </BootstrapTooltip>
      </Box>
    )
}

