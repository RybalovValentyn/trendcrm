import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductCreate } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import AutocompliteComponent from "../components/autocomplite";
import InputTextComponent from "../components/textField";
import Grid from '@mui/material/Unstable_Grid2';
import CalculateIcon from '@mui/icons-material/Calculate';
import { BootstrapTooltip } from "../../order/styles";
import CheckComponent from "../components/checkComponent";
import { setAtributeCategoryList } from '../../../../../redux/asyncThunc';

const NewProductCreateComponent=()=>{
    const dispatch =useDispatch();
    const descriptionList = useSelector((state) => state.ordersAll.descriptionList);
    const description = useSelector((state) => state.ordersAll.productCreate.description_novaposhta);
    const categoryList = useSelector((state) => state.ordersAll.category);
    const supliersList = useSelector((state) => state.ordersAll.suppliers);
    const category = useSelector((state) => state.ordersAll.productCreate.category_id);
    const suplier = useSelector((state) => state.ordersAll.productCreate.supplier);

const handleClickIcon=()=>{
    dispatch(getOpenTableCreate({id: 'volumeCalc', str: true}));
}
const createNewCategory={id: 'new_category', name: 'Створити нову категорію', data: 'Створити нову категорію'}
const createNewSuplier = {id: 'new_suplier', name: 'Створити нового постачальника', data: 'Створити нового постачальника'}
const handleDescriptionChange=(e, newValue)=>{   
        dispatch(newProductCreate({id: 'description_novaposhta', str: newValue.id}))
    }
const handleDescChange=(value)=>{

}

const handleCategorySelect=(e, newValue)=>{
            if (newValue.id === 'new_category') {
              dispatch(getOpenTableCreate({id: 'newCategory', str: true}));
                dispatch(setAtributeCategoryList())
            return
         }
    dispatch(newProductCreate({id: 'category_id', str: newValue.id}))
}
const handleCheckBox=(data)=>{
    let str = 1
    if (!data.str) {
        console.log(str);
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
    console.log(suplier);
    let s = [newValue.id, ...suplier]
if (newValue.id === 'new_suplier') {
        dispatch(getOpenTableCreate({id: 'newSuppliers', str: true}));
        dispatch(newProductCreate({id: 'supplier', str: []}))
      return
   }
dispatch(newProductCreate({id: 'supplier', str: s}))
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

         <AutocompliteComponent data={[createNewSuplier,...supliersList]} disp={handleSupliersSelect} textContent={'Постачальники:'}
             value={supliersList.find(n=>n.id === suplier[0])} dafaultValue={''} label={'Не вибрано'} showInput={true}
              alignCenter={true} alignText={true} onInputFunc={false}/ >
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