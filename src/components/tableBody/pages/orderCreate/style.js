export const boxStyle = {
    maxWidth: '80%', 
    minWidth: '200px',
     width: '50%',
     display: 'flex', 
     justifyContent: 'space-between',
     maxHeight: '32px',
     '@media (max-width:924px)': {
        maxWidth: '100%',
        width: '100%',
      },
};
export const listStyle={
display: 'flex', 
justifyContent: 'flex-start',
alignItems: 'center',
padding: '0px',
maxHeght: '32px',
heigth: '32px',
'& :hover':{
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    cursor:'pointer',
    color: '#575757'
  },

}

export const itemStyle={
borderRadius: '50%', 
border: 'none',
padding: '4px',
  textAlign: 'center',
  marginLeft: '5px',
maxHeght: '30px'
}
export const iconStyle = {
color: '#606060',    
'& :hover':{
border: 'none',
cursor:'pointer',
}
}