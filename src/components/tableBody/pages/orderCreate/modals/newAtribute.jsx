import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import NewAtributeCreateComponent from "./newAtributComponent";
import { setAddAtribute, getAtributesAutocompliteList } from "../../../../../redux/asyncThunc";

 const NewAtributeCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newAtribute);
    const ref={name: '', category: ''}

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'newAtribute', str: false}));
    dispatch(autoUpdateAllReducer({state:'newAtribute', ref: ref , str: 'clear'}));

}

const updateFunc =()=>{
    dispatch(getAtributesAutocompliteList())
}

const handleChange=(e)=>{
dispatch(setAddAtribute())
handleClouse()    
setTimeout(updateFunc,200) 
}





    return(
        <ModalProductComponent Component={NewAtributeCreateComponent} funcOnClouse={handleClouse} open={open}  sendButtonText={'Створити'} titleText={"Додати новий атрибут"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'xs'} isAutoclouse={true}/>
  
     )
}

export default NewAtributeCreate