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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
        overflowX: 'hidden',
      },
    },
  };


export const ModalMenu = () =>{
    const dispatch = useDispatch();
    const openDownExel = useSelector((state) => state.ordersAll.modalControl.opendownload);
    const [group, setGroup] = useState('Повернення товару')
    const data=[{id:1, name:'Повернення товару' }, {id:2, name:'Кошти отримані'}]


const handleClouse =(e)=>{
  dispatch(getOpenTableCreate({id: 'opendownload', str: false}));
}
const handleSelectChange =(e)=>{
  setGroup(e.target.value)
}


    return(
        <Dialog
        open={openDownExel}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{overflow: 'hidden', '& .MuiPaper-root': {width: '520px', bottom: '200px' }}}
          >
            <Box onClick={handleClouse} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogTitle >{"Завантажити Exel "}</DialogTitle>
          <IconButton  component="label">
            <HighlightOffIcon />
          </IconButton>
            </Box>

        <DialogContent>
        
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '470px'}}>
        <Typography>{'Дія:'}</Typography>

        <Select 
          id="3"
           value={group}
          onChange={handleSelectChange}
          input={<OutlinedInput  sx={selectStyles}/>}
          MenuProps={MenuProps}
          >          
        {data.map((name, ind)=>(
        <MenuItem sx={{fontSize: '14px' }} id={name.id} key ={ind} value={name.name} >      
        {name.name}
      </MenuItem>

))}

       </Select>
        </Box >
        <InputFile/>
        </DialogContent>
        <DialogActions sx={{width: '500px'}}>

        <StyledButton
        text={'Закрити'}
        func= {handleClouse}
        border= {'#7bb31a'} 
           />

      <StyledButton            
        text={'Відправити'}
        func= {handleClouse}
        border= {colorsRef.btnAddBorderColor}
               
           />

        </DialogActions>
      </Dialog> 
    )
}