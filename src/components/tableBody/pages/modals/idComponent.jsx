import { Box, Typography } from "@mui/material"

export const IdComponent=()=>{
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }

    return (
        <Box>

        <Typography sx={{fontSize: '14px', marginTop: '30px'}}>{'ID виділених замовлень:'}</Typography>
        <Box sx={{display: 'flex','@media (max-width: 650px)': {
            width: '80%',display:'flex', flexWrap: 'wrap'
              }}}> {selected?.map((str, i, arr)=>
        <Typography key={i} sx={{fontSize: '14px', }}>{`${str} ${i!==arr.length-1?', ':''} `}</Typography>
            )}</Box>

    <Typography sx={{fontSize: '14px', marginTop: '20px'}}>{`Вибрано замовлень: ${selected.length}`}</Typography>
    </Box >
    )
}