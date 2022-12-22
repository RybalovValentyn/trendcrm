import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {Paper, Typography} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef, Profiler, lazy, useMemo} from 'react';
import {useNavigate, useSearchParams, useLocation, createSearchParams} from 'react-router-dom';
import { colorsRef } from '../../../../consts/colorConstants';
import {getRowsAfterAdd, getAllOrders, getAllStatuses, getSitysFromNp, getFilteredOrders} from '../../../../redux/asyncThunc';
import {GetRowsComparator} from './getRowsComparator';
// import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle, tableBoxStyle,
         paperTableStyle, tableContainerStyle, inOrdersBoxStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn,
   getOpenTableCreate, autoUpdate, getFormTable, getClouseTableCreate} from '../../../../redux/ordersReduser';
import { Preloader } from '../../../preloader/preloader';

const ComentModalMenu = lazy(() => import("../modals/comentmodal.jsx"));
const EnhancedTableHead = lazy(() => import("./enhancedTableHead.jsx"));
const ScrollTabsButton = lazy(() => import("./tableInBody.jsx"));
const HeaderContainer = lazy(() => import("./header.jsx"));
const MyTablePagination = lazy(() => import("./myPagination.jsx"));

export  function Order() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);

  const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
  const idRows = useSelector((state) => state.ordersAll.createRows?.id);
  const tableLength = useSelector((state) => state.ordersAll.tableLength);
  const startRows = useSelector((state) => state.ordersAll.start);
  const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
  const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
const [searchParams, setSearchParams] = useSearchParams();
const statusName = searchParams.get('status');
const selectedRows = useSelector((state) => state.ordersAll.selectedRows);


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
 
    const page = useSelector((state) => state.ordersAll.page);
    const rowsPerPage = useSelector((state) => state.ordersAll.rowsPerPage);

   useEffect(()=>{
    console.log(statusName);
       if (Number(statusName)) {
        // console.log('filter status_name');
      dispatch(autoUpdate({id:'statusName', str: statusName}));
      getUpdate();      
      } else if (!statusName && !idRows) {
        // console.log('orders');
        dispatch(autoUpdate({id:'statusName', str: null}));
        navigate('/trendcrm/orders')
        getUpdate()
      } else if(Number(idRows) && isUpdateRows){      
        // console.log('Number(idRows) && isUpdateRows', idRows);
        navigate(`/trendcrm/order/:${idRows}`);        
      } else if (location.pathname === '/trendcrm/orders') {
        console.log(location.pathname);
        dispatch(autoUpdate({id:'statusName', str: null}));
        getUpdate();
      }
   

  },[statusName, idRows])  

  useEffect(() => {
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
// if (!allOrders[0]) {
//   getUpdate()
// }
  
        
}, []);

const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}



useEffect(() => {
if (columns.length > 0 && dataForHeader.length > 0 && filteredColumn.length === 0) {
  console.log('update rows');
 dispatch(bodyTableRowsUpdate([...arrayRows]))
} else if (columns.length > 0 && filteredColumn.length > 0 ) {
  console.log(arrayFilteredRows, filteredColumn.length);
 dispatch(bodyTableRowsUpdate([...arrayFilteredRows]))
}

}, [columns]);


const arrayFilteredRows = useMemo(() => columns.map((str, ind) =>{
  return (filteredColumn.reduce((acc,val, ind) =>{    
    acc.push({id:val.data, value: str[val.data], color: str.status_style })         
    return [...acc]   
  },[]))

}),[filteredColumn, columns]
);


const arrayRows = useMemo(() => columns.map((str, ind) =>{
        return (dataForHeader.reduce((acc,val, ind) =>{
          acc.push({id:val.id, value: str[val.id], color: str.status_style })         
          return [...acc]   
        },[]))


    }),[dataForHeader, columns]
);


const handleSelect = (e, id) =>{
  if (isGrabAll === true){
  dispatch(autoUpdate({id: 'isGrabAll', str: false}))} 
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];
if (selectedIndex === -1 && !e.ctrlKey) {
  newSelected.push(id);
  }  
 if (e.ctrlKey) {
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedRows, id)
  } else if (selectedIndex >= 0) {
    let arr = [...selectedRows]
    arr.splice(selectedIndex,1);
    newSelected = [...arr]
  }  
}
// console.log(selectedRows);
dispatch(autoUpdate({id: 'selectedRows', str: newSelected}))

 } 

const  hexToRgbA = (hex) =>{
  // console.log(hex);
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
       handleDoubleClick(e, index, idRows)
      }
  }
 const handleDoubleClick=(event, index, name)=>{

    let id = name.id;
    dispatch(autoUpdate({id: 'isUpdateRows', str: true}));
    if (Number(statusName)){
      dispatch(autoUpdate({id:'statusName', str: null}));
      setSearchParams('');
    } 
    dispatch(getRowsAfterAdd(id));   

  };

const rowsForRender = useMemo(
  () => bodyTableRows,
  [bodyTableRows]
);
return (

    <Box sx={tableBoxStyle} >    
   < HeaderContainer/>

      <Paper sx={paperTableStyle}>
      <ScrollTabsButton/> 
         <TableContainer sx={tableContainerStyle} >
         {/* {isLoading && <Preloader/>} */}
                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead 
                          rowCount={rowsForRender?.length}/>
    {/* <Profiler id="Navigation" onRender={callback}> */}
   
        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor, }}
        >
              {rowsForRender.map((rows, index, arr) => {
                   return (
                    <tr 
                    onClick={(e)=>handleClick(e, index, arr[index])}
                    tabIndex={-1}
                    key={index}
                    id={index}
                     style={{
                      // '&:focus': {backgroundColor: '#fff', color: '#fff'},
                           backgroundColor: selectedRows.indexOf(rows[0].value) !== -1?'#B0C4FF':hexToRgbA(rows[0]?.color),
                      color: selectedRows.indexOf(rows[0].value) !== -1?'#fff':'#000', 
                      cursor: 'pointer',
                      border: '1px solid #fff'
                  
                    }}
                  >
            {rows.map((row,ind) => (
              
            <td style={{ minWidth: '100px', fontSize: '12px', height: '21px', whiteSpace: 'nowrap', padding: '0px 10px',

             maxWidth: '400px',  overflowX: 'auto', width: '200px',
             color: 'inherit', position: 'relative', borderBottom: '1px solid #fff'
            }}
            key={ind} align="center" >
              <GetRowsComparator row={row}/> 
              {/* {row.value} */}
               </td>
            
            ))} 
             </tr> );
             
                })}
             </TableBody>
             {/* </Profiler> */}
          </Table>
        </TableContainer> 

      </Paper>
  <Box sx={inOrdersBoxStyle}>
  <Box sx={{display: 'flex', '@media (max-width:768px)': {display: 'block', textAlign: 'center',},
                             '@media (min-width:768px) and (max-width:898px)': { marginTop: '17px', marginLeft: '10px' },
                              '@media (min-width:899px)': {marginLeft: '20px',}}}>
  <Typography sx={{fontSize: '14px', '@media (max-width:768px)': {
    display: 'block', textAlign: 'center',

  },}}> {`Записів від ${startRows+1} до ${(startRows+rowsPerPage)>tableLength?tableLength:startRows+rowsPerPage} 
            з ${tableLength} записів`}</Typography> 
            <Typography sx={{'@media (max-width:768px)': { display: 'block', textAlign: 'center',marginLeft: '0px'}, fontSize: '14px', marginLeft: '10px' }}>{`Вибрано:
             ${selectedRows[0]?selectedRows.length: 0}`}</Typography>
  </Box>
{/* <CustomTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/> */}

<MyTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/>
</Box>
    <ComentModalMenu/>
    </Box>
  );
}
