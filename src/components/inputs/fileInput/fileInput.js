
import { Box, FormControl, Input , FormLabel, Typography  } from '@mui/material'
import { useState } from 'react'


export const InputFile = ()=>{

  const [labelText, setLabelText] =useState('Вибаріть файл:');

  const handleChange =(e) =>{

setLabelText(e.target.value?e.target.value:'Вибаріть файл:')
  }

    return (
        <FormControl >
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center',   }} >

          <Typography sx={{display: 'block',  }}>{labelText}</Typography>
          <FormLabel  sx={{border: '1px solid #c0c0c0',
                     padding: '4px 10px', maxWidth: '200px' ,
                      borderRadius: '4px', display: 'block',
                       cursor: 'pointer', marginLeft: 'auto',
                      minWidth: '180px' , fontSize: '13px', color: '#383838'
                      
                      }}  htmlFor="uploads">{'Додати файл .xls'}</FormLabel>

          <Input onChange={handleChange}  sx={{ width: '0', height: '0', opasity: 1}} type="file" id="uploads" name="uploads" accept=".xls"/>
 
          
          </Box>
      </FormControl>
    )
}