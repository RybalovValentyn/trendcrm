import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector,  } from 'react-redux';
import { forwardRef } from 'react';
import { getOpenTableCreate, alertMessageUpdate } from '../../../../redux/ordersReduser';
import { StyledButton } from '../../../buttons/buttons'; 
import { colorsRef } from '../../../../consts/colorConstants';
import { MenuItem, Select, Box, ListItemText, InputBase, Typography, OutlinedInput, IconButton } from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../order/createHead/input';
import { IdComponent } from './idComponent';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

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


const SmsSend = () =>{
    const dispatch = useDispatch();
    const openSmsSend = useSelector((state) => state.ordersAll.modalControl.send_sms);
    const dostavkaRef = [{name: 'dostavka1', id: '0', value:'dostavka'}, {name: 'dostavka2', id: '1', value:'dostavka'}, {name: '8(050)123-23-23', id: '2', value:'dostavka'}];
    const [dostavka, setDostavka] = useState(dostavkaRef[0].name);
    const smsTemplates = useSelector((state) => state.ordersAll.sms_templates);
    const [template, setTemplate] = useState('0');
    const [smstext, setSmsText] = useState('');
    const [ballance, setBallance] = useState('Ви не авторизовані')
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }
    

const handleClouse =(e)=>{
  dispatch(getOpenTableCreate({id: 'send_sms', str: false}));
}
const handleSelectDostavka =(e)=>{
    setDostavka(e.target.value)
}
const handleSelectList=(e)=>{
    let str = smsTemplates.find(n=>n.name===e.target.value)
    setTemplate(str.id);
    setSmsText(str.value);
}
const handleChangeText =(e)=>{
    setSmsText(e.target.value)
}
const handleSendSms=()=>{
     if (!selected || selected.length === 0) {
      dispatch(getOpenTableCreate({id: 'send_sms', str: false}));
      dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
    } else successAlert()      
}
const successAlert = () => {
  dispatch(getOpenTableCreate({id: 'send_sms', str: false}));
  withReactContent(Swal).fire({  
      title:'Відправлено!',  
      text: 'Ваші повідомлення були поставлені в чергу на відправлення',
      icon: 'success',
      confirmButtonColor: 'rgb(96, 125, 139)',
      confirmButtonText: 'Ok',
    })
  
}
    return(
        <Dialog
        open={openSmsSend}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{'& .MuiPaper-root': {maxWidth: '798px', width: '798px', top: 0 ,
        //  '@media (min-width: 900px)': { minWidth: '798px', },
        }}}
          >
            <Box onClick={handleClouse} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <DialogTitle sx={{width: '60%', whiteSpace: 'wrap', marginLeft: '50px'}}>{"Відправка SMS повідомлень"}</DialogTitle>
          <IconButton  component="button" sx={{marginRight: '10px'}}> 
            <HighlightOffIcon />
          </IconButton>
            </Box>

        <DialogContent sx={{display: 'flex', justifyContent: 'space-around', paddingTop: '0px'}}>

        <Box sx={{maxWidth: '300px', width: '300px'}}>

        <IdComponent/>
            <Typography sx={{ fontSize: '14px', display: 'block', marginTop: '20px'}}>{'Номер відправника:'}</Typography>
        <Select 
        fullWidth
         id="dostavka"
         value={dostavka}
          onChange={handleSelectDostavka}
          defaultValue={dostavkaRef[0].name}
          input={<OutlinedInput  sx={selectStyles}/>}
          MenuProps={MenuProps}
          >          
        {dostavkaRef.map((name, ind)=>(
        <MenuItem sx={{fontSize: '14px' }} id={name.id} key ={ind} value={name.name} >      
        {name.name}
      </MenuItem>

))}
       </Select>
       <Typography sx={{fontSize: '14px', display: 'block', marginTop: '20px'}}>{'Список SMS шаблонів:'}</Typography>
       <Select 
        fullWidth
         id="templates"
         value={smsTemplates.find(n=>n.id === template)?.name}
          onChange={handleSelectList}
          defaultValue={smsTemplates.find(n=>n.id === template)?.name}
          input={<OutlinedInput  sx={selectStyles}/>}
          MenuProps={MenuProps}
          >          
        {smsTemplates.map((name, ind)=>(
        <MenuItem sx={{fontSize: '14px' }} id={name.id} key ={ind} value={name.name} >      
        {name.name}
      </MenuItem>

))}
       </Select>
       </Box >
       
            <Box sx={{maxWidth: '250px', width: '250px', marginLeft: '20px'}}>
            <Typography sx={{fontSize: '14px', display: 'block', margin: '30px 0'}}>{'Зміст повідомлення:'}</Typography>
            <textarea
              style={{maxWidth: '100%',
              border: `1px solid ${colorsRef.modalInputBorderColor}`,
              borderRadius: '4px',
              width: '100%',
              resize: 'vertical',
              outline: 'none',
            height: '100px',
            fontSize: '14px'

              }}
              value={smstext}
              onChange={handleChangeText}
              ></textarea>
              </Box>        
       
        </DialogContent>
        <DialogActions sx={{width: '95%',textAlign: 'center', borderTop: `1px solid ${colorsRef.modalInputBorderColor}`,
         marginLeft: 'auto', marginRight: 'auto', display: 'block', paddingBottom: '20px'}}>
        <Typography sx={{fontSize: '14px', display: 'block', margin: '10px 0 30px 0', textAlign: 'right'}}>{`Баланс ТурбоСМС: ${ballance}`}</Typography>

      <StyledButton            
        text={'Відправити SMS'}
        func= {handleSendSms}
        border= {colorsRef.btnAddBorderColor}               
           />

        </DialogActions>
      </Dialog> 
    )
}

export default SmsSend