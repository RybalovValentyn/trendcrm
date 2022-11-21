import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { display, height, width } from '@mui/system';
import { useDispatch, useSelector,  } from 'react-redux';
import {getOpenTableCreate} from '../../../../../redux/ordersReduser';
import { colorsRef } from '../../../../../consts/colorConstants';
import { Paper, Typography } from '@mui/material';
import {MultiInput} from './multiInputs';
import {styled } from '@mui/material/styles';
import { useState } from 'react';
import { SaveButton } from '../../../../buttons/saveButton';


export function CreateRows(){
    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.ordersAll.modalControl.openCreator);

    // const isOpen = true;



let positionTop = '-100%';
let positionLeft = '11px';
let index = -1;
let boxHeight = 0;

if (isOpen) {
     index = 3;
    positionTop = '100%';
    boxHeight = '160vh';

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
        overflow: 'hidden',

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
const isPay = useSelector((state) => state.ordersAll.createRows.payment_name.id)
const deliveryType = useSelector((state) => state.ordersAll.createRows.delivery_service_type);
return(
    <Box  sx={boxStyle}>

        <Paper component="form" sx={{ width: '35%',boxShadow: 'none' }}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         КЛІЄНТ:
        </Typography >
<List>
    <StyledList>
    <MultiInput label='ПІБ:' name='fio' type='text'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Телефон:' name='client_phone' type='text'/>
    </StyledList>

    <StyledList>
    <MultiInput label='E-mail:' name='email' type='e-mail' />
    </StyledList>

    <StyledList>
    <MultiInput label='Instagram:' name='ig_username' type='text' />
    </StyledList>

    <StyledList>
    <MultiInput label='Коментарій:' name='client_comment' type='textarea' />
    </StyledList>
    
    <StyledList>
    <MultiInput label='Доп. поле:' name='additional_field' type='textarea' />
    </StyledList>

</List>
        </Paper>

        <Paper component="form" sx={{ width: '35%',boxShadow: 'none' }}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         Доставка:
        </Typography >
<List>
    <StyledList>
    <MultiInput label='Спосіб доставки:' name='delivery_type' type='select'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Пакувальник:' name='packer_name' type='select'/>
    </StyledList>
    
    <StyledList>
    <MultiInput label='Спосіб оплати:' name='payment_name' type='select'/>
    </StyledList>

  {(isPay === '16') &&  <StyledList>
    <MultiInput label='Cума передплати:' name='backward_summ' type='num'/>
    </StyledList>}

 { (isPay === '16') &&   <StyledList>
    <MultiInput label='Передплата оплачена?' name='prepay_status' type='select'/>    
    </StyledList> }

{(isPay === '15') &&    <StyledList>
    <MultiInput label='Cума наложеного платежу:' name='backward_delivery_summ' type='num'/>
    </StyledList>}

    <StyledList>
    <MultiInput label='Дата відправки:' name='datetime_sent' type='data'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Час відправки:' name='datetime_sent' type='time'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Доставка:' name='delivery_service_type' type='select'/>
    </StyledList>

    {(deliveryType === 0) &&<StyledList>
    <MultiInput label='Місто відділення:' name='warehouse_city' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === 0) &&<StyledList>
    <MultiInput label='Адреса відділення:' name='warehouse_address' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === 1) &&<StyledList>
    <MultiInput label='Місто:' name='doors_city' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === 1) &&<StyledList>
    <MultiInput label='Адреса:' name='doors_address' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === 1) &&<StyledList>
    <MultiInput label='Дім:' name='doors_house' type='text'/>
    </StyledList>}

    {(deliveryType === 1) &&<StyledList>
    <MultiInput label='Квартира:' name='doors_flat' type='text'/>
    </StyledList>}

    <StyledList>
    <MultiInput label='Платник за доставку:' name='delivery_payers'  type='select'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Платник наложеного платежу:' name='delivery_payers_redelivery'  type='select'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Вага (кг):' name='weight' type='num'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Обємна вага:' name='volume_general' type='num'/>
    </StyledList>
    
    <StyledList>
    <MultiInput label='Кількість місць:' name='seats_amount' type='num'/>
    </StyledList>
    
    <StyledList>
    <MultiInput label='ТТН:' name='tnn' type='readOnly'/>
    </StyledList>
    
    <StyledList>
    <MultiInput label='Номер повернення:' name='sent' type='readOnly'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Статус:' name='status' type='readOnly'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Розрахункова вартість:' name='cost' type='readOnly'/>
    </StyledList>

    <StyledList>
    <MultiInput label='Коментарій:' name='novaposhta_comment' type='textarea'/>
    </StyledList>


</List>
        </Paper>
<SaveButton  />
    </Box>
)

}