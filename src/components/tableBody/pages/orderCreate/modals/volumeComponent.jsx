import { useDispatch, useSelector,  } from 'react-redux';
import {autoUpdateAllReducer} from "../../../../../redux/ordersReduser";
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { List, ListItem} from "@mui/material";
import InputTextComponent from "../components/textField";


const VolumeCalcComponent=()=>{
    const dispatch =useDispatch();
    const length = useSelector((state) => state.ordersAll.calcVolume.length);
    const width = useSelector((state) => state.ordersAll.calcVolume.width);
    const heigth = useSelector((state) => state.ordersAll.calcVolume.heigth);


const handleLength=(e)=>{
    dispatch(autoUpdateAllReducer({state:'calcVolume', id: e.id, str: e.str}));

}

    return(
        <DialogContent>
            <List>
                <ListItem>
 <InputTextComponent id={'length'} textContent={'Довжина (см):'} disp={false} num={true} path={'calcVolume'} 
                     label={''} alignCenter={true} alignText={true} func={handleLength}/>
                </ListItem>
                <ListItem>
<InputTextComponent id={'width'} textContent={'Ширина (см):'} disp={false} num={true} path={'calcVolume'} 
                     label={''} alignCenter={true} alignText={true} func={handleLength} />
                </ListItem>
                <ListItem>
<InputTextComponent id={'heigth'} textContent={'Висота (см):'} disp={false} num={true} path={'calcVolume'} 
                         label={''} alignCenter={true} alignText={true} func={handleLength} />
                </ListItem>
                <ListItem>
        <Box sx={{fontSize: '18px', fontWeight: 700, display: 'flex'}}>Загальний обєм:
        {(length !== '' && width !== '' && heigth !== '')&&(+length>0 && +width>0 && +heigth>0)?
        <input readOnly id='text_content_calc' style={{fontSize: '18px', fontWeight: 700, marginLeft: '10px', maxWidth: '100px'}} value = {Number(length)*Number(width)*Number(heigth)/4000} ></input>:null}
        </Box>
                </ListItem>
            </List>        

        </DialogContent>
    )
}

export default VolumeCalcComponent