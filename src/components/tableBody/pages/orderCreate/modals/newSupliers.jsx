import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import NewSupliersComponent from "./newSuplierComponent";
import { setNewSupplierCreate, getSupliersList } from "../../../../../redux/asyncThunc";

 const NewSupliersCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newSuppliers);
const ref={name: "",phone: "", email: "", comment: "" }

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'newSuppliers', str: false}));
    dispatch(autoUpdateAllReducer({state:'newSuplplier', ref: ref , str: 'clear'}));

}

const handleChange=(e)=>{
    dispatch(setNewSupplierCreate())
    handleClouse()
   dispatch(getSupliersList())
}


    return(
        <ModalProductComponent Component={NewSupliersComponent} funcOnClouse={handleClouse} open={open}  sendButtonText={'Створити'} titleText={"Визначити атрибути для товару"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'} isAutoclouse={true}/>
  
     )
}

export default NewSupliersCreate