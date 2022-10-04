import React, { useEffect, useRef, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function ScoreSheet(props){
 return(
<>

<Table>
         <TableBody>
            <TableRow><TableCell>White</TableCell> <TableCell>Black</TableCell></TableRow>
            
           {
                props.whiteMoves.map((move,i) =>(
                    <TableRow key={i}>
                        <TableCell>{props.whiteMoves[i]}</TableCell>

                        <TableCell>{props.blackMoves[i]}</TableCell>
                    </TableRow>
                ))
           }
          
         </TableBody>
</Table>


 
</>
 )
}

export default ScoreSheet