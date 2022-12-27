import { useDispatch, useSelector } from 'react-redux';
import { getFilteredOrders, getAllOrders } from '../../../../redux/asyncThunc';

// export function useUpdate(){
//     const dispatch = useDispatch();
//     const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
//     if (filteredRows?.length > 0) {
//       dispatch(getFilteredOrders())
//     } else dispatch(getAllOrders())
//    return true
//   };

