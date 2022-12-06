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
import { InputSelector } from './createHead/inputselector';

export function EnhancedTableHead({props}) {
     const columns = useSelector((state) => state.ordersAll.columns);
    const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
    const widthOfColumn = useSelector((state) => state.ordersAll.widthOfColumn);
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =  props;
    const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const [width, setWidth] = useState(null);
    const [deltaWidth, setDeltaWidth] = useState(null);
    const [isResize, setIsResize] = useState(null);
    const [firstWidth, setFirstWidth] = useState(null)
    const dispatch = useDispatch();


useEffect(() => {
  const result =[]
  if (columns.length > 0 && filteredColumn.length === 0) {
    const headerValue = Object.keys(columns[0]).reduce((acc,str, ind) =>{
        if (translater[str]) {
           return result.push({id:str, str:translater[str]})
        }    
    },[]); 
  // const headerValue = columns.flatMap(column => Object.keys(column))  
  // .filter((column, index, array) => array.indexOf(column) === index).reduce((acc,str, ind) =>{
  //     if (translater[str]) {
  //        return result.push({id:str, str:translater[str]})
  //     }    
  // },[]); 
  dispatch(tHeadColumnUpdate(result));
  
}else  if (columns.length > 0 && filteredColumn.length > 0) {
  const headerValue =  filteredColumn.reduce((acc,str, ind) =>{
      if (translater[str.data]) {
         return result.push({id:str.data, str:translater[str.data]})
      }    
  },[]);
  dispatch(tHeadColumnUpdate(result))
}
}, [columns, filteredColumn]); 
    
 
      
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
   
  const getWidthColumnUpdate =(e)=>{
    setIsResize(false);
dispatch(setWidthColumn(width))
  }
  
  const containerStyle ={
    // resize: 'horizontal',
    // resizeColor: '#fff',
   overflow: 'hidden',
  maxWidth: '600px',
   padding: '3px 10px',
    alignItems: 'center',
   minWidth: width,
    position: 'relative',
    // "& :resize" : {
    //   color: "#fff"
    // }
}

const handleDownResize=(e)=>{
  console.log(e.target.id);
  let id = e.target.id
  setIsResize(true);
  setDeltaWidth(e.clientX);
  setWidth({id: id, width: e.target.parentNode.clientWidth})
  setFirstWidth(e.target.parentNode.clientWidth)

}
const mouseWheel =(e)=>{
if (isResize) {
  console.log(deltaWidth, firstWidth);
  setWidth({id: width.id, width: firstWidth+(e.clientX - deltaWidth)} )

}
  
}
const handleMouseUp =(e)=>{
setIsResize(false)
setFirstWidth(null)

}
    return (    
      <TableHead sx={{ backgroundColor: colorsRef.formBgColor, position: '-webkit-sticky', position: 'sticky', top: '0', zIndex: 2}} >    
  
        <TableRow sx={rowPosition}>       
  
          {dataForHeader.map((row) => (          
            <TableCell
            
            //  onMouseDown={(e) =>replaceRows(e)} 
            onMouseUp={getWidthColumnUpdate}            
            onMouseMove={mouseWheel}
              colSpan={1}
              key={row.id}
              id={row.id}
              sx={tHeadStyle} 
              align= "center"        
              >  
              <div  id={row.id} style={{   overflow: 'hidden', maxWidth: '600px', padding: '3px 10px', alignItems: 'center',
              minWidth: isResize && width?.id === row.id?width?.width : widthOfColumn[row.id],
                // minWidth:{ width},
                  position: 'relative',}} key={row.id}>
  
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
              <Divider onMouseDown={handleDownResize} 
              onMouseUp = {handleMouseUp}  
              id={row.id} key={row.id} sx={dividerStyle} orientation="vertical" flexItem />
              </div>
              <Divider sx={dividerSecondStyle} />
            </TableCell>  ))}
        </TableRow >
  
        <TableRow sx={rowPosition}  >
            {dataForHeader.map((call) =>(
            <TableCell
            key={call.id}
            align='center'
            sx={{ whiteSpace: 'nowrap', padding: '4px 20px'}}
            >
            <InputSelector name={call.id} />
               {/* <SearchInput props={'wwwwwww'} options={props}/>              */}
            </TableCell>
            ))}
        </TableRow>
            </TableHead>
      
    );
  }