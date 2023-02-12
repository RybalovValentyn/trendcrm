import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import IconButton from '@mui/material/IconButton';
import { colorsRef } from '../../consts/colorConstants';
import { useDispatch, useSelector,  } from 'react-redux';
import { postRowsFromForm, getRowsAfterAdd, getAllOrders } from '../../redux/asyncThunc';
import { useEffect } from 'react';
import { getClouseTableCreate, getOpenTableCreate } from '../../redux/ordersReduser';
import {useNavigate} from 'react-router-dom';

export const SaveButton = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector((state) => state.ordersAll.createRows.id);
    const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
    const products = useSelector((state) => state.ordersAll.productData);
    const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
    const suppliers = useSelector((state) => state.ordersAll.suppliers);
    const atributes = useSelector((state) => state.ordersAll.atributes);
    const categoryList = useSelector((state) => state.ordersAll.category);
    const orderUpdate = useSelector((state) => state.ordersAll.createRows);

//     useEffect(() => {
//      if (id && !isUpdateRows) {
//         console.log(id);
      
//      }
//    }, [id]);

const sendNewProduct =({attribute_id, category,count, discount,price, data, supplier_id,typeDiscount})=>{
    let atr = attribute_id?.split(',');
    let attribute = atr.length > 0 ? atr.map((str,i)=>{ return {id: str}}) : []
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
    dispatch(getAllOrders());
}
}
    const btnChangeSave =()=>{
        let sendData = products.length > 0 ? products.map(n=>(sendNewProduct(n))): []
        dispatch(postRowsFromForm(sendData))
  
            setTimeout(update, 200);
        
      
        // if (id) {
        //     
        //     navigate('/trendcrm/orders');               
        //     console.log('hi');  
        // }
        
        console.log(sendData);
    }

const icoBtnStyle = {
    color: colorsRef.inputTextColor,
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    position: 'fixed',
    boxShadow:' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    bottom: '50px',
    right: '66px',
    display: "block"
}
    return(

        <IconButton sx={icoBtnStyle} onClick={btnChangeSave} color="primary" aria-label="upload picture" component="label">
        <SaveAsOutlinedIcon />
      </IconButton>
    )
}

