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
import { MenuItem, Select, Box, ListItemText, InputBase, Typography, OutlinedInput, IconButton } from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../order/createHead/input';


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
    const dostavkaRef = [{name: 'dostavka', id: '0', value:'dostavka'}];
    const [dostavka, setDostavka] = useState('dostavka');
    const smsTemplates = useSelector((state) => state.ordersAll.sms_templates);
    const [template, setTemplate] = useState('0');
    const [smstext, setSmsText] = useState('');
    const [ballance, setBallance] = useState('Ви не авторизовані')


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
    console.log('sdfsf');
    dispatch(getOpenTableCreate({id: 'send_sms', str: false}));

}
    return(
        <Dialog
        open={openSmsSend}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden',  '& .MuiPaper-root': {maxWidth: '898px', width: '600px', top: 0 , '@media (min-width: 900px)': {
            minWidth: '898px',
            },}}}
          >
            <Box onClick={handleClouse} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <DialogTitle sx={{width: '80%', whiteSpace: 'wrap'}}>{"Відправка SMS повідомлень"}</DialogTitle>
          <IconButton  component="button" sx={{marginRight: '10px'}}> 
            <HighlightOffIcon />
          </IconButton>
            </Box>

        <DialogContent>
        <Typography sx={{fontSize: '14px',}}>{'Отримувач:'}</Typography>
        <Box sx={{maxWidth: '250px', }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '50%', margin: '10px 0'}}>
                 <Typography sx={{display: 'block', fontSize: '14px', whiteSpace: 'nowrap'}}>{'1 Номер'}</Typography>
                 <Typography sx={{marginLeft: '40px', fontSize: '14px', display: 'block'}}>{'Відправник'}</Typography>
            </Box>
        <Select 
        fullWidth
         id="dostavka"
         value={dostavka}
          onChange={handleSelectDostavka}
          defaultValue={dostavka}
          input={<OutlinedInput  sx={selectStyles}/>}
          MenuProps={MenuProps}
          >          
        {dostavkaRef.map((name, ind)=>(
        <MenuItem sx={{fontSize: '14px' }} id={name.id} key ={ind} value={name.name} >      
        {name.name}
      </MenuItem>

))}
       </Select>
       <Typography sx={{fontSize: '14px', display: 'block', margin: '10px 0'}}>{'Список SMS шаблонів'}</Typography>
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
 <Typography sx={{fontSize: '14px', display: 'block', margin: '10px 0'}}>{'Зміст повідомлення'}</Typography>
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
        </Box >
       
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