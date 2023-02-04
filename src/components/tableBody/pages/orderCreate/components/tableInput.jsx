import s from './style.module.scss';


const TableInput =({row, id, func, value, i, funcBlur})=>{
  return(
    <input className={s.inputTable} onChange={(e)=>func(e,i,row)} onBlur={(e)=>funcBlur(e,i,row)}
     role="presentation" autoComplete="off" id={`${i}-${id}`} defaultValue={row[id]} ></input>
  )  
}

export default TableInput