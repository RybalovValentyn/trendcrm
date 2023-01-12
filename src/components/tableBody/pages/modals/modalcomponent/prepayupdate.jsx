import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector,  } from 'react-redux';
import { forwardRef } from 'react';
import { getOpenTableCreate } from '../../../../../redux/ordersReduser';
import { MenuItem, Select, Box,Typography, OutlinedInput} from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../../order/createHead/input';
import { setOrderUpdatestatusPrepay } from '../../../../../redux/asyncThunc';
import { ModalComponent } from '../modalComponent';

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 100,
        overflowX: 'hidden',
      },
    },
  };


const PrepayUpdate = () =>{
    const dispatch = useDispatch();
    const openModal = useSelector((state) => state.ordersAll.modalControl.prepay_update);
    const prepay = useSelector((state) => state.ordersAll.payment_status);
    const [status, setStatus] = useState(0)
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }

const handleClouse =(e)=>{
  dispatch(getOpenTableCreate({id: 'prepay_update', str: false}));
}
const handleClick=()=>{ 
  if (selected[0]) {
  dispatch(setOrderUpdatestatusPrepay({selected, value: String(status)}))
  }
  dispatch(getOpenTableCreate({id: 'prepay_update', str: false}));
}

const handleSelectChange=(e)=>{
setStatus(Number(e.target.value))
}

const Component = ()=>(
  <DialogContent>
        <Typography sx={{fontSize: '16px', margin: '0 10px'}}>{'Передплата оплачена:'}</Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '50%', margin: '10px 10px'}}>
        <Select 
        fullWidth
          id="prepay_update"
           value={status}
          onChange={handleSelectChange}
          input={<OutlinedInput  sx={selectStyles}/>}
          MenuProps={MenuProps}
          >          
        {prepay.map((name, ind)=>(
        <MenuItem sx={{fontSize: '14px' }} id={name.id} key ={ind} value={name.id} >      
        {name.name}
      </MenuItem>

))}

       </Select>
       </Box>
                
                 <Typography sx={{marginLeft: '10px', fontSize: '14px', display: 'block', fontWeight: 'bold'}}>
                  Обновление статуса оплаты будет производиться 
                 только над заказами содержащими значение поля "Способ оплаты:" - &gt; "Предоплата".
                  Остальные заказы будут проигнорированы.</Typography>        

      <Typography sx={{fontSize: '16px', margin: '20px 0 10px 0', textAlign: 'center'}}>{`Замовлень вибрано:${selected.length}`}</Typography>
        </DialogContent>
)
    return(

      <ModalComponent Component={Component} funcOnClouse={handleClouse} open={openModal}  sendButtonText={'Ok'} titleText={"Передплата замовлень"}
      funcOnSend={handleClick} borderHeader={false} borderAction={false} alignAction={true}/>
    )
}

export default PrepayUpdate