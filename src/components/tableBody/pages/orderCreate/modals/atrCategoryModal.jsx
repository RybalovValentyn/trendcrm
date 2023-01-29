import { useDispatch} from 'react-redux';
import { autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';

import InputTextComponent from "../components/textField";

const NewAtributeCategoryCreate=()=>{
    const dispatch =useDispatch();
const handleInputChange=(data)=>{    
    dispatch(autoUpdateAllReducer({id: data.id, state: 'newCetegoryAtribute', str: data.str}))    
}


    return(
    <DialogContent>

         <InputTextComponent id={'name'} textContent={'Назва:'} disp={autoUpdateAllReducer} num={false} path={'newCetegoryAtribute'} 
                            label={'Назва категорії'} alignCenter={true} alignText={true} textWidth='110px' func={handleInputChange} Inwidth={7}/>
    
    </DialogContent>
)}

export default NewAtributeCategoryCreate