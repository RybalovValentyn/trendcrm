import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductUpdate } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography, Autocomplete, List, ListItem} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";


 const ProductCreate =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.productCreate);
    const products = useSelector((state) => state.ordersAll.products);
    const newProduct = useSelector((state) => state.ordersAll.newProduct);

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'productCreate', str: false}));
}
const handleAutocompliteChange=(e, newValue)=>{
    dispatch(newProductUpdate({id: 'name', str: newValue.name}))
    dispatch(newProductUpdate({id: 'data', str: newValue.id}))
console.log(newValue);
}

const Component=()=>(
    <DialogContent>
        
    <Box sx={{width: '100%'}}>
<List sx={{width: '100%'}}>
    <ListItem sx={{width: '100%', padding: 0}}>
        <AutocompliteComponent data={products} disp={handleAutocompliteChange} textContent={'Товар:'}
         value={products.find(n=>n.id === newProduct.data)} dafaultValue={false} label={'Назва товару'}/>
    </ListItem>
</List>
  
    </Box >
    </DialogContent>
)
    return(
        <ModalProductComponent Component={Component} funcOnClouse={handleClouse} open={open}  sendButtonText={'Добавити'} titleText={"Добавити товар"}
        funcOnSend={false} borderHeader={true} borderAction={false} alignAction={true} closeButtonText={'Відмінити'} width={'sm'}/>
  
     )
}

export default ProductCreate