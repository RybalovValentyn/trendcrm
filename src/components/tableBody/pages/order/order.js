import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {dataParse} from './dataParse';
import TableRow from '@mui/material/TableRow';
import {Paper,TableSortLabel, Stack, Tab, Checkbox,Divider, 
    TablePagination, FormControlLabel, Switch, Hidden} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import { visuallyHidden } from '@mui/utils';
import {HeaderTable} from './tHead';
import {tableParse} from './tableParse';
import {translater} from './translate';
import {ScrollTabsButton} from './tableInBody';
import {SearchInput} from './tableInBody';
import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import {currentThunk} from '../../../../redux/asyncThunc';
import {HeaderContainer} from './header';
import {getRowsComparator} from './getRowsComparator';
import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle} from './styles';
import {getWidthUpdate, setWidthColumn} from '../../../../redux/ordersReduser';
import {replaceRows} from './tHead';

const tableHead = dataParse.orders_status_count

let TableHeadFromResponse = [];


function EnhancedTableHead({props}) {
  const [tHead, setTHead] = useState([]);
  const widthOfColumn = useSelector((state) => state.ordersAll.widthOfColumn);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshTHead( [...tableParse.data] , translater )  
 
  }, []);

 const refreshTHead = (tableData, translater)=>{

 const keysOfData = tableData.reduce((acc, str, ind, arr) =>{   
  return [...Object.keys(str)]
},[]);



let arrayOfdata = [] ;  

keysOfData.reduce((acc, str,ind) => { 
    if (Object.keys(translater).includes(str) && Object.values(translater)[ind] !== null
    && Number.isNaN(Number(Object.values(translater)[ind]))
    ){
      // console.log(str);
      return arrayOfdata.push({id: str, label: Object.values(translater)[ind],
        numeric: false, disablePadding: true })
       }
   }, []); 
   setTHead([...tHead,...arrayOfdata])
   TableHeadFromResponse = [...arrayOfdata];
 }  

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =  props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

const [width, setWidth] = useState(120);

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





  return (    
    <TableHead sx={{backgroundColor: colorsRef.formBgColor, position: '-webkit-sticky', position: 'sticky', top: '0', zIndex: 2}} >    

      <TableRow sx={rowPosition}>       

        {tHead.map((HeaderTable) => (          
          <TableCell onMouseDown={(e) =>replaceRows(e)}  onMouseUp={getWidthColumnUpdate} colSpan={1}
            key={HeaderTable.id}
            id={HeaderTable.id}
            sx={tHeadStyle} 
            align= "center"        
            >  
            <div  id={HeaderTable.id} style={{resize: 'horizontal', overflow: 'hidden',
             maxWidth: '600px', padding: '3px 10px', alignItems: 'center', minWidth: width, position: 'relative',
          }} key={HeaderTable.id}>

            <TableSortLabel            
              active={orderBy === HeaderTable.id}
              direction={orderBy === HeaderTable.id ? order : 'asc'}
              // onClick={createSortHandler(HeaderTable.id)}
            >
              {HeaderTable.label}
              {orderBy === HeaderTable.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
             
            </TableSortLabel>
            <Divider  id={HeaderTable.id} sx={dividerStyle} orientation="vertical" flexItem />
            </div>
          </TableCell>  ))}
      </TableRow >

      <TableRow sx={rowPosition}  >
          {tHead.map((call) =>(
          <TableCell
          key={call.id}
          align='center'
          sx={{ whiteSpace: 'nowrap', backgroundColor: tableHead.style, padding: '5px 0px'}}
          >
             <SearchInput props={'wwwwwww'} options={props}/>             
          </TableCell>
          ))}
      </TableRow>
          </TableHead>
    
  );
}


export  function Order() {
  const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [rowsTable, useRowsTable] = useState([])

    useEffect(() => {
      GetRenderRows(TableHeadFromResponse, tableParse.data)
 
  }, []);

  let arrayRows = []
 const GetRenderRows =(TableHeadFromResponse, tableParse) =>{ 
  // console.log(TableHeadFromResponse);     
     const arrayRow = tableParse.map((str, ind) =>{
      let result = []
       const rowSpan = TableHeadFromResponse.reduce((acc,val, ind) =>{
           return result.push({id:val.id, value: str[val.id]}
              
               )         

        },[])
        arrayRows.push(result)
        return result.push(rowSpan)        
      })    
      // console.log(arrayRows);
      useRowsTable([...rowsTable,...arrayRows ])
    }
   
// console.log(rowsTable);
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rowsTable.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      backgroundColor: colorsRef.tableRowBgFirstColor,
      '&:nth-of-type(odd)': {
        backgroundColor: colorsRef.tableRowSecondColor,
        
      }

    }));

return (
    <Box 
        sx={{height: '100%', width: '100%', backgroundColor: colorsRef.boxTableColor, paddingBottom: '20px 0px'}}
    >     
   < HeaderContainer/>

      <Paper sx={{position: "relative", width: '98%', marginLeft: 'auto', marginRight: 'auto',overflowY: 'auto',
        boxShadow: '0px -2px 20px -10px rgb(0 0 0 / 50%)'
    }}>

      <ScrollTabsButton  item={tableHead } /> 

         <TableContainer 
          sx={{ width: '100%', height: '700px',  backgroundColor: '#fff', paddingBottom: '80px', overflowY: 'scroll',overflowX: 'scroll',
        }} 
           >
                <Table 
            sx={{ minWidth: 550}}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead   props ={rowsTable}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rowsTable.length}/>

        {/* <TableBody sx={{backgroundColor: colorsRef.tabsBgColor}}>
              {stableSort(rowsTable, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => {
                  // console.log(rows);
                  const isItemSelected = isSelected(rows.index);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow 
                    hover
                    onClick={(event) => handleClick(event, rows.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`${rows.id}+${index}`}
                    selected={isItemSelected}
                  >
            {rows.map((row,ind) => (
              
            <TableCell  sx={{ minWidth: '100px', whiteSpace: 'nowrap', padding: '10px 10px',borderRight: '1px solid #fff',
                      maxWidth: '400px',  overflowX: 'auto', width: '200px'
                      }}
            key={row.id+ind+rows.name} align="center" >{getRowsComparator(row.value, row.id)} </TableCell>
            
            ))} 
             </StyledTableRow> );
             
                })}
             </TableBody> */}

          </Table>

        </TableContainer>
  
        <TablePagination
         sx={{ maxWidth: '450px'}}
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rowsTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>

    </Box>
  );
}
