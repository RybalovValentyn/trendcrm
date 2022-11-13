import Box from '@mui/material/Box';
import {clasListContainer, svgStyle} from './styles';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import {BpCheckbox} from '../../../inputs/checkBox'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import {getOpenTableCreate, getClouseTableCreate} from '../../../../redux/ordersReduser';
import {CreateTable} from './createTable';
import {StyledButton} from '../../../buttons/buttons';
import {CreateRows} from './createRow/createRows';
import { ListAutocompliteStatuses } from './createRow/listStatuses';
export function HeaderContainer() {
const dispatch = useDispatch();

const isOpen = useSelector((state) => state.ordersAll.modalControl.openCreator);

const handleClick = (e)=>{
  dispatch(getOpenTableCreate(!isOpen))
  console.log('shandleClicked');
  dispatch(getClouseTableCreate())
}

const onChangeCheckBox =() =>{
  console.log('sd');
}


const listStyle={
  display: 'flex',
  alignItems: 'center',
padding: 0
}

const listItemStyle={
  padding: '0px 10px'
}

  return (
    <Box sx={clasListContainer}  component="section">
      <StyledButton
        text={isOpen?'Cloused': 'Створити'}
        func= {handleClick}
        startIcon = { <AddIcon fontSize='large' />}
           />
      {/* <CreateTable/> */}
      {isOpen && <ListAutocompliteStatuses/>}
      <CreateRows/>
    <List  sx={listStyle}>

      <ListItem sx={listItemStyle}>
      <AddTaskIcon sx={svgStyle}/>
      </ListItem>
       
        <ListItem sx={listItemStyle}>
        <BuildOutlinedIcon sx={svgStyle}/>
        </ListItem>
       
        <ListItem sx={listItemStyle}>
        <LocalMallOutlinedIcon sx={svgStyle}/>
        </ListItem>
        
        <ListItem sx={listItemStyle}> 
        <SettingsIcon sx={svgStyle}/>
        </ListItem>

        <ListItem sx={listItemStyle}>
        <BpCheckbox />
        </ListItem>

        <ListItem sx={listItemStyle}>
        <ReplayOutlinedIcon sx={svgStyle}/>
        </ListItem>        

        <ListItem>
        <input style={{width: '50px', padding: '4px 5px', border: '1px solid #d0d0d0', borderRadius: '4px'}} type='text'></input>
        </ListItem>


    </List>
    </Box>
  );
}