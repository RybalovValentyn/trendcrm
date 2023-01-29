import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import {deliverypStatus, infoStatus} from '../../redux/statusReduser';
import { BootstrapTooltip } from '../tableBody/pages/order/styles';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { colorsRef } from '../../consts/colorConstants';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  border: 'none',
  width: 23,
  height: 23,
  color: colorsRef.svgColor
}));



export function BpCheckbox(props) {
 const  {tooltip, placement, func, check} = props
  return (

     <BootstrapTooltip title={tooltip} placement ={placement}>
    <Checkbox
      sx={{padding: 0,
        borderRadius: '50%',
        border: `1px solid ${colorsRef.svgColor}`,
        width: 23,
        height: 23,
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<CheckIcon sx={{color: colorsRef.svgColor }}  />}
      icon={<BpIcon sx={{color: colorsRef.svgColor }} />}
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
      checkedIcon={<TaskAltIcon sx={{color: colorsRef.svgColor,}}  />}
      icon={<AddTaskIcon sx={{color: colorsRef.svgColor }} />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
    </BootstrapTooltip>
  );
}