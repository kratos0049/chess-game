import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import { Link } from 'react-router-dom';
import Chessboard from "chessboardjsx";
import ScoreSheet from "../src/ScoreSheet";
import AnalysisBoard from "./AnalysisBoard";
import Apitest from "./Apitest";
import axios from "axios";
import {storage} from "./firebase"
//import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {db} from "./firebase"
import { collection, getDocs, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Button, Grid, Input } from "@mui/material";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export default function Board(){


  
  const game = useRef(null);

  useEffect(()=>{
    game.current = new Chess();
  }, [])
  
  
  const [fen, changeFen]=useState("start");
  const [history, changeHistory] = useState([]);
  const [squareStyles, changeSquareStyles] = useState({});
  const [pieceSquare, changePieceSquare]=useState("");
  const [dropSquareStyle, changeDropSquareStyle]= useState({});
  const [whiteMoves, addWhiteMove]= useState([]);
  const [blackMoves, addBlackMove]= useState([]);
  const [moves, changeMoves] = useState([]);
  const [progress, changeProgress] = useState(0);
  const [pgn, changePgn] = useState("");
  const [darkColourSquare, changeDarkColourSquare] = useState("#b58863")
  const [colourCode, changeColourCode] = useState("")

  useEffect(()=>{
  }, [squareStyles])

  useEffect(()=>{ changeMoves([...moves, fen])
  }, [fen])
  

  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "30%"
            }
          },
          ...squareStyling({
            history: history,
            pieceSquare: pieceSquare
          })
        };
      },
      {}
    );
    changeSquareStyles({...highlightStyles })
    
  };
  
  const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;
  
    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      })
    };
    
  };

  
  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
    
    // const data = { username: 'example' };
    // fetch("http://localhost:5000/onDrop", {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(
    //     {
    //       source : sourceSquare,
    //       target : targetSquare,
    //       piece : piece
    //     }
    //     ),})
    // .then((res) => res.json())
    // .then(response=>{changeFen(response.fen)})
    // .catch((err) => {
    //                 console.error("ERROR!", err);
    //                 });
    
    //see if the move is legal
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) return;

    if(piece.slice(0,1)=='w'){
      addWhiteMove([...whiteMoves,piece.slice(1)+targetSquare]);
    }
    else{
      addBlackMove([...blackMoves,piece.slice(1)+targetSquare]);
    }
    changePgn(game.current.pgn())
    changeFen(game.current.fen)
    changeHistory(game.current.history({verbose:true}))
    changeSquareStyles(squareStyling({ pieceSquare, history }))
  }

  const onMouseOverSquare = square => {
    // get list of possible moves for this square
    let moves = game.current.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };

   // keep clicked square style and remove hint squares
   const removeHighlightSquare = () => {
      changeSquareStyles({})
    };

    const onMouseOutSquare = square => {
      removeHighlightSquare(square);
    }

    const onSquareRightClick = square =>{
      changeSquareStyles({ [square]: { backgroundColor: "deepPink" } })
    }

    const onSquareClick = square => {
        
          changeSquareStyles(squareStyling({ pieceSquare: square, history }))
          changePieceSquare(square)
        
    
        let move = game.current.move({
          from: pieceSquare,
          to: square,
          promotion: "q" // always promote to a queen for example simplicity
        });
    
        // illegal move
        if (move === null) return;

        changeFen(game.current.fen())
        changeHistory(game.current.history({ verbose: true }))
        changePieceSquare("") 
      };


      const onDragOverSquare = square => {
      
          changeDropSquareStyle(
            square === "e4" || square === "d4" || square === "e5" || square === "d5"
              ? { backgroundColor: "cornFlowerBlue" }
              : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
          )
      };



      const getPGN=()=>{
        let pgn = "";
        pgn = pgn + "[White Player1]\n[Black Player2]\n[Result ?]\n[UTCDate 2022.08.14]\n\n"
        let moves = ""
        for (let i = 0; i < whiteMoves.length; i++) {
          moves = moves + (i+1)+". ";
          if(whiteMoves[i] && whiteMoves[i][0]=='P')
          moves = moves + whiteMoves[i].substring(1)+" ";
          else
          moves = moves + whiteMoves[i]+" ";
          if(blackMoves[i] && blackMoves[i][0]=='P')
          moves = moves + blackMoves[i].substring(1)+" ";
          else
          moves = moves + blackMoves[i]+" ";
        }

        pgn = pgn + moves;
        return pgn;

      }

      const usersCollectionRef = collection(db, "pgn Files")
      
      const save = async() => {
        game.current.header('White', 'Plunky', 'Black', 'Plinkie')
        await addDoc(usersCollectionRef, {pgn : game.current.pgn()}) 
        alert("Saved in Firebase, go to /database to review the game")
    //     fetch("http://localhost:5000/save", {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({pgn : getPGN()}),})
    // .then((res) => res.json())
    // .then(response=>{console.log(response)})
    // .catch((err) => {
    //                 console.error("ERROR!", err);
    //                 });



      }
    const changeColour =(option)=>{
      changeDarkColourSquare(option.value)
    }

    const handleChange=(event)=> {
      changeColourCode(event.target.value)
    }
    const handleSubmit=(event)=> {
      event.preventDefault()
      changeDarkColourSquare(colourCode)
    }
    const options = [
      { value: '#cc0000', label: 'Red' },
      { value: '#267326', label: 'Green'},
      { value: '#b58863', label: 'Brown'},
    ]
      


  return (

    
    <>
    <Grid container>
      <Grid item xs={6}>
          <Chessboard
            id="humanVsHuman"
            width={700}
            position={fen}
            onDrop = {onDrop}
            onMouseOverSquare = {onMouseOverSquare}
            onMouseOutSquare = {onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles = {squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare = {onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            darkSquareStyle={{  backgroundColor: darkColourSquare  }}
          />
        </Grid>
        <br></br>
        <Grid item xs={3}>
          <h2>Score Sheet :</h2>{pgn}
          </Grid>
          
          <Grid item xs={12}>
          <Button onClick={save} variant={"contained"}> Save </Button>
          </Grid>

         
      
<Dropdown options={options} onChange={changeColour}  placeholder="Select colour" />



      <form onSubmit={e=>(handleSubmit(e))}>
          <Input type="text"  value={colourCode} onChange={handleChange} placeholder="Enter colour code" />
        <input type="submit" value="Submit" />
      </form>          
         
          
    </Grid>

          {/* <AnalysisBoard moves={moves} /> */}

    </>
  );
}

