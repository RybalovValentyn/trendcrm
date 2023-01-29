import { useDispatch, useSelector,  } from 'react-redux';
import { autoUpdateAllReducer } from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import InputTextComponent from "../components/textField";
import Grid from '@mui/material/Unstable_Grid2';
import { colorsRef } from '../../../../../consts/colorConstants';


const NewSupliersComponent=()=>{
    const dispatch =useDispatch();
    const supplier = useSelector((state) => state.ordersAll.newSuplplier);


const handleInputChange=(data)=>{
console.log(data);
dispatch(autoUpdateAllReducer({id: data.id, state: 'newSuplplier', str: data.str}))
}
const handleTexteria=(e)=>{
 dispatch(autoUpdateAllReducer({id: 'comment', state: 'newSuplplier', str: e.target.value}))
}


    return(
        <DialogContent>

<Box sx={{ flexGrow: 1 , }}>
      <Grid container spacing={2}>
        <Grid xs={11} sm={8} sx={{padding: '20px'}}>
        <InputTextComponent id={'name'} textContent={'Назва*:'} disp={autoUpdateAllReducer} num={false} path={'newSuplplier'} 
                            label={'Назва'} alignCenter={true} alignText={false} textWidth='110px' func={handleInputChange}/>

        <InputTextComponent id={'phone'} textContent={'Телефон:'} disp={autoUpdateAllReducer} num={true} path={'newSuplplier'} 
                            label={'Телефон'} alignCenter={true} alignText={false} textWidth='110px' func={handleInputChange}/>

        <InputTextComponent id={'email'} textContent={'Email:'} disp={autoUpdateAllReducer} num={false} path={'newSuplplier'} 
                            label={'email'} alignCenter={true} alignText={false} textWidth='110px' func={handleInputChange}/>

        </Grid>

        <Grid xs={11} sm={4} sx={{padding: '20px'}}>
        <Typography sx={{fontSize: '14px'}}>Коментар:</Typography>
        <textarea placeholder='Коментар' style={{width: '100%', height: '100px', marginTop: '15px', border: `1px solid ${colorsRef.inputBorderColor}`,
                    borderRadius: '8px',resize: 'vertical'}} onChange={handleTexteria} value={supplier.comment}></textarea>

        </Grid>

      </Grid>
    </Box>
        

        </DialogContent>
    )
}

export default NewSupliersComponent