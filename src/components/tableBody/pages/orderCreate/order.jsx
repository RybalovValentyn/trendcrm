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
import {useNavigate, useSearchParams,} from 'react-router-dom';
import { autoUpdate } from '../../../../redux/ordersReduser';
import { useEffect } from 'react';
import ProductCreateComponent from './productcreate'; 
import ScriptCreateComponent from './scriptcreate';
import ProductCreate from './modals/productCreate';
import NewProductCreate from './modals/newProduct';
import NewAtributeCreate from './modals/newAtribute';
import NewSupliersCreate from './modals/newSupliers';
import CategoryCreate from './modals/newCategory';
import VolumeCalcModal from './modals/volumeCalc';
import AtrCategoryCreate from './modals/newAtrCategory';
import InstallAtribute from './modals/installAtribute';


export function CreateRows(){
    const dispatch = useDispatch();
    const isPay = useSelector((state) => state.ordersAll.createRows.payment_type)
    const deliveryType = useSelector((state) => state.ordersAll.createRows.delivery_service_type);
    const formStyle={ width: '100%',boxShadow: 'none', minWidth: '300px', padding: '10px'};
    const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
 


    useEffect(() => {
        if (isUpdateRows) {
            // dispatch(autoUpdate({id:'isUpdateRows', str: false}));
        }
        // dispatch(autoUpdate({ id: 'productData', str: []}))
      }, []);

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
    <Box sx={{paddingBottom: '50px', backgroundColor: '#fff', width: '100%', boxShadow:'0px 4px 18px -10px rgb(0 0 0 / 50%)', padding: '20px', display: 'flex'}} >

<Box sx={{width: '34%'}}>
        <ClientForm/>
        <Paper component="form" sx={formStyle}>
        <Typography sx={ typographyStyle} variant="h2" component="h3">
         Доставка:
        </Typography >
            <List >
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
</Box>
<Box sx={{width: '66%'}}>
    <ProductCreateComponent />
<ScriptCreateComponent/>
</Box>
<AddStatusForm isbutton={false}/>
<SaveButton  />
    </Box>

<ProductCreate/>
<NewProductCreate/>
<NewAtributeCreate/>
<NewSupliersCreate/>
<CategoryCreate/>
<VolumeCalcModal/>
<AtrCategoryCreate/>
<InstallAtribute/>
    </Box>
)

}