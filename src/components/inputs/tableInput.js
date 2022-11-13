import {useState} from 'react';
import {OutlinedInput} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import {runStatus} from '../../redux/statusReduser';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { selectStyles } from './stylesInputs'; 

const MenuProps = {
  PaperProps: {
    style: {
      width: 220,
      
    },
  },
};

export function StoreInput() {

  const dispatch = useDispatch();
  const groupsStore = useSelector((state) => state.addStatus.storeRuns)
  const [groups, setgroups] = useState(['Нічого не робити']);

  const handleChange = (e) => {
    const event = e.target.value
    const {
      target: { value },
    } = e;
    setgroups(
       typeof value === 'string' ? value.split(',') : value,
    );
    let ind = groupsStore.findIndex(s=>s === event )
    dispatch(runStatus(ind))
  };


  return (
    <div>
      <FormControl sx={{minWidth:'158px', maxWidth: '162px', padding: 0 }}>
          <Select 
          id="demo-multiple-checkbox"
          value={groups}
          input={<OutlinedInput  
            sx={selectStyles}/>}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box sx={{padding: 0,  }}>
              {selected.map((value) => (
                <Chip sx={{padding: 0, backgroundColor: '#fff', fontSize: '12px'}} key={value} label={value} />
              ))}
            </Box>
          )}
           >

        {groupsStore.map((group, ind) =>(
        <MenuItem  key={ind} value={group} >
        <FormControlLabel checked={groups.indexOf(group) > -1}
          onChange={handleChange} key ={ind+group} value={group} 
          control={<Radio />} label={group} 
          />
        </MenuItem>        
        ))}        
        </Select>
      </FormControl>
    </div>
  );
}
