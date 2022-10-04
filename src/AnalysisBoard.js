import React, { useEffect, useRef, useState } from "react";
import Chessboard from "chessboardjsx";
function AnalysisBoard(props){

    const[fenCount, changeFenCount] = useState(0);
    
    const nextMove=()=>{
        changeFenCount(fenCount+1)
    }

    const previousMove=()=>{
        changeFenCount(fenCount-1)
    }
 return(
<>

<Chessboard position={props.moves[fenCount]}/>
<button onClick={previousMove}/>
<button onClick={nextMove} />

 
</>
 )
}

export default AnalysisBoard