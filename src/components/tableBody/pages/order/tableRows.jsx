import { GetRowsComparator } from "./getRowsComparator";
import { hexToRgbA } from "./functionOrder";

export const TableRows=({rows, index, arr, click} )=>{  


    const columnStyle ={
        minWidth: '100px',
         fontSize: '12px', 
         height: '21px', 
         whiteSpace: 'nowrap',
          padding: '0px 10px',
        maxWidth: '400px',
        overflowX: 'auto', 
         width: '200px',
         color: 'inherit',
        position: 'relative',
        borderBottom: '1px solid #fff',
        userSelect: 'none',
        outline:'none'
    }
const rowStyle={
    backgroundColor: hexToRgbA(`${rows[0]?.color}`) ,
    color: '#000', 
   cursor: 'pointer',
   border: '1px solid #fff',
   outline:'none',
   "& :focus": {
    backgroundColor: '#fff' ,
}
}

    return (      
         <tr 
         onClick ={(e)=>click(e,index)} 
         tabIndex={-1}
         key={index}
         id={`${rows[0].value}+rows`}
        style={rowStyle}
       >
           {rows.map((row, ind)=><td key={ind} style={columnStyle}><GetRowsComparator row={row}/></td>)  } 

  </tr> 
  )
  
    
}



