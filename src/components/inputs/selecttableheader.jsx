import Select from '@mui/material/Select';
import {useSelector } from 'react-redux';
import { InputBase } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 200,
      overflowX: 'hidden',
    },
  },
};

export const SelectTable=({id, InputStyle, listStyle, onChangeFunc})=>{
    const value = useSelector((state) => state.ordersAll.searchParams);
    const ordersAll = useSelector((state)=> state.ordersAll);

    let initValue = ''
    if (id === 'payment_type') {
        let splitingId = value.payment_name.length >2?value.payment_name.split(',')[0]: value.payment_name
      initValue = ordersAll[id]?.find(n=>n.id === splitingId)?.name
    } else initValue =ordersAll[id]?.find(n=>n.id === value[id])?.name



    return(
        <Select 
    id={id}
    name = {id}
    value={initValue?initValue:'' }
    onChange={(e)=>onChangeFunc(e,id)}
    input={<InputBase  sx={InputStyle}/>}
    MenuProps={MenuProps}
    displayEmpty
    defaultValue=''
  >
      <MenuItem  value='' sx={listStyle}>      
      {'Всі'}
      </MenuItem>
      {ordersAll[id].map((name, ind) => (
        <MenuItem  key={ind} value={name.name} sx={listStyle}>      
          {name.name}
        </MenuItem>
      ))
}

  </Select>
    )
}