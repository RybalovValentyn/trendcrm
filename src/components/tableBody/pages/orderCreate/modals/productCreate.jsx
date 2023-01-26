import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate } from "../../../../../redux/ordersReduser";
import { Component } from "./componentAdd";

 const ProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.productCreate);


const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'productCreate', str: false}));
    dispatch(newProductUpdate({id: '', str: 'clear'}))
}


const handleChange=(e)=>{
console.log('handleChange');

}




    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Добавити'} titleText={"Добавити товар"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'}/>
  
     )
}

export default ProductCreate