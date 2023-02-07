import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate,autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import { ListItem,List} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";

const NewAtributeCreateComponent=()=>{
    const dispatch =useDispatch();
    const categoryList = useSelector((state) => state.ordersAll.category);
    const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
   const newAtribute = useSelector((state) => state.ordersAll.newAtribute);
   const isNewProduct = useSelector((state) => state.ordersAll.modalControl.newProductCreate);
   const newProduct = useSelector((state) => state.ordersAll.newProduct);


const handleAtributeSelect =(e, newValue)=>{
    dispatch(autoUpdateAllReducer({id: 'category', state: 'newAtribute', str: newValue.id}))
}
const handleChange=(data)=>{
    dispatch(autoUpdateAllReducer({id: 'name', state: 'newAtribute', str: data.str}))
}
    return(
        <DialogContent>

            <List>
<ListItem>
        <AutocompliteComponent data={isNewProduct?categoryList:atrCategory} disp={handleAtributeSelect} textContent={'Категорія:'}
             value={isNewProduct?atrCategory.find(n=>n.id === newAtribute.category): atrCategory.find(n=>n.id === newAtribute.category)}
              dafaultValue={''} label={'Не вибрано'} showInput={true}
              alignCenter={true} alignText={true} onInputFunc={false} inWidth={7} free={false} readOnly={isNewProduct} / >
</ListItem>
<ListItem>
        <InputTextComponent id={'name'} textContent={'Назва:'} disp={false} num={false} path={'newAtribute'} 
                            label={''} alignCenter={true} alignText={true} Inwidth={7} func={handleChange}/>
</ListItem>     
        
</List>
        </DialogContent>
    )
}

export default NewAtributeCreateComponent