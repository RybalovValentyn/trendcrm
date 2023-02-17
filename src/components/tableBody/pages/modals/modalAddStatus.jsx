import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect} from 'react';
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
import {clearStatusState, modalOpenUpdate} from '../../../../redux/statusReduser';
import {SimpleSnackbar} from '../../../alerts/alertStatus';
import {StatusesSelectInput} from '../../../inputs/statusses';
import { ColorButton,textStyle, inputGroupStyle } from '../order/styles';
import { getAllStatuses } from '../../../../redux/asyncThunc';
import {StyledButton} from '../../../buttons/buttons';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export function AddStatusForm({isbutton}) {
  const isValid = useSelector((state) => state.ordersAll.isValid);
  const modalOpen = useSelector((state) => state.addStatus.modalOpen);
  const nextStatus = useSelector((state) => state.ordersAll.nextStatus);
  const dispatch = useDispatch();

  useEffect(()=>{
if (isValid) {
  console.log('is Valid');
  dispatch(orderStatusThunk());
  handleClose();
} 
  },[isValid])

  useEffect(()=>{
    if (nextStatus) {
      console.log('next Status');
    dispatch(getAllStatuses());   
    } 
      },[nextStatus])
  
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


const handleStatusesUpdate =()=>{
dispatch(getValidationForm())
     
  }

  const handleClickOpen = () => {
    dispatch(modalOpenUpdate(true))
  };

  const handleClose = () => {
    dispatch(clearStatusState())
    dispatch(modalOpenUpdate(false))
  };



 
  return (
    <div>
      { isbutton ===true  && <ColorButton startIcon={<AddIcon sx={{ '&.MuiIcon-root': {fontSize: '20px'}}}/>} variant="contained" size="small" onClick={handleClickOpen}>
        Створити статус
      </ColorButton>}

      <BootstrapDialog  TransitionComponent={Transition} keepMounted open={modalOpen} >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}  >
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
        <DialogActions  sx={{alignSelf: 'center', dicplay: 'block', marginBottom: '20px'}}>
        <StyledButton
          text={'Створити'}
          func= {handleStatusesUpdate}
          border={colorsRef.btnAddBorderColor}
          bgColor={colorsRef.btnAddBgColor}
            />
          <StyledButton
          text={'Відмінити'}
          func= {handleClose}
          border={colorsRef.buttonBorderInModal}
          bgColor={colorsRef.btnAddBgColor}
            />
        </DialogActions>
      </BootstrapDialog>
      <SimpleSnackbar/>
    </div>
  );
}
