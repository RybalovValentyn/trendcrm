import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function getRowsComparator(value, id) {
console.log(value, id);

if (id ==='client_phone') {
    if (value) {
        return (<Chip label={value} size="small" variant="outlined" />)
    } 
}
return(
    value
)

}




// 'client_phone'