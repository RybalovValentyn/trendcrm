import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { display, height, width } from '@mui/system';
import { useDispatch, useSelector,  } from 'react-redux';
import {getOpenTableCreate} from '../../../../../redux/ordersReduser';
import { colorsRef } from '../../../../../consts/colorConstants';
import { Paper, Typography } from '@mui/material';
import {StyledSelect} from './select';
import {MultiInput} from './textField';
import {styled } from '@mui/material/styles';

import { useState } from 'react';
export function CreateRows(){
    const dispatch = useDispatch();

    // const isOpen = useSelector((state) => state.ordersAll.openCreator);

    const isOpen = true;



let positionTop = '-100%';
let positionLeft = '11px';
let index = -1;
let boxHeight = 0;

if (isOpen) {
    index = 3;
    positionTop = '100%';
    boxHeight = '85vh';
}
    const boxStyle ={
        width: '99%',
        height: boxHeight,
        display: 'block', 
        backgroundColor: '#fff',
        position: 'absolute',
        top: positionTop,
        left:positionLeft,
        zIndex: index,
        padding: '20px',

    }
    const typographyStyle={fontSize: '16px',
     padding: '2px',     
     borderBottom: `1px solid ${colorsRef.createBorderColorOFAll}`,
     textTransform: 'uppercase',
    }
    const StyledList = styled('li')(
        ({ theme }) => `
        width: 100%
        color: ${colorsRef.labelTextColor}
        padding: 0
      `,
      );

return(
    <Box  sx={boxStyle}>
        <Paper component="form" sx={{ width: '35%',boxShadow: 'none' }}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         КЛІЄНТ:
        </Typography >
<List>
    <StyledList>
    <MultiInput label='ПІБ:' name='client' type='text'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Телефон:' name='client_phone' type='text'/>
    </StyledList>

    <StyledList>
    <MultiInput label='E-mail:' name='client_mail' type='e-mail' />
    </StyledList>

    <StyledList>
    <MultiInput label='Instagram:' name='instagram' type='text' />
    </StyledList>

    <StyledList>
    <MultiInput label='Коментарій:' name='comment' type='textarea' />
    </StyledList>
    
    <StyledList>
    <MultiInput label='Доп. поле:' name='client_comment' type='textarea' />
    </StyledList>

</List>
        </Paper>

        <Paper component="form" sx={{ width: '35%',boxShadow: 'none' }}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         Доставка:
        </Typography >
<List>
    <StyledList>
    <MultiInput label='Доставка:' name='delivery_type' type='select'/>
    </StyledList>
    
    <StyledList>
    <MultiInput label='Спосіб оплати:' name='payment_type' type='select'/>
    </StyledList>
 
    <StyledList>
    <MultiInput label='Cума наложеного платежу:' name='backward_delivery_summ' type='num'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Дата відправки:' name='datetime_sentm' type='data'/>
    </StyledList>
    {/* <StyledList>
    <MultiInput label='Телефон:' name='client_phone' type='text'/>
    </StyledList>

    <StyledList>
    <MultiInput label='E-mail:' name='client_mail' type='e-mail' />
    </StyledList>

    <StyledList>
    <MultiInput label='Instagram:' name='instagram' type='text' />
    </StyledList>

    <StyledList>
    <MultiInput label='Коментарій:' name='comment' type='textarea' />
    </StyledList>
    
    <StyledList>
    <MultiInput label='Доп. поле:' name='client_comment' type='textarea' />
    </StyledList> */}

</List>
        </Paper>

    </Box>
)

}