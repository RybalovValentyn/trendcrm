import Button from '@mui/material/Button';
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
import { MenuItem, Select, Box, ListItemText, InputBase, Typography, OutlinedInput, IconButton, Switch } from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../order/createHead/input';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { BootstrapTooltip } from '../order/styles';
import { StyledInput } from '../order/createHead/input';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });



const JustinCreate = () =>{
    const dispatch = useDispatch();
    const openjustinCreate = useSelector((state) => state.ordersAll.modalControl.justin_create);
    let selected =  sessionStorage.getItem("selected").split(',');
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState('');
    const [alertOpen, setAlertOpen] = useState(false)

const MySwal = withReactContent(Swal)

const successAlert = () => {
    Swal.fire({  
        title: 'Увага!',  
        text: 'Ви дійсно хочете створити ЕН Justin',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ні',
        confirmButtonText: 'Так',
      }).then((result) => {        
        if (result.isConfirmed) {
            handle()
          Swal.fire(
            'Створено!',
            'ЕН Justin успішно створена',
            'success'
          )
        }
      }); 
}
const handle =()=>{
    console.log('ksjdbisn');
    setAlertOpen(true)
}

const handleClouse =(e)=>{
   
  dispatch(getOpenTableCreate({id: 'justin_create', str: false}));
}


const handleCreateEN=()=>{
    successAlert()
    dispatch(getOpenTableCreate({id: 'justin_create', str: false}));

}
const handleInputChange=(e)=>{
    if (Number(e.target.value) || e.target.value === 0) {
    setValue(e.target.value)  
}else return
}
const handleKey=(e)=>{
    if (e.key === 'Backspace') {
        setValue('')  
    }

}
    return(
        <Dialog
        open={openjustinCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden',  '& .MuiPaper-root': {width: '600px', top: '-20%'}}}
          >
            <Box onClick={handleClouse} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
             borderBottom: `1px solid ${colorsRef.modalInputBorderColor}`}}>
            <DialogTitle sx={{width: '80%', whiteSpace: 'wrap', }}>
                {"Створити ЕН Justin для замовлень"}</DialogTitle>
          <IconButton  component="button" sx={{marginRight: '10px'}}> 
            <HighlightOffIcon />
          </IconButton>
            </Box>

        <DialogContent>

        
        <Box sx={{width: '100%'}}>
            <Box sx={{display: 'flex', marginTop: '30px', alignItems: 'center'}}>
            <BootstrapTooltip title="Вага застосовується до всих вибраних замовлень.Якщо, залишити пустим - вага посилки буде дорівнювати вазі, вказаній у замовленні"
             placement="right" sx={{maxWidth: '100px'}}>
                 <HelpOutlinedIcon fontSize='small'/>
             </BootstrapTooltip>
                 <Typography sx={{marginLeft: '10px', fontSize: '14px', display: 'block',}}>{'Вага посилки'}</Typography>
                 < StyledInput onKeyDown={handleKey} autoComplete='off' value={value} onChange={handleInputChange} disabled={disabled} />
                 <Switch color="default" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{backgroundColor: '#FFB200'}}} onChange={()=>setDisabled(!disabled)} />
            </Box>

            <Typography sx={{fontSize: '14px', marginTop: '30px'}}>{'ID виділених замовлень:'}</Typography>
            <Box sx={{display: 'flex'}}> {selected.map((str, i, arr)=>
            <Typography key={i} sx={{fontSize: '14px'}}>{`${str} ${i!==arr.length-1?', ':''} `}</Typography>

                )}</Box>

        <Typography sx={{fontSize: '14px', marginTop: '20px'}}>{`Вибрано замовлень: ${selected[0]?selected.length:'0' }`}</Typography>
        </Box >
       
        </DialogContent>
        <DialogActions sx={{width: '95%',textAlign: 'center',
         marginLeft: 'auto', marginRight: 'auto', display: 'block', paddingBottom: '20px'}}>

      <StyledButton            
        text={'Створити'}
        func= {handleCreateEN}
        border= {'#7bb31a'}               
           />

        </DialogActions>
      
      </Dialog> 
    )
}

export default JustinCreate