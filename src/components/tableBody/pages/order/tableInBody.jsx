import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import {Tab} from '@mui/material';
import {colorsRef} from '../../../../consts/colorConstants';

import {AddStatusForm} from '../modals/modalAddStatus';
import { useDispatch, useSelector } from 'react-redux';
import { getSortDate } from '../../../../redux/ordersReduser';
import { getAllOrders } from '../../../../redux/asyncThunc';
import { useParams, useSearchParams, useLocation,useNavigate, createSearchParams } from "react-router-dom";

export function ScrollTabsButton() {
  const [value, setValue] = useState(0);
const [searchParams, setSearchParams] = useSearchParams();

const statuses = useSelector((state) => state.ordersAll.getStatuses);
const dispatch = useDispatch();


  const boxStyles={
    flexGrow: 1,
    maxWidth: '100%',
    backgroundColor: '#fff',
    maxHeight: '32px',

  }

  const tabsStyles ={
    backgroundColor: colorsRef.tabBgColor,
    [`& .${tabsClasses.scrollButtons}`]: {
      '&.Mui-disabled': { opacity: 0.3 },
      maxHeight: '32px',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fff',
      width: 0,
    },
   }

const handleClick =(e)=>{
  let str = e.target.id;
  let id = 'status_name';  
  setSearchParams(createSearchParams({ status: str }));
}

  return (
    <Box sx={boxStyles} >
      <Tabs
        value={value}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={tabsStyles}
      >
          
       {statuses.map((tab, ind) =>(        
        <Tab onClick={handleClick} id={tab.id}
        sx={{ borderTop: `6px solid ${tab.style}`, padding: '0px 10px',fontSize: '12px',color: colorsRef.tabHeaderTextColor,
        backgroundColor: colorsRef.tableHeaderBgColor, minWidth: 'min-content', minHeight: '32px',  maxHeight: '32px', 
        margin: '0px 1px 0px 1px', textTransform: 'none',
      '&.Mui-selected': {backgroundColor: '#fff',color: colorsRef.tabHeaderTextColor,
         }
      }}
        key={ind} label= {`${tab.name}: ${tab.count}`} />
       
       ))}
       
       <AddStatusForm isbutton={true}/>
      </Tabs>
     
    </Box> 
  );
}
