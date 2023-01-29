import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import NewAtributeCategoryCreate from "./atrCategoryModal";
import { setAtributeCategoryList, setAddCategoryAtribute } from "../../../../../redux/asyncThunc";

 const AtrCategoryCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.atributeCategory);
    const ref = {name: "", prod_categ: []}

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'atributeCategory', str: false}));
    dispatch(autoUpdateAllReducer({state:'newCetegoryAtribute', ref: ref , str: 'clear'}));

}

const updateFunc =()=>{
dispatch(setAtributeCategoryList())
}

const handleChange=(e)=>{
 dispatch(setAddCategoryAtribute())
 handleClouse()
   setTimeout(updateFunc,200) 
}

    return(
        <ModalProductComponent Component={NewAtributeCategoryCreate} funcOnClouse={handleClouse} open={open}  sendButtonText={'Зберегти'}
         titleText={"Створити нову категорію атрибутів"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'xs'} isAutoclouse={true}/>
  
     )
}

export default AtrCategoryCreate