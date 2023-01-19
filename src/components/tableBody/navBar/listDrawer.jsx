import {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import { List, ListItem, Typography} from '@mui/material';
import { colorsRef } from '../../../consts/colorConstants';

export default function SimpleCollapse({name, id, isOpen, child, onFunc, wrawOpen, location, list}) {
    
  const [checked, setChecked] = useState(false);

  const getIncludes=(text)=>{
    let navText = `nav_${text}`
    if (list[navText] && list[navText] === '1') {
     return true
    } else return false
    
  }

  return (

        <div>
          <Collapse in={name === id && wrawOpen?isOpen:false}>
                <List sx={{'& :hover':{backgroundColor: colorsRef.tabBgColor, cursor: 'pointer'}}} >
                    {child?.map(item=>{
                      if (getIncludes(item.id)) {
                        return(
                          <ListItem  key ={item.id}  sx={{paddingLeft: '40px', alignItems: 'flex-start',
                          borderRight: location === item.route?'5px solid #1a09fa':null, backgroundColor: location === item.route?'#deddf4':null}} 
                          onClick={()=>onFunc(item.route)}>
                            <Typography sx={{'& .MuiTypography-root':{fontSize: '14px', color: 'inherit'}, fontSize: '14px',
                          display: 'block', marginRight: 'auto'}}>  {item.text}</Typography>
                          </ListItem>
                        )
                      }
                    }

                    )}
                </List>
            </Collapse>
        </div>


  );
}