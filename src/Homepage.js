import React, { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'
function Homepage(props){
 return(
<>

<Link to={'/chessboard'}><button>Chessboard</button></Link>
<Link to={'/database'}><button>Database</button></Link>
 
</>
 )
}

export default Homepage