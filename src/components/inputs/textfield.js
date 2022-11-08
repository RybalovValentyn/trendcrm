import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {nameStatus} from '../../redux/statusReduser';
import { BootstrapInput } from './stylesInputs';


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


