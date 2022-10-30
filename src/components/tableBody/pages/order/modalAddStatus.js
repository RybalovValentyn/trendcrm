import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';
import {colorsRef} from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import {forwardRef} from 'react';
import Slide from '@mui/material/Slide';
import { StoreInput } from '../../../inputs/tableInput';
import {Typography  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { ColorPicker } from '../../../inputs/colorInput';
import {SelectInput} from '../../../inputs/select';
import {IsAcceptedInput} from '../../../inputs/isAccepted';
import { CustomizedCheckboxInfo, CustomizedCheckboxDelivery } from '../../../inputs/checkBox'; 
import {orderStatusThunk, getValidationForm} from '../../../../redux/asyncOrders';
import { StyledNumInput} from '../../../inputs/number';
import { StyledInput } from '../../../inputs/textfield';
import {clearStatusState} from '../../../../redux/statusReduser';
import {SimpleSnackbar} from '../../../alerts/alertStatus';
import {StatusesSelectInput} from '../../../inputs/statusses';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export function AddStatusForm() {
  const isError = useSelector((state) => state.ordersAll.isError);
  const errorMessage = useSelector((state) => state.ordersAll.error);
  const isValid = useSelector((state) => state.ordersAll.isValid);
  const dispatch = useDispatch();


  useEffect(()=>{
if (isValid) {
  console.log('ssssssssssssssss');
  dispatch(orderStatusThunk())
  handleClose()
} 
  },[isValid])
  
    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;      
        return (
          <DialogTitle sx={{backgroundColor: colorsRef.modalHeaderBgColor,
           color: colorsRef.modalBodyBgColor,
            fontSize: '19px',
             alignItems: 'center',
             width: '400px'
            }}
             {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
      }
      const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));  

  const [open, setOpen] = useState(false);

const handleStatusesUpdate =()=>{
dispatch(getValidationForm())
     
  }

  const handleClickOpen = () => {
     setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearStatusState())
    setOpen(false);
  };


const ColorButton = styled(Button)(({ theme }) => ({
    borderRadius: 0,
    fontSize: '14px',
    color: colorsRef.typografyColor,
    fontWeight: 700,
    backgroundColor: colorsRef.buttonStatusBgColor,
    textTransform: 'none',
    boxShadow: 'none',
    padding: '0px 20px',
   height: '32px',
    '&:hover': {
      backgroundColor: '#d7d6d8 ',
      boxShadow: 'none',
       },
  }));

  const inputGroupStyle = {maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between', 
    padding: '2px 10px',
    alignItems: 'center'
  }

  const textStyle = {display: 'block', 
  fontSize: '14px',
   width: '50%'};
 
  return (
    <div>
      <ColorButton startIcon={<AddIcon sx={{ '&.MuiIcon-root': {fontSize: '20px'}}}/>} variant="contained" size="small" onClick={handleClickOpen}>
        Створити статус
      </ColorButton>

      <BootstrapDialog TransitionComponent={Transition} keepMounted open={open} >
        <BootstrapDialogTitle id="customized-dialog-title">
          Створення нового статусу  
        </BootstrapDialogTitle>
        
        <List sx={{width: '100%', padding: '20px'}}>

          <ListItem key='name' sx={inputGroupStyle}> <Typography sx={textStyle} > Назва:</Typography> 
          <StyledInput />
          </ListItem>

          <ListItem key='num' sx={inputGroupStyle}> <Typography sx={textStyle} > Порядковий номер:</Typography>
          <StyledNumInput />
          </ListItem>

          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Колір:</Typography>
           <ColorPicker/>
            </ListItem>

          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Групи користувачів:</Typography> 
          <SelectInput /> 
          </ListItem>
          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Дії на складі:</Typography>
           <StoreInput type='store' />
            </ListItem>
          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Прийнятий:</Typography>
           <IsAcceptedInput /> 
           </ListItem>
          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Доставка:</Typography>
           <CustomizedCheckboxDelivery  />
            </ListItem>
          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Основна інформація:</Typography>
           <CustomizedCheckboxInfo  />
            </ListItem>
          <ListItem sx={inputGroupStyle}> <Typography sx={textStyle} > Статуси:</Typography> 
          <StatusesSelectInput />
           </ListItem>
          </List>
        <DialogActions>
          <Button onClick={handleStatusesUpdate}>Створити</Button>
          <Button onClick={handleClose}>Відмінити</Button>
        </DialogActions>
      </BootstrapDialog>
      <SimpleSnackbar/>
    </div>
  );
}
