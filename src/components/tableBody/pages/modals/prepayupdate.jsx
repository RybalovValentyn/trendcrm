import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector,  } from 'react-redux';
import { forwardRef } from 'react';
import { getOpenTableCreate } from '../../../../redux/ordersReduser';
import { InputFile } from '../../../inputs/fileInput/fileInput';
import { StyledButton } from '../../../buttons/buttons'; 
import { colorsRef } from '../../../../consts/colorConstants';
import { MenuItem, Select, Box, ListItemText, InputBase, Typography, OutlinedInput, IconButton } from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../order/createHead/input';
import { setOrderUpdatestatusPrepay } from '../../../../redux/asyncThunc';

const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });
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
    let selected =  sessionStorage.getItem("selected").split(',');

const handleClouse =(e)=>{
  dispatch(getOpenTableCreate({id: 'prepay_update', str: false}));
}
const handleClick=()=>{ 
  if (Number(selected[0])) {
  dispatch(setOrderUpdatestatusPrepay({selected, value: String(status)}))
  }
  dispatch(getOpenTableCreate({id: 'prepay_update', str: false}));
}

const handleSelectChange=(e)=>{
setStatus(Number(e.target.value))
}
    return(
        <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden',  '& .MuiPaper-root': {width: '600px', '@media (min-width: 600px)': {
          top: '-20%'
        },}}}
          >
            <Box  sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <DialogTitle sx={{width: '80%', whiteSpace: 'wrap'}}>{'Передплата замовлень'}</DialogTitle>
          <IconButton onClick={handleClouse}  component="button" sx={{marginRight: '10px'}}> 
            <HighlightOffIcon  />
          </IconButton>
            </Box>

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

           
        </DialogContent>
        <DialogActions sx={{width: '95%',textAlign: 'center',
         marginLeft: 'auto', marginRight: 'auto', display: 'block', paddingBottom: '20px'}}>
       
       <Typography sx={{fontSize: '16px', margin: '10px 0 20px 0'}}>{`Замовлень вибрано:${selected[0]?selected.length:'0'}`}</Typography>
      <StyledButton            
        text={'Ok'}
        func= {handleClick}
        border= {colorsRef.buttonBorderInModal}               
           />

        </DialogActions>
      </Dialog> 
    )
}

export default PrepayUpdate