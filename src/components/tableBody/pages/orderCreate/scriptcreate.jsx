import {Paper,Typography, List } from '@mui/material';
// import { StyledList } from "./styles"
import { useDispatch, useSelector,  } from 'react-redux';
import { typographyStyle } from '../order/forms/styles';
import { formStyle } from '../order/forms/styles';
// import { boxStyle } from './styles';
// import {Label } from './styles';
// import { setClientForm } from '../../../../../redux/ordersReduser';
import {Box, } from '@mui/material';
import TableProduct from './tableproduct';
// import { colorsRef } from '../../../../../consts/colorConstants';


const  ScriptCreateComponent=()=>{



    return(
        <Paper component="form" sx={formStyle}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         СКРИПТ:
        </Typography >

        </Paper>
    )
}

export default ScriptCreateComponent