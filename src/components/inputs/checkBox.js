import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import {deliverypStatus, infoStatus} from '../../redux/statusReduser';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  border: 'none',
  width: 23,
  height: 23,
}));



function BpCheckbox(props) {
  return (
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