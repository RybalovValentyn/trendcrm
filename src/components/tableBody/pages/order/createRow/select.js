import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { styled, Box } from '@mui/system';




export function StyledSelect({params}) {

    const Label = styled('label')(
        ({ theme }) => `
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.85rem;
        display: block;
        margin-bottom: 4px;
        font-weight: 400;
        `,
      );
    

    return(   
        <>
    <Label htmlFor="named-select">
    With the <code>name</code> prop
  </Label>
  <SelectUnstyled defaultValue={10} id="named-select" name="demo-select">
    <OptionUnstyled value={10}>Ten</OptionUnstyled>
    <OptionUnstyled value={20}>Twenty</OptionUnstyled>
    <OptionUnstyled value={30}>Thirty</OptionUnstyled>
  </SelectUnstyled>

  </>
  )
}