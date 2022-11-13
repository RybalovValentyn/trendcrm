import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {getOpenTableCreate} from '../../../../redux/ordersReduser';

export function CreateTable() {
const open = useSelector((state) => state.ordersAll.openCreator);
const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(getOpenTableCreate(false))
  };
const dialogStyle ={
    minWidth:'1900px'
}

const dialogTitleStyle ={
    width: '1100px'
}
  return (
    <div style={{width: '1500px'}} >
      <Dialog sx={dialogStyle} open={open} onClose={handleClose}>
        <DialogTitle sx={dialogTitleStyle}>Subscribe</DialogTitle>
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
      </Dialog>
    </div>
  );
}