import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate, autoUpdate } from "../../../../../redux/ordersReduser";
import { Component } from "./componentAdd";
import {addProductTooOrder, getProductFromId} from '../../../../../redux/asyncThunc.js';

 const ProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.productCreate);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);
    const products = useSelector((state) => state.ordersAll.productData);
    const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
    const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
    const suppliers = useSelector((state) => state.ordersAll.suppliers);
    const atributes = useSelector((state) => state.ordersAll.atributes);
    const categoryList = useSelector((state) => state.ordersAll.category);
    const orderUpdate = useSelector((state) => state.ordersAll.createRows);

const handleClouse=()=>{   
    dispatch(getOpenTableCreate({id: 'productCreate', str: false}));
    dispatch(newProductUpdate({id: '', str: 'clear'}))
}
const sendNewProduct =({attribute_id, category, cost, count, discount, name, price, data, supplier_id,typeDiscount})=>{
    let atr = attribute_id?.split(',');
    let categoryProduct = categoryList.find(n=>n.id === category).attribute
    let atributesProduct = categoryProduct.map(n=>(atributes[n]))
    let attribute = atributesProduct.map((str,i)=>{
   return atributesProduct[i].find(n=> +n.id === +eval(atr[i]))    
    });

let amount = count;
let type_discount = typeDiscount === '%'?'0': '1'
let order_id = orderUpdate.id;
let presale_type = '0';
let product_id = data;
let supplier = suppliers?.find(n=>n.id === supplier_id[0])?.name
supplier_id = supplier_id[0]?supplier_id[0]:null

return {attribute,amount, cost, discount, name, presale_type, price, product_id, supplier, supplier_id, type_discount, order_id}
}
const getData =(id)=>{
    dispatch(getProductFromId(id))
}

const handleChange=(e)=>{
    if (isUpdateRows) {
        let sendData =  sendNewProduct(newProduct)
        dispatch(addProductTooOrder({id: sendData.order_id, data: sendData}))
        setTimeout(getData(newProduct.data), 200)
         return
    } else dispatch(autoUpdate({id: 'productData', str:[newProduct,...products]}))   
    
 }




    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Добавити'} titleText={"Добавити товар"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'}/>
  
     )
}

export default ProductCreate