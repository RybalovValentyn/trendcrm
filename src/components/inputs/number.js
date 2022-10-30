import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {idStatus} from '../../redux/statusReduser';

export function StyledNumInput() {
    const dispatch = useDispatch();
    const numStatus = useSelector((state) => state.addStatus.statusId); 

const handleInputchange =(e)=>{
    if (Number(e.target.value)) {
        dispatch(idStatus(e.target.value))
    } }

    return (
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%', maxWidth: '158px', margin: 0,
         borderRadius: '4px', fontSize: 12, border: '1px solid #d0d0d0', padding: '6px', },
      }}     
       autoComplete="off"
    >
      <input 
    onChange={handleInputchange}
      value={numStatus}
      id="outlined" 
       />  
    </Box>
    );
  }