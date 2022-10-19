import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {dataParse} from './dataParse';
import TableRow from '@mui/material/TableRow';
import {Paper,TableSortLabel, Stack, Tab, Checkbox, 
    TablePagination, FormControlLabel, Switch} from '@mui/material';
// import {TableIn} from './tableInBody';
// import {mainTableHead} from './tableInBody';
import {rows} from './tRow';
import {useState, useEffect} from 'react';
import { visuallyHidden } from '@mui/utils';
import {HeaderTable} from './tHead';
import {tableParse} from './tableParse';
import {translater} from './translate';

const tableHead = dataParse.orders_status_count
const tableHeaderWidth = 100;
const rowWidth = 150;
const rowBgColor = "#afffff";
let TableHeadFromResponse = [];




function handleClickOnChip(e) {
  

}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


function EnhancedTableHead(props) {
  const [tHead, setTHead] = useState([]);
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

  return (
    
    <TableHead >
      <TableRow  > 
        {tableHead.map((tableHead) => (       
          <TableCell colSpan={1} key={tableHead.id} align= 'center' padding= 'none'           
            sx={{ minWidth: 'min-content', whiteSpace: 'nowrap',paddingBottom: '2px', outline: 0 }}>
        <Tab    onClick={handleClickOnChip}        
            label={tableHead.name }  key={tableHead.name} align= 'center' padding= 'none'           
           sx={{ minWidth: 'min-content', whiteSpace: 'nowrap', paddingLeft: 3, paddingRight: 3,}}/>    
          </TableCell>
        ))}
      </TableRow>
      <TableRow colSpan={1}  >
        {tableHead.map((tableHead) => (
          <TableCell key={tableHead.name} align="center"           
            sx={{ minWidth: 'min-content', backgroundColor: tableHead.style, maxHeight:'3px', padding: '2px'}}>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        
        {tHead.map((HeaderTable) => (
          <TableCell colSpan={1}
            key={HeaderTable.id}
            sx={{ minWidth: 'min-content', whiteSpace: 'nowrap',paddingLeft: 3, paddingRight: 3}}
            >
              
            <TableSortLabel
              active={orderBy === HeaderTable.id}
              direction={orderBy === HeaderTable.id ? order : 'asc'}
              onClick={createSortHandler(HeaderTable.id)}
            >
              {HeaderTable.label}
              {orderBy === HeaderTable.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>

    </TableHead>
  );
}


export  function Order() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsTable, useRowsTable] = useState([])

    useEffect(() => {
      GetRenderRows(TableHeadFromResponse, tableParse.data)
 
  }, []);

  let arrayRows = []
 const GetRenderRows =(TableHeadFromResponse, tableParse) =>{ 
  console.log(TableHeadFromResponse);     
     const arrayRow = tableParse.map((str, ind) =>{
      let result = []
       const rowSpan = TableHeadFromResponse.reduce((acc,val, ind) =>{
        // console.log(val);
           return result.push(
            str[val.id]
               )         

        },[])
        arrayRows.push(result)
        return result.push(rowSpan)        
      })    
      // console.log(arrayRows.length);
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
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsTable.length) : 0;

return (
    <Box sx={{ width: '100%', }}>        
      <Paper  sx={{ width: '100%', mb: 2 ,}}>
         <TableContainer >
          <Table stickyHeader
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead 
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rowsTable.length}/>
            <TableBody>
              {stableSort(rowsTable, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row);
                  const isItemSelected = isSelected(row.index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >

{row.map((row,ind) => (
          <TableCell key={ind} align="left"           

            >
              {row}
          </TableCell>
))}
                      {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell> */}
                      
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
         sx={{ maxWidth: '400px',}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
