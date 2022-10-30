import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import {styled } from '@mui/material/styles';
import {nameStatus} from '../../redux/statusReduser';



const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      fontSize: 12,
      border: `1px solid #d0d0d0`,
      width: 'auto',
      padding: '6px',
    },
    '&:focus &:hover': {
      
      },
  }));


export function StyledInput() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.addStatus.name);

  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '100%', maxWidth: '158px', margin: 0,  },
    }}
     autoComplete="off"
  >
    <BootstrapInput
    onChange={(e)=>(dispatch(nameStatus(e.target.value)))}
    value={name} id="outlined-basic" variant="outlined" />
  </Box>
  );
}


