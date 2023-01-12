import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate } from '../../../../../redux/ordersReduser';
import { InputFile } from '../../../../inputs/fileInput/fileInput';
import { MenuItem, Select, Box, Typography, OutlinedInput, IconButton } from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../../order/createHead/input';
import { ModalComponent } from '../modalComponent';



const ExportExcelComponent=()=>{
    const dispatch = useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.open_modal_component);
    const [group, setGroup] = useState('Повернення товару')
    const data=[{id:1, name:'Повернення товару' }, {id:2, name:'Кошти отримані'}]

    const handleClouse =(e)=>{
        dispatch(getOpenTableCreate({id: 'open_modal_component', str: false}));
      }

    const handleSendFile=()=>{
        console.log('handleSendFile');
    }
const Component =()=>(
   
        <DialogContent>
        
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Typography>{'Дія:'}</Typography>

        <Select 
          id="3"
           value={group}
        //   onChange={handleSelectChange}
          input={<OutlinedInput  sx={selectStyles}/>}
        //   MenuProps={MenuProps}
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
    )


    return(

        <ModalComponent Component={Component} funcOnClouse={handleClouse} open={open} closeButtonText={'Закрити'} sendButtonText={'Завантаити'} titleText={"Завантажити Exel "}
         funcOnSend={handleSendFile} borderHeader={true} borderAction={false} alignAction={false}/>
       )
};
export default ExportExcelComponent