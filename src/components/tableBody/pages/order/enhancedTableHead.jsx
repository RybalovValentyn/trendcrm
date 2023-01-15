import { useDispatch, useSelector } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useState, useEffect, lazy} from 'react';
import { colorsRef } from '../../../../consts/colorConstants';
import TableCell from '@mui/material/TableCell';
import {dividerStyle, dividerSecondStyle, rowPosition, tHeadStyle} from './styles';
import {Divider,TableSortLabel, Box } from '@mui/material';
import {tHeadColumnUpdate} from '../../../../redux/ordersReduser';
import { getWidthUpdate, setWidthColumn, autoUpdate } from '../../../../redux/ordersReduser';
import { SortArrow } from '../../../sortarrow';
import { getFilteredOrders, getAllOrders } from '../../../../redux/asyncThunc';

const InputSelector = lazy(() => import("./createHead/inputselector"));

 function EnhancedTableHead() {
    const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
    const widthOfColumn = useSelector((state) => state.ordersAll.widthOfColumn);
    const [width, setWidth] = useState(null);
    const [deltaWidth, setDeltaWidth] = useState(null);
    const [isResize, setIsResize] = useState(null);
    const [firstWidth, setFirstWidth] = useState(null)
    const dispatch = useDispatch();
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    

    
  
  const getWidthColumnUpdate =(e)=>{
    // console.log(e.target.id);
    setIsResize(false);
    // dispatch(setWidthColumn(width))
  }
  
const handleDownResize=(e)=>{
  // console.log(e.target.id);
  let id = e.target.id
  setIsResize(true);
  setDeltaWidth(e.clientX);
  setWidth({id: id, width: e.target.parentNode.clientWidth})
  setFirstWidth(e.target.parentNode.clientWidth)

}
const mouseWheel =(e)=>{
if (isResize) {
  // console.log(deltaWidth, firstWidth);
  setWidth({id: width.id, width: firstWidth+(e.clientX - deltaWidth)} )

}
  
}
const handleMouseUp =(e)=>{
setIsResize(false)
setFirstWidth(null)

}

const handleSortTable=({sort,ind, id})=>{
  console.log(sort,ind, id);
dispatch(autoUpdate({id: 'sortColumn', str: ind}))
dispatch(autoUpdate({id: 'sortTable', str: sort}))

getUpdate()
}

const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}
    return (    
      <TableHead sx={{ backgroundColor: colorsRef.formBgColor, position: '-webkit-sticky', position: 'sticky', top: '0', zIndex: 2}} >    
  
        <TableRow sx={rowPosition}>       
  
          {dataForHeader.map((row, ind) => (          
            <TableCell
            onMouseUp={getWidthColumnUpdate}            
            onMouseMove={mouseWheel}
              colSpan={1}
              key={row.id}
              id={row.id}
              sx={tHeadStyle} 
              align= "left"        
              >  
              <div  id={row.id} style={{   overflow: 'hidden', maxWidth: '600px', padding: '4px 40px', alignItems: 'center',
              minWidth: isResize && width?.id === row.id?width?.width : widthOfColumn[row.id],
                   position: 'relative', color: colorsRef.labelTextColor, display: 'flex',}} key={row.id}>
  
              {/* <TableSortLabel            
                active={orderBy === row.id}
                direction={orderBy === row.id ? order : 'asc'}
              > */}
                {row.str}
                {/* {orderBy === row.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null} */}
               
              {/* </TableSortLabel> */}
              <SortArrow id={row.id} ind={ind} func={handleSortTable}/>
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
            </TableCell>
            ))}
        </TableRow>
            </TableHead>
      
    );
  };

  export default EnhancedTableHead