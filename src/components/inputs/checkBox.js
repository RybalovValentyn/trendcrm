import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import {deliverypStatus, infoStatus} from '../../redux/statusReduser';
import { BootstrapTooltip } from '../tableBody/pages/order/styles';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  border: 'none',
  width: 23,
  height: 23,
}));



export function BpCheckbox(props) {
 const  {tooltip, placement, func} = props
  return (

     <BootstrapTooltip title={tooltip} placement ={placement}>
    <Checkbox
      sx={{padding: 0,
        borderRadius: '50%',
        border: '1px solid #2f2c2d',
        width: 23,
        height: 23,
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<CheckIcon sx={{color: '#2f2c2d' }}  />}
      icon={<BpIcon sx={{color: '#2f2c2d' }} />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
    </BootstrapTooltip>
  );
}

export function CustomizedCheckboxInfo() {    
    const dispatch = useDispatch();
    const info = useSelector((state) => state.addStatus.infoStatus);
    
const onCheck=(e)=>{
    const check = e.target.checked
    dispatch(infoStatus(check))
}

    return (
        <div style={{width: '50%', alignItems: 'left', padding: '2px 10px'}}>
    
          <BpCheckbox onChange={onCheck}  checked={info}/>
    
        </div>
      );

};


export function CustomizedCheckboxDelivery() {    
    const dispatch = useDispatch();

    const delyvery = useSelector((state) => state.addStatus.deliveryStatus);
    
const onCheck=(e)=>{
    const check = e.target.checked
    dispatch(deliverypStatus(check))

}

    return (
        <div style={{width: '50%', alignItems: 'left', padding: '2px 10px'}}>
    
          <BpCheckbox onChange={onCheck} checked={delyvery} />
    
        </div>
      );

}

export function CustomizedCheckboxAll(props) {    
  const  {tooltip, placement, func} = props

  const style = {padding: 0,
        borderRadius: '50%',
        width: 22,
        height: 22,
        '&:hover': { bgcolor: 'transparent' },
      }

  return (
     <BootstrapTooltip title={tooltip} placement ={placement}>
    <Checkbox
      sx={style}
      disableRipple
      color="default"
      checkedIcon={<TaskAltIcon sx={{color: '#2f2c2d',}}  />}
      icon={<AddTaskIcon sx={{color: '#2f2c2d' }} />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
    </BootstrapTooltip>
  );
}