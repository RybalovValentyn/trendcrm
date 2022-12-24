import { GetRowsComparator } from "./getRowsComparator";
import { useRef, useLayoutEffect} from "react";

export const TableRows=({rows, index, arr, click, selected} )=>{

    const rowRef = useRef(null);

 const  hexToRgbA = (hex) =>{
        // console.log(hex);
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length == 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.25)';
        }
        throw new Error('Bad Hex');
      }
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

useLayoutEffect(() => {

    if (selected.includes(rows[0].value)) {
        rowRef.current.style.backgroundColor = '#B0C4FF'
    } else rowRef.current.style.backgroundColor = hexToRgbA(`${rows[0]?.color}`)   

    }, [selected]);
    
const handleClick=()=>{
    rowRef.current.style.backgroundColor = '#B0C4FF'
}


    return (      
         <tr 
         ref={rowRef}
        //  onMouseUp={handleClick}
         onClick ={(e)=>click(e,index, rowRef, hexToRgbA(`${rows[0]?.color}`))} 
        onMouseDown={handleClick}
         tabIndex={-1}

         key={index}
         id={rows[0].value}
        //  style={selected?focusRowStyle:rowStyle}
        style={rowStyle}
       >
           {rows.map((row, ind)=><td key={ind} style={columnStyle}><GetRowsComparator row={row}/></td>)  } 

  </tr> 
  )
  
    
}



