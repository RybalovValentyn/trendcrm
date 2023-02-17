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
    const productData = useSelector((state) => state.ordersAll.productData);

const handleClouse=()=>{   
    dispatch(getOpenTableCreate({id: 'productCreate', str: false}));
    dispatch(newProductUpdate({id: '', str: 'clear'}))
}
const sendNewProduct =({ cost, count, discount, name, price, data, supplier_id,typeDiscount, category})=>{
let type_discount = typeDiscount === '%'?'0': '1'
let order_id = orderUpdate.id;
let presale_type = '0';
let product_id = data;
let supplier = suppliers?.find(n=>n.id === supplier_id[0])?.name?suppliers?.find(n=>n.id === supplier_id[0])?.name:'';
supplier_id = supplier_id[0]?supplier_id[0]:'';
let amount = count?count:'1';

return {amount, cost, discount, name, presale_type, price, product_id, supplier, supplier_id, type_discount, order_id, category}
}
// const getData =()=>{
//     console.log('ddddddddddddddd',productData[0].data);
//     if (productData[0].data) {
//         dispatch(getProductFromId(productData[0].data))     
//     }   
// }



const funcSendData = ({attribute_id, category})=>{
// console.log(attribute_id, category);
let categirys = categoryList.find(n=>n.id === category)
let arrayAtributeCategory = categirys?.attribute
let atributesArray  = arrayAtributeCategory.map(n=>atrCategory.find(s=>s.id === n))
let response = atributesArray.reduce((acc,cat, i)=>{
    let atributesArray = atributes[cat.id]
    let atr = atributesArray.find(n=>n.id === String(attribute_id[i]))?atributesArray.find(n=>n.id === attribute_id[i]):''
    if (atr) {
        let name = atr.name?atr.name:''
        let atribyteId = attribute_id[i]?attribute_id[i]: ''
      acc=[...acc, {category: cat.id, id: atribyteId, attribute_name: name}]      
    }
     return acc
},[])
// console.log(response);
return response
}

const handleChange=(e)=>{
  
    if (isUpdateRows) {
        let sendDataAtributes = funcSendData(newProduct)
        let sendDataProduct =  sendNewProduct(newProduct)
        let sendData={...sendDataProduct, attribute: sendDataAtributes} 
        console.log(sendData, sendData.order_id); 
        dispatch(addProductTooOrder({id: sendData.order_id, sendData: sendData}))
        // setTimeout(getData, 200)
         return
    } else if (!isUpdateRows) {
        dispatch(autoUpdate({id: 'productData', str:[newProduct,...products]}))   
    }
      
    
 }




    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Добавити'} titleText={"Добавити товар"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'}/>
  
     )
}

export default ProductCreate