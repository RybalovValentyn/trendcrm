import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, alertMessageUpdate } from '../../../../../redux/ordersReduser';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalComponent } from '../modalComponent';
import { setNewPostTtnCreate, getFilteredOrders, getAllOrders } from '../../../../../redux/asyncThunc';
import { SwitchComponent } from './components/ttnComponent';

const NewPostTtnCreate = () =>{
    const dispatch = useDispatch();
    const ttnNewPostCreate = useSelector((state) => state.ordersAll.modalControl.ttnNewPostCreate);
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }
    const ttnWeigth = useSelector((state) => state.ordersAll.ttnWeigth);
    const ttnResponsible = useSelector((state) => state.ordersAll.ttnResponsible);

const successAlert = () => {
  dispatch(getOpenTableCreate({id: 'ttnNewPostCreate', str: false}));
  withReactContent(Swal).fire({  
        title: 'Увага!',  
        text: 'Ви дійсно хочете створити ТТН Нова Пошта',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ні',
        confirmButtonText: 'Так',
      }).then((result) => {        
        if (result.isConfirmed) {
            handle()
            getUpdate()
                }
      }); 
};
const success = ()=>{
  withReactContent(Swal).fire(
        'Задача завершена!',
        '',
        'success'
      )
}
const handle =()=>{
    let id = selected[0]
    if (selected.length === 1) {
        dispatch(setNewPostTtnCreate({id:id, weight: ttnWeigth, responsible_packer: ttnResponsible }))
        success() 
        return
    } else if (selected.length > 1) {
        selected.map(id=>{
            if (Number(id)) {
                dispatch(setNewPostTtnCreate({id:id, weight: ttnWeigth, responsible_packer: ttnResponsible })) 
            }
        })
        return
    } else dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
}

const handleClouse =(e)=>{ 
  dispatch(getOpenTableCreate({id: 'ttnNewPostCreate', str: false}));
}

const handleCreateEN=()=>{
  if (!selected || selected.length === 0) {
    dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
  } else successAlert()    
    

}
const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}


    return(
      <ModalComponent Component={SwitchComponent} open={ttnNewPostCreate} sendButtonText={'Створити'} titleText={"Створити ТТН Нова Пошта для замовлень"}
      funcOnSend={handleCreateEN} funcOnClouse={handleClouse} borderHeader={true} borderAction={false} alignAction={true} isAutoclouse={true} />
    
    )
}

export default NewPostTtnCreate