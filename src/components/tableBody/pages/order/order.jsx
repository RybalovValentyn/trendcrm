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
import { ComentModalMenu } from './createRow/comentmodal';

export  function Order() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);
  const allOrders = useSelector((state) => state.ordersAll.columns);
  const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
  const isOpenCreator = useSelector((state) => state.ordersAll.modalControl.openCreator);
  // const getColumnToUpdate = useSelector((state) => state.ordersAll.rowsToUpdate);
  let arrayRows = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [coment, setComent] = useState(null);


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
    const newSelected = bodyTableRows.map((n,ind) => ind);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
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
  

    // const handleClick = (e, index, name) => {      
    //   if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
    //     dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));
    //     return setComent(name);
    //   }
    //       if (e.detail === 2) {
    //       handleDoubleClick(e, index, name)
    //   }
    
      // const selectedIndex = selected.indexOf(name);

      
      // let newSelected = [];  
      // if (selectedIndex === -1) {
      //   newSelected = newSelected.concat(selected, name);
      // }
      
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

  
 const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
 const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };
  
const handleDoubleClick=(event, index, name)=>{

for (const key in name) {
  if (Object.hasOwnProperty.call(name, key)) {
    const element = name[key];
    console.log(key, element);
if (element) {
  switch (key) {
    case 'client':
            dispatch(getFormTable({id: 'fio', str: element}));
            break;
     case 'fio':
           dispatch(getFormTable({id: 'fio', str: element}));
         break;
    case 'client_phone':
          dispatch(getFormTable({id: 'client_phone', str: element}));
         break;
    case 'email':
        dispatch(getFormTable({id: 'email', str: element}));
        break;
    case 'ig_username':
        dispatch(getFormTable({id: 'ig_username', str: element}));
        break;
    case 'comment':
        dispatch(getFormTable({id: 'comment', str: element}));
          break;
    case 'additional_field':
        dispatch(getFormTable({id: 'additional_field', str: element}));
          break;
        
          default:
            break;
        }
}
    
  }

}












  dispatch(getOpenTableCreate({id: 'openCreator', str: !isOpenCreator}))

  // dispatch(getClouseTableCreate())
  console.log('event.target.id',event.target.id, 'name', name );
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
  let idRows = columns.find(n=>n.id === id)
 
    if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
      dispatch(autoUpdate({id: 'rowsToUpdate', str: idRows}))
        dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));       
 
      };
   if (e.detail === 2) {
       handleDoubleClick(e, index, idRows)
      }
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
            <EnhancedTableHead   props ={bodyTableRows}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          rowCount={bodyTableRows?.length}/>

        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor}} >
              {stableSort(bodyTableRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index, arr) => {
                  // console.log(rows);
                  return (
                    <TableRow 
                    onClick={(e)=>handleClick(e, index, arr[index])}
                    tabIndex={-1}
                    key={index}
                    sx={{
                      '&:focus': {backgroundColor: '#B0C4FF', color: '#fff'},
                      backgroundColor: selected.includes(index)?'#B0C4FF':hexToRgbA(rows[0]?.color),
                      color: selected.includes(index)?'#fff':'#000',
                      cursor: 'pointer',
                      border: '1px solid #fff'
                  
                    }}
                  >
            {rows.map((row,ind) => (
              
            <TableCell sx={{ minWidth: '100px', fontSize: '12px', height: '21px', whiteSpace: 'nowrap', padding: '0px 10px',
            //  borderRight: '1px solid #fff',
             maxWidth: '400px',  overflowX: 'auto', width: '200px',
             color: 'inherit', position: 'relative', borderBottom: '1px solid #fff'
            }}
            key={ind} align="center" ><GetRowsComparator row={row}/>  </TableCell>
            
            ))} 
             </TableRow> );
             
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
