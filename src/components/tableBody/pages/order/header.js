import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {colorsRef} from '../../../../consts/colorConstants';

export function HeaderContainer() {
const clasListContainer ={
width: '100%',
// minHeight: '45px',
backgroundColor: colorsRef.boxTableColor,
fontSize: '13px',
padding: '23px 23p',
paddingTop: '64px',


}
  return (
    <Box sx={clasListContainer}  component="section">
    
    </Box>
  );
}