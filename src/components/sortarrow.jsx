import {Box, } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';

export const SortArrow = ({id, ind, func})=>{
    const sortColumn = useSelector((state) => state.ordersAll.sortColumn);
    const sortTable = useSelector((state) => state.ordersAll.sortTable);

const svgStyle={
    color: '#999999',
    padding: '0',
    marginBottom: '-7px',
    marginTop: '-7px',
    "&:hover":{
        cursor: 'pointer'
    }
    
}
if (ind === sortColumn) {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', position: 'absolute', top: '10px', right: '10px'    }}>
        {sortTable === 'asc'? <KeyboardArrowUpIcon onClick={()=>func({sort:'desc', ind: ind, id})} sx={svgStyle}/>:<KeyboardArrowDownIcon onClick={()=>func({sort:'asc', ind:ind, id})} sx={svgStyle}/>} 
        </Box> 
    )
} else 
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', position: 'absolute', top: '5px', right: '10px'    }}>
        <KeyboardArrowUpIcon onClick={()=>func({sort:'desc', ind: ind, id})} sx={svgStyle}/>
        <KeyboardArrowDownIcon onClick={()=>func({sort:'asc', ind:ind, id})}  sx={svgStyle}/>
        </Box>
    )
}