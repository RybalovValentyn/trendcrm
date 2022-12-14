import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector,  } from 'react-redux';
import { colorsRef } from '../../../../consts/colorConstants';
import { Paper, Typography } from '@mui/material';
import {MultiInput} from '../order/forms/multiInputs';
import {styled } from '@mui/material/styles';
import { useState } from 'react';
import { SaveButton } from '../../../buttons/saveButton';
import {ListAutocompliteStatuses} from '../order/forms/listStatuses';
import {AddStatusForm} from '../modals/modalAddStatus';
import { ClientForm } from '../order/forms/client';
import { HeaderOrder } from './headerOrder';

export function CreateRows(){
   
    const isPay = useSelector((state) => state.ordersAll.createRows.payment_type)
    const deliveryType = useSelector((state) => state.ordersAll.createRows.delivery_service_type);
    const formStyle={ width: '35%',boxShadow: 'none', minWidth: '300px'};
    
    const boxStyle ={
        width: '99%',
        display: 'block', 
        backgroundColor: '#ededed',
        padding: '10px',
        overflowY: 'scroll',
        marginTop: '37px',
        
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
const headerBoxStyle = {display: 'flex',
 width: '100%',
  padding: '5px 0px',
   alignItems: 'center',    
   '@media (max-width:924px)': {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

}

return(
    <Box sx={boxStyle}>
        <Box sx={headerBoxStyle}>
        <ListAutocompliteStatuses/>
        <HeaderOrder/>
        </Box>
    <Box sx={{paddingBottom: '50px', backgroundColor: '#fff', width: '100%', boxShadow:'0px 4px 18px -10px rgb(0 0 0 / 50%)', padding: '20px'}} >

<ClientForm/>

        <Paper component="form" sx={formStyle}>
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
    <MultiInput label='Спосіб оплати:' name='payment_type' type='select'/>
    </StyledList>

  {(isPay === '16') &&  <StyledList>
    <MultiInput label='Cума передплати:' name='prepay_amount' type='num'/>
    </StyledList>}

 { (isPay === '16') &&   <StyledList>
    <MultiInput label='Передплата оплачена?' name='payment_status' type='select'/>    
    </StyledList> }

{(isPay === '15'||isPay === '86') &&    <StyledList>
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

    {(deliveryType === '0') &&<StyledList>
    <MultiInput label='Місто відділення:' name='warehouse_city' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === '0') &&<StyledList>
    <MultiInput label='Адреса відділення:' name='warehouse_address' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === '1') &&<StyledList>
    <MultiInput label='Місто:' name='doors_city' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === '1') &&<StyledList>
    <MultiInput label='Адреса:' name='doors_address' type='autocomplete'/>
    </StyledList>}

    {(deliveryType === '1') &&<StyledList>
    <MultiInput label='Дім:' name='doors_house' type='text'/>
    </StyledList>}

    {(deliveryType === '1') &&<StyledList>
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
<AddStatusForm isbutton={false}/>
<SaveButton  />
    </Box>
    </Box>
)

}