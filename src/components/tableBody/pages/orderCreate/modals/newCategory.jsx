import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import NewCategoryCreate from "./categoryComp";
import { setAtributeCategoryList, setProductCategoryCreate, getCategoryList } from "../../../../../redux/asyncThunc";

 const CategoryCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.newCategory);
    const ref = {name: "", parent_id: "", attributes: [], ids: []}

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'newCategory', str: false}));
    dispatch(autoUpdateAllReducer({state:'newCategory', ref: ref , str: 'clear'}));

}

const updateFunc =()=>{
    dispatch(setAtributeCategoryList())
    dispatch(getCategoryList())
}

const handleChange=(e)=>{
    dispatch(setProductCategoryCreate())
    handleClouse()    
   setTimeout(updateFunc,200) 
}

    return(
        <ModalProductComponent Component={NewCategoryCreate} funcOnClouse={handleClouse} open={open}  sendButtonText={'Створити'} titleText={"Створення категорії товарів"}
        funcOnSend={handleChange} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'xs'} isAutoclouse={true}/>
  
     )
}

export default CategoryCreate