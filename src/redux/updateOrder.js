import { useDispatch, useSelector } from 'react-redux';
import { getFilteredOrders, getAllOrders, getAllStatuses } from '../redux/asyncThunc';

export const OrderUpdate = ()=>{
    const dispatch = useDispatch();
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);

    dispatch(getAllStatuses())
    if (filteredRows?.length > 0) {
      dispatch(getFilteredOrders())
    } else dispatch(getAllOrders())
}

