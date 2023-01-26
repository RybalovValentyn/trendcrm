import IconButton from '@mui/material/IconButton';
import {  useSnackbar } from 'notistack';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export function SnackbarCloseButton({ snackbarKey }) {
    const { closeSnackbar } = useSnackbar();
  
    return (
      <IconButton onClick={() => closeSnackbar(snackbarKey)}>
        <CancelOutlinedIcon sx={{color: '#fff'}} />
      </IconButton>
    );
  }