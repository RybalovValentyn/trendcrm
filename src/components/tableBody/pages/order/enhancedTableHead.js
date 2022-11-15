import { useDispatch, useSelector } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import { colorsRef } from '../../../../consts/colorConstants';
import TableCell from '@mui/material/TableCell';
import {dividerStyle, dividerSecondStyle, rowPosition, tHeadStyle} from './styles';
import {Divider,TableSortLabel, Box } from '@mui/material';
import {tHeadColumnUpdate} from '../../../../redux/ordersReduser';
import { visuallyHidden } from '@mui/utils';
import {translater} from './translate';
import {SearchInput} from './tableInBody';
import { getWidthUpdate, setWidthColumn } from '../../../../redux/ordersReduser';

export function EnhancedTableHead({props}) {
     const columns = useSelector((state) => state.ordersAll.columns);
    const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
    const widthOfColumn = useSelector((state) => state.ordersAll.widthOfColumn);
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =  props;
    const dispatch = useDispatch();

useEffect(() => {
    const result =[]
    if (columns.length > 0) {
    const headerValue = columns.flatMap(column => Object.keys(column))
    .filter((column, index, array) => array.indexOf(column) === index).reduce((acc,str, ind) =>{
        if (translater[str]) {
           return result.push({id:str, str:translater[str]})
        }    
    },[])
    dispatch(tHeadColumnUpdate(result))
}}, [columns]);  
    
 
      
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
   
  const getWidthColumnUpdate =(e)=>{
    let id = e.target.id;
    let width = e.target.clientWidth;
    const duplicateColumn = [...widthOfColumn];
    let ind = duplicateColumn.findIndex(str=>str.id === id);
  if (ind >=0) {
    duplicateColumn.splice(ind, 1,{id,width})
   return dispatch(getWidthUpdate(duplicateColumn))
  } else return dispatch(setWidthColumn({id,width}))
  }
  
  const containerStyle ={
    // resize: 'horizontal',
    // resizeColor: '#fff',
   overflow: 'hidden',
  maxWidth: '600px',
   padding: '3px 10px',
    alignItems: 'center',
   // minWidth: width,
    position: 'relative',
    // "& :resize" : {
    //   color: "#fff"
    // }
}
  
    return (    
      <TableHead sx={{ backgroundColor: colorsRef.formBgColor, position: '-webkit-sticky', position: 'sticky', top: '0', zIndex: 2}} >    
  
        <TableRow sx={rowPosition}>       
  
          {dataForHeader.map((row) => (          
            <TableCell
            //  onMouseDown={(e) =>replaceRows(e)} 
              onMouseUp={getWidthColumnUpdate} 
              colSpan={1}
              key={row.id}
              id={row.id}
              sx={tHeadStyle} 
              align= "center"        
              >  
              <div  id={row.id} style={containerStyle} key={row.id}>
  
              <TableSortLabel            
                active={orderBy === row.id}
                direction={orderBy === row.id ? order : 'asc'}
                // onClick={createSortHandler(HeaderTable.id)}
              >
                {row.str}
                {orderBy === row.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
               
              </TableSortLabel>
              <Divider  id={row.id} key={row.id} sx={dividerStyle} orientation="vertical" flexItem />
              </div>
              <Divider sx={dividerSecondStyle} />
            </TableCell>  ))}
        </TableRow >
  
        <TableRow sx={rowPosition}  >
            {dataForHeader.map((call) =>(
            <TableCell
            key={call.id}
            align='center'
            sx={{ whiteSpace: 'nowrap', padding: '5px 0px'}}
            >
               <SearchInput props={'wwwwwww'} options={props}/>             
            </TableCell>
            ))}
        </TableRow>
            </TableHead>
      
    );
  }