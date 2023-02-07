import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate,autoUpdateAllReducer, alertMessageUpdate } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import { ListItem,List, Typography, Box} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import { useState } from 'react';
import { setAtributeCategoryList, setAtributesCreate, getAtributesAutocompliteList } from '../../../../../redux/asyncThunc';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const InstallAtributeComponent=()=>{
    const dispatch =useDispatch();
    const categoryList = useSelector((state) => state.ordersAll.category);
    const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
   const newAtribute = useSelector((state) => state.ordersAll.newAtribute);
   const isNewProduct = useSelector((state) => state.ordersAll.modalControl.newProductCreate);
   const newProduct = useSelector((state) => state.ordersAll.newProduct);
   const products = useSelector((state) => state.ordersAll.products);
   const [renderAtribute, setRenderAtribute] = useState([]);
   const atributes = useSelector((state) => state.ordersAll.atributes);
   const newAtributeSelected = useSelector((state) => state.ordersAll.newAtribute);
   const [ind, setInd]  = useState([]);

   const update = ()=>{
    let category =  categoryList.find(n=>n.id === newProduct.category)
    if (renderAtribute.length === 0) {
    if (category) {
        let atr = category.attribute
        if (atr.length > 0) {
            let atributesId =  atr.map(str=>(atrCategory.find(n=>n.id === str))) 
        setRenderAtribute(atributesId)
        }
    }
}
    
}
   update()

const handleAtributeSelect =(e, newValue)=>{

    if (newValue.id === 'new_atribute') {
        dispatch(getOpenTableCreate({id: 'newCategory', str: true}));
          dispatch(setAtributeCategoryList())
      return
   }
    dispatch(autoUpdateAllReducer({id: 'category', state: 'newProduct', str: newValue.id}))

    let atrArrId = newValue.attribute
    if (atrArrId.length > 0) {
      let atributesId =  atrArrId.map(str=>(atrCategory.find(n=>n.id === str))) 
              if (atributesId.length > 0) {
            setRenderAtribute(atributesId)
        }
 
    } else if (atrArrId.length <= 0) {
        setRenderAtribute([])
    }
}

const handleChange=({id, str})=>{
    dispatch(autoUpdateAllReducer({id: 'category', state: 'newAtribute', str: id}))
    dispatch(autoUpdateAllReducer({id: 'name', state: 'newAtribute', str: str}))
}
const handleButtonClick=(e, i)=>{  
    let arr = [] 
    let indexEl = ind.indexOf(i)    
    if (indexEl >= 0) {
        console.log(indexEl);
        arr = [...ind]
        arr.splice(indexEl,1) 
    return  setInd(arr)
    }else if (indexEl === -1) {
        console.log(indexEl);
       return setInd([...ind, i])  
    } 
}

const handleButtonSendClick =()=>{
    if (newAtribute.category !== '' && newAtribute.name !== '') {
dispatch(setAtributesCreate())  
setTimeout(getAtributes, 200)      
    } else dispatch(alertMessageUpdate({message: 'clearString', type: 'warn'}))
}

const getAtributes = ()=>{
    dispatch(getAtributesAutocompliteList())
}
    return(
        <DialogContent>

            <List>
<ListItem>
<AutocompliteComponent data={products} disp={handleAtributeSelect} textContent={'Товар:'}
             value={products.find(n=>n.data === newProduct.data)}
              dafaultValue={''} label={'Не вибрано'} showInput={true} textWidth={5} textMaxWidth={'150px'}
              alignCenter={true} alignText={false} onInputFunc={false} inWidth={7} free={false} readOnly={true} / >
</ListItem>
<ListItem>
<AutocompliteComponent data={categoryList} disp={handleAtributeSelect} textContent={'Категорія товару:'}
             value={categoryList.find(n=>n.id === newProduct.category)}
              dafaultValue={''} label={'Не вибрано'} showInput={true} textWidth={5} textMaxWidth={'150px'}
              alignCenter={true} alignText={false} onInputFunc={false} inWidth={7} free={false} readOnly={isNewProduct} / >
</ListItem>  
    <ListItem >
    <Typography sx={{fontSize: '19px', fontWeight: '600', marginLeft: 'auto', marginRight: 'auto'}}>Атрибути</Typography>
    </ListItem>   

{renderAtribute.length > 0 && renderAtribute.map((str,i)=>{
            let data = []
            if (atributes[str.id]) {
                data = [...atributes[str.id]]
             }

            return(
                <Box key={`${i}+box`}>
            <ListItem key={i}>
                <AutocompliteComponent data={data} disp={handleAtributeSelect} textContent={str.name}
                value={categoryList.find(n=>n.id === newAtributeSelected)} dafaultValue={''} label={'Список'} showInput={true}
                 alignCenter={true} alignText={false} onInputFunc={false} disabled={data.map(n=>(n.id))} inWidth={5} textWidth={6} textMaxWidth={'150px'}/ >
               
                    <IconButton  onClick={(e)=>handleButtonClick(e,i)} aria-label="add" size="small">
                   {ind.includes(i) ?<RemoveCircleOutlineIcon/>: <ControlPointIcon /> } 
                    </IconButton>
            </ListItem>
{ind.includes(i)?  <ListItem key={`${i}+list`}>
            <InputTextComponent textContent={''} num={false} path={false} label={'Введіть новий атрибут'} id = {str.id} alignText={true}
                Inwidth={5} func={handleChange} alignCenter={true} value={newAtribute.category ===str.id? newAtribute.name:null}/>

            <IconButton onClick={handleButtonSendClick} aria-label="add" size="small">
                <ControlPointIcon /> 
             </IconButton>
            </ListItem>:null}
            </Box>
            )
        })}


        
</List>
        </DialogContent>
    )
}

export default InstallAtributeComponent