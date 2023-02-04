import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate, autoUpdate } from "../../../../../redux/ordersReduser";
import { Component } from "./componentAdd";

 const ProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.productCreate);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);
    const products = useSelector((state) => state.ordersAll.productData);


const handleClouse=()=>{   
    dispatch(getOpenTableCreate({id: 'productCreate', str: false}));
    dispatch(newProductUpdate({id: '', str: 'clear'}))
}


const handleChange=(e)=>{
    dispatch(autoUpdate({id: 'productData', str:[...products,newProduct]}))
// console.log('handleChange', products);
console.log(newProduct);
}




    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Добавити'} titleText={"Добавити товар"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'}/>
  
     )
}

export default ProductCreate