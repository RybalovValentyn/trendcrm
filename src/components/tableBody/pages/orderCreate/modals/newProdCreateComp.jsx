import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductCreate, autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import Grid from '@mui/material/Unstable_Grid2';
import CalculateIcon from '@mui/icons-material/Calculate';
import { BootstrapTooltip } from "../../order/styles";
import CheckComponent from "../components/checkComponent";
import { setAtributeCategoryList, getCategoryList, setUpdateProductCategory } from '../../../../../redux/asyncThunc';
import MultipleAutocompliteComponent from '../components/multipleAutocomplite';
import { useState } from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const NewProductCreateComponent=()=>{
    const dispatch =useDispatch();
    const descriptionList = useSelector((state) => state.ordersAll.descriptionList);
    const description = useSelector((state) => state.ordersAll.productCreate.description_novaposhta);
    const categoryList = useSelector((state) => state.ordersAll.category);
    const supliersList = useSelector((state) => state.ordersAll.suppliers);
    const atributes = useSelector((state) => state.ordersAll.atributes);
    const category = useSelector((state) => state.ordersAll.productCreate.category_id);
   const atrCategory = useSelector((state) => state.ordersAll.atributeCategory);
   const newAtributeSelected = useSelector((state) => state.ordersAll.newAtribute);
   const newCategoryAtributes = {name: "Створити категорію атрибуту", id: "newAtr_category", status: '', sort: '', prod_categ: ''}
   const [newSuppliers, setNewSuppliers] = useState([]);
   const [newAtribute, setNewAtribute] = useState([]);
   const [renderAtribute, setRenderAtribute] = useState([]);
   const [show, setshow]= useState(false);

const handleClickIcon=()=>{
    dispatch(getOpenTableCreate({id: 'volumeCalc', str: true}));
}
const createNewCategory={id: 'new_category', name: 'Створити нову категорію', data: 'Створити нову категорію'}
const createNewSuplier = {id: 'new_suplier', name: 'Створити нового постачальника', data: 'Створити нового постачальника'}
const createAtribute = {id: 'new_atribute', name: 'Створити атрибут', data: 'Створити атрибут'}

const handleDescriptionChange=(e, newValue)=>{   
        dispatch(newProductCreate({id: 'description_novaposhta', str: newValue.id}))
    }
const handleDescChange=(value)=>{

}

const handleCategorySelect=(e, newValue)=>{
    // console.log(atrCategory);
    if (newValue.id === 'new_category') {
        dispatch(getOpenTableCreate({id: 'newCategory', str: true}));
          dispatch(setAtributeCategoryList())
      return
   }
//    console.log(newValue);
    let atrArrId = newValue.attribute
    if (atrArrId.length > 0) {
      let atributesId =  atrArrId.map(str=>(atrCategory.find(n=>n.id === str))) 
      setshow(false)
        handleCategoryAtrSelect(e, atributesId, atrArrId)
              if (atributesId.length > 0) {
               setRenderAtribute(atributesId)
        }
 
    } else if (atrArrId.length <= 0) {
        setRenderAtribute([])
    }

    dispatch(newProductCreate({id: 'category_id', str: newValue.id}))
}
const handleCheckBox=(data)=>{
    let str = 1
    if (!data.str) {
        // console.log(str);
       str = 0 
    }
    dispatch(newProductCreate({id: data.id, str:str}))
}
const textComponent=()=>(
    <Box sx={{fontSize: '14px', display: 'flex', alignItems: 'center'}}><Typography sx={{fontSize: '14px'}}>Загальний обем (кг)*:</Typography>
    <BootstrapTooltip placement="left" sx={{maxWidth: '150px'}} title="Не плутати з загальною вагою! Загальний обєм розраховується за формулою:(довжинаь*висота*ширина)/4000*0,004.
                                         В більшості впливає на вартість доставки "> 
     <Box>    
     <BootstrapTooltip placement="top-start" sx={{maxWidth: '150px'}} title="Розрахувати">
     <CalculateIcon onClick={handleClickIcon} fontSize="small" sx={{ "&:hover":{cursor: 'pointer'}}}/>
     </BootstrapTooltip>
     </Box>
     </BootstrapTooltip >
     </Box>
)

const handleSupliersSelect=(e, newValue)=>{    
    let newSupliers = [...newValue].filter((str, index, array) => array.indexOf(str) === index );
    let s = newSupliers.map(n=>(n.id))
if (s.includes('new_suplier') ) {
        dispatch(getOpenTableCreate({id: 'newSuppliers', str: true}));
        dispatch(newProductCreate({id: 'supplier', str: []}))
        dispatch(newProductCreate({id: 'suppliersArray', str: []}))
      return
   }
dispatch(newProductCreate({id: 'supplier', str: s}))
setNewSuppliers(newSupliers)
}


const handleCategoryAtrSelect=(e, newValue, newCategorySelected)=>{
    // console.log(newValue);
    let ind = newValue.findIndex(n=>n.id === 'newAtr_category')
    if (ind !== -1) {
        dispatch(getOpenTableCreate({id: 'atributeCategory', str: true}));
        dispatch(newProductCreate({id: 'atributes', str: []}))
        dispatch(newProductCreate({id: 'attribute_category', str: []}))
        return
    }

    let newCategory = [...newValue].filter((str, index, array) => array.indexOf(str) === index );

    let ids = newCategory.map(n=>(n.id))      
    setRenderAtribute(newCategory) 


if (!newCategorySelected) {   
    let atributeCategoryId =  categoryList.find(n=>n.id === category)?.attribute
    let isIncludes =indentArray(atributeCategoryId, ids );
    setshow(!isIncludes)
// console.log(isIncludes);
}

     dispatch(newProductCreate({id: 'attribute_category', str: ids}))
     setNewAtribute(newCategory)

}

const indentArray = (arr1, arr2)=>{
    console.log(arr1, arr2);
    if (arr1?.length === arr2?.length) {
    let inc = arr1.map(n=>(arr2.includes(n)))
       return arr1.length === inc.length?true:false
    } else return false
}

const handleAtributeSelect =(e, newValue, textContent)=>{
    let d =atrCategory.find(n=>n.name === textContent)
    if (newValue.id === 'new_atribute') {
        dispatch(getOpenTableCreate({id: 'newAtribute', str: true}));
        dispatch(autoUpdateAllReducer({id: 'category', state: 'newAtribute', str: d.id}))
      return
   }
}

const saveButtonClick=()=>{
    dispatch(setUpdateProductCategory({id:category, attributes: renderAtribute.map(n=>(n.id))}))
    setTimeout(updateCategory, 200);
}

const updateCategory=()=>{
  dispatch(setAtributeCategoryList()) 
  dispatch(getCategoryList()) 
  setshow(false)
}

    return(
        <DialogContent>

<Box sx={{ flexGrow: 1 , }}>
      <Grid container spacing={2}>
        <Grid xs={11} sm={6} sx={{padding: '20px'}}>
        <InputTextComponent id={'name'} textContent={'Назва*:'} disp={newProductCreate} num={false} path={'productCreate'} 
                            label={''} alignCenter={true} alignText={true} />
       
        <AutocompliteComponent data={descriptionList} disp={handleDescriptionChange} textContent={'Опис НП*:'}
             value={descriptionList.find(n=>n.id === description)} dafaultValue={false} label={'Не вибрано'} showInput={true}
              alignCenter={true} alignText={true} onInputFunc={handleDescChange}/ >
         <AutocompliteComponent data={[createNewCategory,...categoryList]} disp={handleCategorySelect} textContent={'Категорія товарів:'}
             value={categoryList.find(n=>n.id === category)} dafaultValue={''} label={'Не вибрано'} showInput={true}
              alignCenter={true} alignText={true} onInputFunc={false}/ >

        <MultipleAutocompliteComponent data={[createNewSuplier, ...supliersList]} disp={handleSupliersSelect} textContent={'Постачальники:'} id={'parent_id'}
        value={newSuppliers} dafaultValue={false} label={'Не вибрано'} inputWidth={6} 
        showInput={true}  onInputFunc={false} sort={true} alignCenter={true} alignText={true} buttonId={'new_suplier'} free={false}/ >


{category !== ''&& 
<>
        <MultipleAutocompliteComponent data={[newCategoryAtributes, ...atrCategory]} disp={handleCategoryAtrSelect} textContent={'Категорія атрибутів:'} id={'attribute_category'}
        value={newAtribute} dafaultValue={false} label={'Не вибрано'} inputWidth={6} 
        showInput={true}  onInputFunc={false} sort={true} alignCenter={true} alignText={true} buttonId={'newAtr_category'} free={false}/ >
        {show?<Box sx={{width: '100%', textAlign: 'center'}}><Button onClick={saveButtonClick} size="small" variant="outlined" startIcon={<SaveIcon  />}>
       Зберегти зміни в категорії
        </Button>
        </Box>:null}
        {renderAtribute.length > 0 && renderAtribute.map((str,i)=>{
            let data = []
            if (atributes[str.id]) {
                data = [...atributes[str.id]]
             }

            return(
                <AutocompliteComponent key={i} data={[createAtribute,...data]} disp={handleAtributeSelect} textContent={str.name}
                value={categoryList.find(n=>n.id === newAtributeSelected)} dafaultValue={''} label={'Список'} showInput={true}
                 alignCenter={true} alignText={true} onInputFunc={false} disabled={data.map(n=>(n.id))}/ >
            )
        })}
</>
}
        </Grid>

        <Grid xs={11} sm={6} sx={{padding: '20px'}}>
        <InputTextComponent id={'price'} textContent={'Ціна продажу (грн):'} disp={newProductCreate} num={true} path={'productCreate'} 
                            label={''} alignCenter={true} alignText={true} textWidth='170px'/>

        <InputTextComponent id={'cost'} textContent={'Ціна купівлі (грн):'} disp={newProductCreate} num={true} path={'productCreate'} 
                            label={''} alignCenter={true} alignText={true} textWidth='170px'/>

        <InputTextComponent id={'weight'} textContent={'Вага (кг)*:'} disp={newProductCreate} num={true} path={'productCreate'} 
                            label={''} alignCenter={true} alignText={true} textWidth='170px'/>

        <InputTextComponent id={'volume_general'} textContent={'Загальний обем (кг)*:'} disp={newProductCreate} num={true} path={'productCreate'} 
                            label={''} alignCenter={true} alignText={true} textWidth='180px' ContentComponent={textComponent}/>

        <InputTextComponent id={'sku'} textContent={'Артикул:'} disp={newProductCreate} num={true} path={'productCreate'} 
                            label={''} alignCenter={true} alignText={true} textWidth='170px'/>

        <CheckComponent id={'status'} textContent={'Статус:'} alignCenter={true} alignText={true} func={handleCheckBox}/>

        <CheckComponent id={'booked'} textContent={'Можливість бронювати:'} alignCenter={true} alignText={true} func={handleCheckBox}/>

        <CheckComponent id={'sell_in_the_red'} textContent={'Можливість відправляти:'} alignCenter={true} alignText={true} func={handleCheckBox}/>
        </Grid>

      </Grid>
    </Box>
        

        </DialogContent>
    )
}

export default NewProductCreateComponent