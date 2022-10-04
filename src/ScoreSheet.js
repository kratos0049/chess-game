import React, { useEffect, useRef, useState } from "react";

function ScoreSheet(props){
 return(
<>

<table>
         <tbody>
            <tr><td>White</td> <td>Black</td></tr>
            
           {
                props.whiteMoves.map((move,i) =>(
                    <tr key={i}>
                        <td>{props.whiteMoves[i]}</td>

                        <td>{props.blackMoves[i]}</td>
                    </tr>
                ))
           }
          
         </tbody>
</table>


 
</>
 )
}

export default ScoreSheet