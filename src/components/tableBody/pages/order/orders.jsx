import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import {dataParse} from './dataParse';
import TableRow from '@mui/material/TableRow';
import {Paper,TableSortLabel, Stack, Tab, Checkbox,Divider, 
    TablePagination, FormControlLabel, Switch, Hidden} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef} from 'react';
// import {HeaderTable} from './tHead';
// import {tableParse} from './tableParse';
// import {translater} from './translate';
import {ScrollTabsButton} from './tableInBody';
import {useNavigate} from 'react-router-dom';
import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import {getRowsAfterAdd, getAllOrders, getAllStatuses, getSitysFromNp} from '../../../../redux/asyncThunc';
import {HeaderContainer} from './header';
import {GetRowsComparator} from './getRowsComparator';
import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn,
   getOpenTableCreate, autoUpdate, getFormTable} from '../../../../redux/ordersReduser';
import {EnhancedTableHead} from './enhancedTableHead';
import { Preloader } from '../../../preloader/preloader';
import { ComentModalMenu } from '../modals/comentmodal';
import { flushSync } from 'react-dom';

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
  // const getColumnToUpdate = useSelector((state) => state.ordersAll.rowsToUpdate);
  let arrayRows = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
if (!allOrders[0]) {
  dispatch(getAllOrders());
}
  
        
}, []);

useEffect(() => {
  
  if (isGrabAll) {
    console.log('Выбрать все', bodyTableRows);
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

    
const handleSelect = (id) =>{
 
    setSelected(id);
  

    
  
  // else if (selectedIndex === 0) {
  //   newSelected = newSelected.concat(selected.slice(1));
  // } else if (selectedIndex === selected.length - 1) {
  //   newSelected = newSelected.concat(selected.slice(0, -1));
  // } else if (selectedIndex > 0) {
  //   newSelected = newSelected.concat(
  //     selected.slice(0, selectedIndex),
  //     selected.slice(selectedIndex + 1),
  //   );
  // }

  // setSelected(newSelected);
}

  
 const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
 const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };
  


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
  let idRows = columns.find(n=>n.id === id)
  handleSelect(id)
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

    <Box sx={{flexGrow: 1, paddingTop: '47px', maxWidth: '100%',overflowX: 'hidden', overflowY: 'hidden',
               maxHeight: '100%', height: '100%',
               backgroundColor: colorsRef.boxTableColor, paddingBottom: '10px'}} >    
 {/* HEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHT */} 
   < HeaderContainer/>

      <Paper sx={{position: "relative", width: '98%', 
                   height: 'calc(90% - 20px)', marginLeft: 'auto', 
                  marginRight: 'auto',overflowY: 'hidden',
                   boxShadow: '0px -2px 20px -10px rgb(0 0 0 / 50%)'}}>
      <ScrollTabsButton/> 
{/* HEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHT */}
         <TableContainer sx={{ width: '100%', maxHeight: 'calc(95% - 70px)',  backgroundColor: '#fff', minHeight: '100px',
                           paddingBottom: '10px', overflowY: 'scroll',overflowX: 'scroll', }} >
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
              {stableSort(bodyTableRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index, arr) => {
                  return (
                    <tr 
                    onClick={(e)=>handleClick(e, index, arr[index])}
                    tabIndex={-1}
                    key={index}
                    
                    // selected={selected.indexOf(rows[0].value) !== -1}
                     style={{

                      // '&:focus': {backgroundColor: '#B0C4FF', color: '#fff'},

                      backgroundColor: selected.includes(rows[0].value)?'#B0C4FF':hexToRgbA(rows[0]?.color),
                      color: selected.includes(rows[0].value)?'#fff':'#000', 
                      cursor: 'pointer',
                      border: '1px solid #fff'
                  
                    }}
                  >
            {rows.map((row,ind) => (
              
            <td sx={{ minWidth: '100px', fontSize: '12px', height: '21px', whiteSpace: 'nowrap', padding: '0px 10px',
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
        <TablePagination
        
         sx={{ maxWidth: '450px', height: '50px', maxHeight: '50px', 
              overflowY: 'hidden', marginTop: 'auto', marginBottom: 'auto'}}
          rowsPerPageOptions={[50, 100, 250, 500]}
          component="div"
          count={columns.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    <ComentModalMenu/>
    </Box>
  );
}
