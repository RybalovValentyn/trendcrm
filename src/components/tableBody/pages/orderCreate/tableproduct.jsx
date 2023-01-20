import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Товар№1', 159, 6.0, 24, 4.0, '0', 96, 'www'),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableProduct() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '2%'}}>ID</TableCell>
            <TableCell sx={{width: '33%'}} align="center">Назва</TableCell>
            <TableCell sx={{width: '25%'}} align="center">Атрибути</TableCell>
            <TableCell sx={{width: '5%'}} align="center">Ціна</TableCell>
            <TableCell sx={{width: '5%'}} align="center">Кількість</TableCell>
            <TableCell sx={{width: '10%'}} align="center">Скидка</TableCell>
            <TableCell sx={{width: '10%'}} align="center">Всього</TableCell>
            <TableCell sx={{width: '10%'}} align="center">Постачальник</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}