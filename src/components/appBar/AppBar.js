import { Link } from 'react-router-dom';

export function AppBAr() {
    
return(
    <div>

<Link to='/test2'>
      <button  variant="outlined" type="button">
        button rout to test2
      </button>
    </Link>

    
<Link to='/test1'>
      <button  variant="outlined" type="button">
        button rout to test1
      </button>
    </Link>
    </div>
)

}