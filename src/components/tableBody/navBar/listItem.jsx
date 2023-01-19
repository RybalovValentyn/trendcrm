import { Typography, Menu, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Popper } from '@mui/material';
import {colorsRef} from '../../../consts/colorConstants';

const ListItemCategories =({text, open, id, onFunc, location, list})=>{

    const el = document.getElementById(id)

const getIncludes=(text)=>{
  let navText = `nav_${text}`
  if (list[navText] && list[navText] === '1' || text === 'homeBar'|| text === 'help') {
   return true
  } else return false
  
}
return(    
        <Popper
        sx={{zIndex: 6}}
        id={text.id}
        open={open}
        anchorEl={el}
        role={undefined}
        placement="right-start"
      >
            <Paper >

 <MenuList
 sx={{backgroundColor: colorsRef.tabBgColor,  width: '200px', paddingTop: 0, paddingBottom: 0,}}
    id="basic-menu"
  >
   {text.length > 1? <MenuItem 
   autoFocus ={true}
   sx={{backgroundColor: '#e0e0e0', fontSize: '14px'}}
   >
    {text[0].text}
    </MenuItem>: null}
        {text?.map((option, index) => {
if (getIncludes(option.id)) {
        return(
          <MenuItem
          sx={{fontSize: '14px', borderRight: location === option.route?'5px solid #1a09fa':null,backgroundColor: '#fff'
        }}
            key={index}            
            selected={location === option.route}
            onClick={() =>onFunc(option.route)}
          >
            {option.text}
          </MenuItem>
        )
}
        })}
  </MenuList>

              </Paper>
                    </Popper>

)
};

export default ListItemCategories


