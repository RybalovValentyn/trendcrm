
import { Box, FormControl, Input , FormLabel, Typography  } from '@mui/material'
import { useState } from 'react'


export const InputFile = ()=>{

  const [labelText, setLabelText] =useState('Вибаріть файл:');

  const handleChange =(e) =>{

setLabelText(e.target.value)
  }

    return (
        <FormControl >
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center',    }} >

          <Typography sx={{display: 'block',marginRight: '100px' }}>{labelText}</Typography>
          <FormLabel  sx={{border: '1px solid #d0d0d0',
                     padding: '5px 10px', maxWidth: '200px' ,
                      borderRadius: '8px', display: 'block',
                      marginLeft: '100px', cursor: 'pointer'
                      
                      }}  htmlFor="uploads">{'Додати файл .xls'}</FormLabel>

          <Input onChange={handleChange}  sx={{ width: '0', height: '0', opasity: 1}} type="file" id="uploads" name="uploads" accept=".xls"/>
 
          
          </Box>
      </FormControl>
    )
}