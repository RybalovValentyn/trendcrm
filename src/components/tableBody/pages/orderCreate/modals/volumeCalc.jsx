import ModalProductComponent from "./modalComponent";
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, newProductCreate, autoUpdateAllReducer} from "../../../../../redux/ordersReduser";
import VolumeCalcComponent from "./volumeComponent";

 const VolumeCalcModal =()=>{
    const dispatch =useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.volumeCalc);
    const length = useSelector((state) => state.ordersAll.calcVolume.length);
    const width = useSelector((state) => state.ordersAll.calcVolume.width);
    const heigth = useSelector((state) => state.ordersAll.calcVolume.heigth);
    const ref = {length: 1, width: 1, heigth: 1, value: ''}

const handleClouse=()=>{
    dispatch(getOpenTableCreate({id: 'volumeCalc', str: false}));
    dispatch(autoUpdateAllReducer({state:'calcVolume', ref: ref , str: 'clear'}));
}

const handleChange=(e)=>{
    if (+length>0 && +width>0 && +heigth>0) {
        dispatch(newProductCreate({id: 'volume_general', str: Number(length)*Number(width)*Number(heigth)/4000}))
    } else  dispatch(newProductCreate({id: 'volume_general', str: ''}))  

}

    return(
        <ModalProductComponent Component={VolumeCalcComponent} funcOnClouse={handleClouse} open={open}  sendButtonText={'Застовувати'}
         titleText={"Розрахувати загальний обєм"}
        funcOnSend={handleChange} borderHeader={true} borderAction={true} alignAction={false} closeButtonText={''} width={'xs'}/>
  
     )
}

export default VolumeCalcModal