import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdateAllReducer, alertMessageUpdate } from "../../../../../redux/ordersReduser";
import { getDataForAutocompliteList, getAtributesAutocompliteList, updateProductFromId } from "../../../../../redux/asyncThunc";
import InstallAtributeComponent from "./installAtrComponent";
 const InstallAtribute =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newCreateAtribute);
    const ref={name: '', category: ''}
    const newProduct = useSelector((state) => state.ordersAll.newProduct);

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'newCreateAtribute', str: false}));
    dispatch(autoUpdateAllReducer({state:'newAtribute', ref: ref , str: 'clear'}));

}

const updateFunc =()=>{
    dispatch(getDataForAutocompliteList())
    dispatch(getAtributesAutocompliteList())    
}

const handleChange=(e)=>{
    if (newProduct.data) {
        dispatch(updateProductFromId(newProduct.data))
        handleClouse()    
        setTimeout(updateFunc,200)
    } else dispatch(alertMessageUpdate({message: 'clearString', type: 'warn'}))

}


    return(
        <ModalProductComponent Component={InstallAtributeComponent} funcOnClouse={handleClouse} open={open}  sendButtonText={'Зберегти'} titleText={"Визначити атрибут для товару"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'} isAutoclouse={true}/>
  
     )}

export default InstallAtribute