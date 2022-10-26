import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import BootstrapDialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import {colorsRef} from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import { color } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import {forwardRef} from 'react';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export function AddStatusForm() {

    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;      
        return (
          <DialogTitle sx={{backgroundColor: colorsRef.modalHeaderBgColor,
           color: colorsRef.modalBodyBgColor,
            fontSize: '19px',
             alignItems: 'center',
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
        maxWidth: '400px',
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));   
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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


  return (
    <div>
      <ColorButton startIcon={<AddIcon sx={{ '&.MuiIcon-root': {fontSize: '20px'}}}/>} variant="contained" size="small" onClick={handleClickOpen}>
        Створити статус
      </ColorButton>

      <BootstrapDialog TransitionComponent={Transition} keepMounted open={open} onClose={handleClose}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Створення нового статусу  
        </BootstrapDialogTitle>
        
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}