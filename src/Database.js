import React, { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Grid } from "@mui/material";
import {db} from './firebase'
import { collection, getDocs } from "firebase/firestore";

function Database(props){

    useEffect(()=>{
        getFiles()
      }, [])


    const [files, changeFiles]=useState([]);
    const [currentGame, changeCurrentGame] = useState([]);
    const [fen, changeFen]=useState("start");
    const chessGame = new Chess()

    const usersCollectionRef = collection(db, "pgn Files")
    const getFiles=async()=>{
        let allDetails = []
        // try {
        //   let resp = await fetch("http://localhost:5000/getFiles", {
        //     method: 'GET', // or 'PUT'
        //     })
        //     let lol=await resp.json()
        //     console.log(lol)
         let body = await getDocs(usersCollectionRef)
         let pgnFiles = body.docs.map((doc)=>({ ...doc.data()   }))
          pgnFiles.map((file)=>
          {
            let gameDetails = {}
            let game = file.pgn.split("\n")
                game.map((details)=>
                {
                    details=details.replace("[","")
                    details=details.replace("]","")
                    details=details.replaceAll('"','')
                    if(details)
                        if(details[0]=='1')
                            gameDetails['moves']=details
                        else
                            gameDetails[details.substring(0,details.indexOf(" "))] = details.substring(details.indexOf(" ")+1)
                    
                            
                }
            
            )
            allDetails.push(gameDetails)
            })
          changeFiles(allDetails)
          //console.log(allDetails)

        // } catch (error) {
        //   console.log(error);
        // }
      }
    
    const game=(moves)=>{
        let chessMoves = moves.split(" ")
        chessMoves = chessMoves.filter(
            move => 
            {
                if((move[0]>='0' && move[0]<='9') || !move[0])
                    return 0
                return 1
                
            }
                  )
        changeCurrentGame(chessMoves)
    }

    const display=(index)=>{
        for (let i = 0; i <=index ;i++) {
            chessGame.move(currentGame[i])
        }
        changeFen(chessGame.fen())
    }
    
 console.log(currentGame)
return(
    
<>
<Grid container spacing={2}>
    <Grid item xs={6}>
<Table>
<TableHead>
<TableRow>
    <TableCell>S.No</TableCell>
    <TableCell>Match</TableCell>
</TableRow>
</TableHead>
<TableBody>
{
files.map((file,index)=>
{
 return(   
    <TableRow key={index}>
        <TableCell>{index+1}</TableCell> 
        <TableCell onClick={()=>game(file.moves)}>{file.White} vs {file.Black}</TableCell>
    </TableRow>)
}
)
}
</TableBody>
</Table>
<br></br>
<br></br>
<br></br>
</Grid>
<Grid item xs={6}>
<Chessboard position={fen}/>
<br></br>
<Table>
<TableHead>
<TableRow>
    <TableCell align="left">White</TableCell>
    <TableCell align="left">Black</TableCell>
</TableRow>
</TableHead>
<TableBody>
{
currentGame.map((move,index)=>
{
    if (index % 2 ==0) 
    {
        
        return(
        <TableRow key={index}>   
        <TableCell height={1} width={10} align="left" onClick={()=>display(index)}>{currentGame[index]}</TableCell>
        <TableCell height={1} widgth={10} align="left" onClick={()=>display(index+1)}>{currentGame[index+1]}</TableCell>
        </TableRow>  
        )  
    }
    
}
)
}
</TableBody>
</Table>
</Grid>
</Grid>
</>
 
)
}


export default Database;