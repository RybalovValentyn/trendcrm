import { useDispatch, useSelector,  } from 'react-redux';
import { autoUpdateAllReducer, getOpenTableCreate } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import {List, ListItem} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import MultipleAutocompliteComponent from "../components/multipleAutocomplite";
import { useState } from 'react';

const NewCategoryCreate=()=>{
    const dispatch =useDispatch();
    const category = useSelector((state) => state.ordersAll.newCategory);
    const categoryList = useSelector((state) => state.ordersAll.category);
    const grandCategory={name: "Головна категорія", id: "0", attribute: []};
    const renderCategory = [grandCategory,...categoryList].filter(n=>n.name !== '')
    const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
    const newCategoryAtributes = {name: "Створити категорію атрибуту", id: "newAtr_category", status: '', sort: '', prod_categ: ''};
    const [atribute, setAtribute]= useState([])


const handleInputChange=(data)=>{    
    dispatch(autoUpdateAllReducer({id: data.id, state: 'newCategory', str: data.str}))    
}

const handleCategoryChange=(e, newValue)=>{
dispatch(autoUpdateAllReducer({id: 'parent_id', state: 'newCategory', str: newValue.id}))
}

const handleCategoryAtributesChange=(e, newValue)=>{
    let ind = newValue.findIndex(n=>n.id === 'newAtr_category')
    if (ind !== -1) {
        dispatch(getOpenTableCreate({id: 'atributeCategory', str: true}));
        dispatch(autoUpdateAllReducer({id: 'attributes', state: 'newCategory', str: []}))
        dispatch(autoUpdateAllReducer({id: 'ids', state: 'newCategory', str: []}))
        return
    }
    let newCategory = [...newValue].filter((str, index, array) => array.indexOf(str) === index );
    let ids = newCategory.map(n=>(n.id))   
     dispatch(autoUpdateAllReducer({id: 'attributes', state: 'newCategory', str: ids}))
     setAtribute(newCategory)

}

    return(
    <DialogContent>
        <List>
            <ListItem>
         <InputTextComponent id={'name'} textContent={'Назва:'} disp={autoUpdateAllReducer} num={false} path={'newCategory'} 
                            label={'Назва категорії'} alignCenter={true} alignText={true} textWidth='110px' func={handleInputChange} Inwidth={7}/>
            </ListItem>

            <ListItem>
        <AutocompliteComponent data={renderCategory} disp={handleCategoryChange} textContent={'Родичі:'} id={'parent_id'}
         value={category.parent_id?renderCategory.find(n=>n.id === category.parent_id):renderCategory[0]} dafaultValue={false} label={''} 
         showInput={true}  onInputFunc={false} sort={true} alignCenter={true} alignText={true} inWidth={7}/ >
            </ListItem>

            <ListItem>
        <MultipleAutocompliteComponent data={[newCategoryAtributes, ...atrCategory]} disp={handleCategoryAtributesChange} textContent={'Категорія атрибутів:'} id={'attributes'}
         value={atribute} dafaultValue={false} label={'Не вибрано'} 
         showInput={true}  onInputFunc={false} sort={true} alignCenter={true} alignText={true} buttonId={'newAtr_category'} free={false}/ >
            </ListItem>
        </List>


   
    </DialogContent>
)}

export default NewCategoryCreate