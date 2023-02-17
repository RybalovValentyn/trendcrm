

export  const  hexToRgbA = (hex) =>{
  if (hex?.includes("rgba")) {
       return hex
  }
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length == 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.25)';
  } else return hex
  throw new Error('Bad Hex');
}

export const priceUpdate=(price, count, discount, type)=>{
  let t = ((price?Number(price):0) * (count?Number(count):1)).toFixed(2)
    if (type === '%') {
      let d = t* Number(discount)/100      
      let num = t - d
      if (price > 0) {
         return num.toFixed(2)
      }  
      } else if (type === 'ua') {
          let num = t- (discount?Number(discount):0)
          if (price > 0) {
      return num.toFixed(2)
            }  
      } else return '0'
  }

  export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

