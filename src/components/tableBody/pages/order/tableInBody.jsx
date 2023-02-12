import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import {Tab} from '@mui/material';
import {colorsRef} from '../../../../consts/colorConstants';

import {AddStatusForm} from '../modals/modalAddStatus';
import { useDispatch, useSelector } from 'react-redux';
import { getSortDate, autoUpdate } from '../../../../redux/ordersReduser';
import { getAllOrders, getFilteredOrders } from '../../../../redux/asyncThunc';
import { useParams, useSearchParams, useLocation,useNavigate, createSearchParams } from "react-router-dom";


function ScrollTabsButton() {
  const navigate = useNavigate();
  
const [searchParams, setSearchParams] = useSearchParams();
const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
const statuses = useSelector((state) => state.ordersAll.getStatuses);
const dispatch = useDispatch();
const statusName = searchParams.get('status');
const seachStatus = useSelector((state) => state.ordersAll.statusName);
const initStatusSelect = seachStatus?statuses.findIndex(n=>n.id === seachStatus):0
const [value, setValue] = useState(Number(initStatusSelect));

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
  dispatch(autoUpdate({id: 'start', str: 0}));
  dispatch(autoUpdate({id: 'page', str: 0}))
  let str = e.target.id;
  if (e.target.id === '0' || e.target.id === 0) {
    dispatch(autoUpdate({id:'statusName', str: null}));
    navigate('/orders');
  } else 
  if (Number(str)) {
    dispatch(autoUpdate({id:'statusName', str: str}));
    setSearchParams(createSearchParams({ status: str }));
  }
  getUpdate()
}


useEffect(()=>{
  if(Number(statusName )){    
    // setSearchParams(createSearchParams({ status: statusName }));
    dispatch(autoUpdate({id:'statusName', str: statusName}));
    
  }
  if (seachStatus !== statusName) {
    setValue(statusName?statuses.findIndex(n=>n.id === statusName):statuses.findIndex(n=>n.id === seachStatus))   
    getUpdate()
  }  
},[statusName])


const getUpdate = ()=>{
  console.log('update from statuses', seachStatus ,statusName);
  sessionStorage.setItem("selected", '');
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}
const handleChange = (event, newValue) => {
   setValue(newValue);
};

  return (
    <Box sx={boxStyles} >
      <Tabs
        value={value?value:0}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="visible arrows tabs example"
        sx={tabsStyles}
       
      >
          
       {statuses.map((tab, ind) =>(        
        <Tab onClick={handleClick} id={tab.id}
        sx={{ borderTop: `6px solid ${tab.style}`, padding: '0px 10px',fontSize: '12px',color: colorsRef.tabHeaderTextColor,
         minWidth: 'min-content', minHeight: '32px',  maxHeight: '32px', 
        margin: '0px 1px 0px 1px', textTransform: 'none',
        backgroundColor: colorsRef.tableHeaderBgColor,
      '&.Mui-selected': {color: colorsRef.tabHeaderTextColor,backgroundColor:'#fff'
         }
      }}
        key={ind} label= {`${tab.name}: ${tab.count}`} />
       
       ))}
       
       <AddStatusForm isbutton={true}/>
      </Tabs>
     
    </Box> 
  );
}
export default ScrollTabsButton