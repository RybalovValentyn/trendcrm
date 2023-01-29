import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductCreate} from "../../../../../redux/ordersReduser";
import NewProductCreateComponent from './newProdCreateComp'
import { setNewProductCreate, getDataForAutocompliteList } from "../../../../../redux/asyncThunc";

 const NewProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newProductCreate);


const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'newProductCreate', str: false}));
    dispatch(newProductCreate({id: '', str: 'clear'}))

}

const getUpdate=()=>{
    dispatch(getDataForAutocompliteList())
}

const handleChange=(e)=>{
dispatch(setNewProductCreate())
handleClouse()
setTimeout(getUpdate, 200)
}

    return(
        <ModalProductComponent Component={NewProductCreateComponent} funcOnClouse={handleClouse} open={open}  sendButtonText={'Створити'}
         titleText={"Створення товару"} isAutoclouse={true}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'md'}/>
  
     )
}

export default NewProductCreate

