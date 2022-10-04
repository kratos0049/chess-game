import { Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'
function Homepage(props){
 return(
<>
<br></br>
<br></br>
<br></br>
<Grid container direction="row"
  justifyContent="center"
  alignItems="center">
<Grid item xs={3}>
<Link to={'/chessboard'}><Button variant="contained">Chessboard</Button></Link>
</Grid>
<Grid item xs={3}>
<Link to={'/database'}><Button variant="contained">Database</Button></Link>
</Grid>
</Grid>
</>
 )
}

export default Homepage