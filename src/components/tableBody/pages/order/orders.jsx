import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {Paper,TableSortLabel, Stack, Tab, Checkbox,Divider, 
    TablePagination, FormControlLabel, Switch, Hidden, Typography} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {ScrollTabsButton} from './tableInBody';
import {useNavigate} from 'react-router-dom';
import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import {getRowsAfterAdd, getAllOrders, getAllStatuses, getSitysFromNp} from '../../../../redux/asyncThunc';
import {HeaderContainer} from './header';
import {GetRowsComparator} from './getRowsComparator';
import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle, tableBoxStyle,
         paperTableStyle, tableContainerStyle, inOrdersBoxStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn,
   getOpenTableCreate, autoUpdate, getFormTable} from '../../../../redux/ordersReduser';
import {EnhancedTableHead} from './enhancedTableHead';
import { Preloader } from '../../../preloader/preloader';
import { ComentModalMenu } from '../modals/comentmodal';
import { CustomTablePagination } from './pagination';
import {MyTablePagination} from './myPagination';

export  function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);
  const allOrders = useSelector((state) => state.ordersAll.columns);
  const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
  const idRows = useSelector((state) => state.ordersAll.CreateRows?.id);
  const tableLength = useSelector((state) => state.ordersAll.tableLength);
  const startRows = useSelector((state) => state.ordersAll.start);
  let arrayRows = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
  
    const page = useSelector((state) => state.ordersAll.page);
    const rowsPerPage = useSelector((state) => state.ordersAll.rowsPerPage);


  useEffect(() => {
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
if (!allOrders[0]) {
  dispatch(getAllOrders());
}
  
        
}, []);

useEffect(() => {
  if (isGrabAll === true) {
    const newSelected = bodyTableRows.map((n,ind) => n[0].value);
    setSelected(newSelected);
    return;
  } else  setSelected([]);
}, [isGrabAll]);


useEffect(() => {
if (columns.length > 0 && dataForHeader.length > 0 && filteredColumn.length === 0) {
  GetRenderRows(dataForHeader, columns)
 dispatch(bodyTableRowsUpdate([...arrayRows.reverse()]))
} else if (columns.length > 0 && filteredColumn.length > 0 ) {
  GetRenderFilteredRows(filteredColumn, columns)
 dispatch(bodyTableRowsUpdate([...arrayRows.reverse()]))
}

}, [columns, dataForHeader, filteredColumn]);


const GetRenderFilteredRows =(dataForHeader, columns) =>{   
  const arrayRow = columns.map((str, ind) =>{
   let result = []
    const rowSpan = filteredColumn.reduce((acc,val, ind) =>{
        return result.push({id:val.data, value: str[val.data], color: str.status_style }
            )  },[])
     arrayRows.push(result)

   })   

};
  
 const GetRenderRows =(dataForHeader, columns) =>{   
     const arrayRow = columns.map((str, ind) =>{
      let result = []
       const rowSpan = dataForHeader.reduce((acc,val, ind) =>{
           return result.push({id:val.id, value: str[val.id], color: str.status_style }
               )  },[])
        arrayRows.push(result)
  
      })   
   };
   
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    


const handleSelect = (e, id) =>{
  if (isGrabAll === true){
  dispatch(autoUpdate({id: 'isGrabAll', str: false}))   } 
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
if (selectedIndex === -1 && !e.ctrlKey) {
  newSelected.push(id);
  }  
 if (e.ctrlKey) {
  // console.log('selected', selected.length, selected, selectedIndex);
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id)
  } else if (selectedIndex >= 0) {
    selected.splice(selectedIndex,1);
    newSelected = [...selected]
  }  
}
setSelected(newSelected);
 } 

const  hexToRgbA = (hex) =>{
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length == 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.25)';
  }
  throw new Error('Bad Hex');
}

const handleClick = (e, index, name) => { 
  let id = name?.find(n=>n.id === 'id').value;
  let idRows = columns.find(n=>n.id === id);
  if (id) {
    handleSelect(e,id)
  } 
    if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
      dispatch(autoUpdate({id: 'rowsToUpdate', str: idRows}))
        dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));       
 
      };
   if (e.detail === 2) {
    // dispatch(autoUpdate({id: 'rowsToUpdate', str: idRows}))
       handleDoubleClick(e, index, idRows)
      }
  }
  const handleDoubleClick=(event, index, name)=>{
    let id = name.id;

    dispatch(getRowsAfterAdd(id));
    dispatch(autoUpdate({id: 'isUpdateRows', str: true}));
// dispatch(autoUpdate({id: 'createRows', str: name})) 
  }

return (

    <Box sx={tableBoxStyle} >    
 {/* HEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHT */} 
   < HeaderContainer/>

      <Paper sx={paperTableStyle}>
      <ScrollTabsButton/> 
{/* HEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHT */}
         <TableContainer sx={tableContainerStyle} >
         {isLoading && <Preloader/>}
                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead 
                          props ={bodyTableRows}
                          // numSelected={selected.length}
                          // order={order}
                          // orderBy={orderBy}
                          // onRequestSort={handleRequestSort}
                          rowCount={bodyTableRows?.length}/>

        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor}} >
              {/* {stableSort(bodyTableRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {bodyTableRows.map((rows, index, arr) => {

                  return (
                    <tr 
                    onClick={(e)=>handleClick(e, index, arr[index])}
                    tabIndex={-1}
                    key={index}
                    
                    // selected={selected.indexOf(rows[0].value) !== -1}
                     style={{
                      // '&:focus': {backgroundColor: '#B0C4FF', color: '#fff'},
                      backgroundColor: selected.indexOf(rows[0].value) !== -1?'#B0C4FF':hexToRgbA(rows[0]?.color),
                      color: selected.indexOf(rows[0].value) !== -1?'#fff':'#000', 
                      cursor: 'pointer',
                      border: '1px solid #fff'
                  
                    }}
                  >
            {rows.map((row,ind) => (
              
            <td style={{ minWidth: '100px', fontSize: '12px', height: '21px', whiteSpace: 'nowrap', padding: '0px 10px',
            //  borderRight: '1px solid #fff',
             maxWidth: '400px',  overflowX: 'auto', width: '200px',
             color: 'inherit', position: 'relative', borderBottom: '1px solid #fff'
            }}
            key={ind} align="center" ><GetRowsComparator row={row}/>  </td>
            
            ))} 
             </tr> );
             
                })}
             </TableBody>

          </Table>
        </TableContainer> 

      </Paper>
  <Box sx={inOrdersBoxStyle}>
  <Box sx={{display: 'flex', '@media (max-width:768px)': {display: 'block', textAlign: 'center',},
                             '@media (min-width:768px) and (max-width:898px)': { marginTop: '17px', marginLeft: '10px' },
                              '@media (min-width:899px)': {marginLeft: '20px',}}}>
  <Typography sx={{fontSize: '14px', '@media (max-width:768px)': {
    display: 'block', textAlign: 'center',

  },}}> {`Записів від ${startRows+1} до ${(startRows+1+rowsPerPage)>tableLength?tableLength:startRows+1+rowsPerPage} 
            з ${tableLength} записів`}</Typography> 
            <Typography sx={{'@media (max-width:768px)': { display: 'block', textAlign: 'center',marginLeft: '0px'}, fontSize: '14px', marginLeft: '10px' }}>{`Вибрано:
             ${selected[0]?selected.length: 0}`}</Typography>
  </Box>
{/* <CustomTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/> */}

<MyTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/>
</Box>
    <ComentModalMenu/>
    </Box>
  );
}
