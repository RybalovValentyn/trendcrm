import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {Paper, Typography} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef, Profiler, lazy, useMemo,Suspense} from 'react';
import {useNavigate, useSearchParams, useLocation, createSearchParams} from 'react-router-dom';
import { colorsRef } from '../../../../consts/colorConstants';
import {getRowsAfterAdd, getAllOrders, getAllStatuses, getSitysFromNp, getFilteredOrders, loginThunk} from '../../../../redux/asyncThunc';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle, tableBoxStyle,
         paperTableStyle, tableContainerStyle, inOrdersBoxStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn,
   getOpenTableCreate, autoUpdate, getFormTable, getClouseTableCreate} from '../../../../redux/ordersReduser';
import { Preloader } from '../../../preloader/preloader';
import { TableRows } from './tableRows';
import { hexToRgbA } from "./functionOrder";
import { getLoading } from '../../../../redux/funcReduser';
import NewPostTtnCreate from '../modals/modalcomponent/newpostttncreate';
import { CustomSnackBar } from '../../../alerts/snackbar';


const ExportExcelComponent= lazy(() => import("../modals/modalcomponent/exportExel.jsx"));
const ComentModalMenu = lazy(() => import("../modals/modalcomponent/comentmodal.jsx"));
const EnhancedTableHead = lazy(() => import("./enhancedTableHead.jsx"));
const ScrollTabsButton = lazy(() => import("./tableInBody.jsx"));
const HeaderContainer = lazy(() => import("./header.jsx"));
const MyTablePagination = lazy(() => import("./myPagination.jsx"));
const SmsSend = lazy(()=> import('../modals/smsSend.jsx'));
const JustinCreate = lazy(()=>import('../modals/modalcomponent/justincreate.jsx'));
const PrepayUpdate = lazy(()=>import('../modals/modalcomponent/prepayupdate.jsx'));
const StatusUpdate = lazy(()=>import('../modals/modalcomponent/statusupdate.jsx'));
const DateSendUpdate= lazy(()=>import('../modals/modalcomponent/datesendUpdate.jsx'));
export  function Order() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);

  const bodyTableSearchRows = useSelector((state) => state.ordersAll.bodyTableSearchRows);

  const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
  const idRows = useSelector((state) => state.ordersAll.createRows?.id);
  const tableLength = useSelector((state) => state.ordersAll.tableLength);
  const startRows = useSelector((state) => state.ordersAll.start);
  const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
  const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const [searchParams, setSearchParams] = useSearchParams();
  // const statusName = searchParams.get('status');
  const selectedRows = useSelector((state) => state.function.selectedRow);
    const [order, setOrder] = useState('asc');
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }
    const page = useSelector((state) => state.ordersAll.page);
    const rowsPerPage = useSelector((state) => state.ordersAll.rowsPerPage);
    const rowRef = useRef(null);
    let countSelected = 0;
const seachStatus = useSelector((state) => state.ordersAll.statusName);

  //  useEffect(()=>{
  //   // console.log(seachStatus);
  //   //    if (Number(seachStatus)) {
        
  //   //     console.log('filter status_name');
  //   //  setSearchParams(createSearchParams({ status: seachStatus }));
  //   //   dispatch(autoUpdate({id:'statusName', str: seachStatus}));
  //   //   // getUpdate();      
  //   //   }
  //   //    else

  //       if (!seachStatus && !idRows && location.pathname !== '/trendcrm/orders') {
  //       console.log('orders');
  //       dispatch(autoUpdate({id:'statusName', str: null}));
  //       navigate('/trendcrm/orders')
  //       getUpdate()
  //     } else if(Number(idRows) && isUpdateRows){      
  //       console.log('Number(idRows) && isUpdateRows', idRows);
  //       navigate(`/trendcrm/order/:${idRows}`);        
  //     } else if (location.pathname === '/trendcrm/orders') {
  //       console.log(location.pathname, Number(idRows), Number(seachStatus));       
  //       if (Number(seachStatus) || Number(idRows) !== 0) {
  //         console.log(Number(idRows) !== 0);
  //         // dispatch(autoUpdate({id:'statusName', str: null}));
  //         getUpdate();
  //       }
        
  //     }  

  // },[seachStatus, idRows])  
  

  useEffect(() => {
    // dispatch(getAllStatuses());
dispatch(getLoading(false))
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}   
// getUpdate() 
}, []);

const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
  // removeAllColor()
}



useEffect(() => {
  let prevSelected =[]
  if (sessionStorage.getItem("selected")?.split(',').length > 1) {
    prevSelected = sessionStorage.getItem("selected")?.split(',');
  } else return
 
if (isGrabAll) {    
  prevSelected.map(str=>{
    if (str) {
      addColor(String(str))
    }
  }) 
  countUpdate()  
}else if (!isGrabAll) {
  removeAllColor()
sessionStorage.setItem("selected", '');
};
countUpdate()  
  }, [isGrabAll]);

const removeAllColor = ()=>{
if (columns.length > 0) {
  const newSelected = columns.flatMap(n => n.id);
  newSelected.map(str=>{
    if (str) {
      removeColor(str)
    }
})
}
}


const addColor =(id)=>{  
  const element = document.getElementById(`${id}+rows`);
  element.style.backgroundColor = '#B0C4FF'
}
const removeColor=(id)=>{ 
  let rows = columns.find(col=>col.id === id)
  let color = '';
  if (rows?.order_return === '1' && rows?.payment_received === '0') {              
    color = "rgba(255, 0, 0, 0.5)"
    } else if (rows?.payment_received === '1') {
    color = "rgba(28, 173, 34, 0.5)"
  } else color = rows?.status_style
  const element = document.getElementById(`${id}+rows`);
 if (element) {
  element.style.backgroundColor = hexToRgbA(color)
 } else removeAllColor()
  
}

const handleSelect = (ctrlKey,shiftKey, id) =>{
let prevSelected= [];
if (sessionStorage.getItem("selected")) {
  prevSelected = sessionStorage.getItem("selected").split(',');
    if (prevSelected.length === 1 && !ctrlKey && !shiftKey) {
         removeColor(prevSelected[0])
    } else if(prevSelected.length > 1 && !ctrlKey && !shiftKey){
      prevSelected.map(str=>{if (str) { removeColor(str)}})
    }
}
  addColor(id)
  const selectedIndex = prevSelected.indexOf(id);
  let newSelected = [];
if (selectedIndex === -1 && !ctrlKey) {
  newSelected.push(id);
  }  else if (selectedIndex >= 0){
    removeColor(id)
  }
 if (ctrlKey) {
  if (selectedIndex === -1) {
    newSelected = prevSelected.concat(id)
    if (newSelected.length > 1) {
      newSelected.map(str=>{
        if (str) {
          addColor(str)
        }
      })
    }
  } else if (selectedIndex >= 0) {
    removeColor(id)
    let arr = [...prevSelected]
    arr.splice(selectedIndex,1);
    newSelected = [...arr].filter(
      (id, index, array) => array.indexOf(id) === index);
  };
};
if (shiftKey) {
  
  const lastElement = prevSelected.length-1; 
  if (lastElement >= 0) {
    console.log(prevSelected);
    let newElements=[]
    const firstElement = columns.findIndex(n=> n.id === prevSelected[lastElement])
    const lastIndexElement = columns.findIndex(n=> n.id === id);
     if (firstElement<lastIndexElement) {
       newElements = columns.slice(firstElement+1, lastIndexElement+1).map(n=>n.id)
    } else if (firstElement > lastIndexElement) {
       newElements = columns.slice(lastIndexElement, firstElement+1).map(n=>n.id)
    } else newElements = [id]
    newSelected = [...prevSelected,...newElements].filter(
      (id, index, array) => array.indexOf(id) === index);
    console.log(prevSelected);
    if (newSelected.length > 1) {
      newSelected.map(str=>{
        if (str) {
          addColor(str) 
        }
      })
    }

};}
sessionStorage.setItem("selected", newSelected);
 }; 

const handleClick = (e, index) => { 
  let id = columns[index].id
  if (id) {
    // console.log(selected.length);
    handleSelect(e.ctrlKey,e.shiftKey, id) ;
    countUpdate()    
  } 
    if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
      dispatch(autoUpdate({id: 'rowsToUpdate', str: columns[index]}))
        dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));    
 
      };
      if (isGrabAll) {
        dispatch(autoUpdate({id: 'isGrabAll', str: false}))
      }      
   if (e.detail === 2) {
       handleDoubleClick(e, index, id)
      }
  }
 const handleDoubleClick=(event, index, id)=>{
  dispatch(loginThunk({login: 'admin', password: 'admin'}))
  // sessionStorage.setItem("selected", '');
  //      dispatch(autoUpdate({id: 'isUpdateRows', str: true}));
  //   dispatch(getRowsAfterAdd(id));  
  //   navigate(`/trendcrm/order/${id}`); 
  };
const countUpdate = ()=>{  
  const element = rowRef
  if (sessionStorage.getItem("selected").length) {
    let count = sessionStorage.getItem("selected")?.split(',')?.filter((str,ind,arr)=>arr.indexOf(str) === ind).length    
    countSelected = count
    element.current.textContent = `${countSelected}`
  } else element.current.textContent = `${0}`

}

const MemoizedChildComponent = useMemo(()=>TableRows, [bodyTableRows]);

return (

    <Box sx={tableBoxStyle} > 
   < HeaderContainer/>
      <Paper sx={paperTableStyle}>
      <ScrollTabsButton/> 
         <TableContainer sx={tableContainerStyle} >

         {isLoading && <Preloader/>}

                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead 
                          rowCount={bodyTableRows?.length}/>
        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor, }}>

        {bodyTableRows.length > 0 ? bodyTableRows.map((rows, index, arr) => {
          return (<MemoizedChildComponent key={index} 
         rows ={rows} index={index} arr={arr} click={handleClick} />)
        }): 
        <tr><td colSpan={filteredRows.length?filteredRows.length:dataForHeader.length} align='center'>Нема даних</td></tr>
        }              
       

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

  },}}> {`Записів від ${startRows+1} до ${(startRows+rowsPerPage)>tableLength?tableLength:startRows+rowsPerPage} 
            з ${tableLength} записів`}</Typography> 
            <Typography  sx={{'@media (max-width:768px)': { display: 'block', textAlign: 'center',marginLeft: '0px'}, fontSize: '14px', marginLeft: '10px' }}>
              Вибрано: <span ref={rowRef}>{countSelected}</span>
             </Typography>
  </Box>
<MyTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/>
</Box>
<NewPostTtnCreate/>

    <Suspense>
    <ExportExcelComponent/>
    </Suspense> 

    <Suspense>
    <DateSendUpdate/>
    </Suspense>

    <Suspense>
    <StatusUpdate/>
    </Suspense>

    <Suspense>
    <PrepayUpdate/>
    </Suspense>

    <Suspense>
    <ComentModalMenu/>
    </Suspense>

    <Suspense>
    <SmsSend/>   
    </Suspense>

    <Suspense>
     <JustinCreate/>
    </Suspense>
    <CustomSnackBar/>
    </Box>
  );
}
