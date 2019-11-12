import React from 'react';
import DisplayRow from './DisplayRow';

var BoardLocation = [];
var done = 0;
var iterations = 0
var IdWithQueen = [];
const BoardSize = (size) => {
    for(var i=0; i<size; i++){
        var arr = [];
        for(var j=0; j<size; j++){
            if((i+j)%2===0){
                arr[j] = {
                    position: '_'+i+j,
                    color: "black"
                };
            } else{
                arr[j] = {
                    position: '_'+i+j,
                    color: "white"
                };
            }
        }
        BoardLocation[i]=arr;
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board_size: 8,
            update: false
        }
    }

    HandleSimulation = (size) => {
        RenderBoard(PlaceNextQueen(size,size));
    }

    componentDidMount = () => {
        if(IdWithQueen.length>=0 && done===0){
            this.UpdateBoard();
            this.setState({IdWithQueen})
        }
    }

    UpdateBoard = e => {
        console.log("Inside");
        for(var i=0; i<this.state.board_size; i++){
            if(document.getElementById(IdWithQueen[i])!==null){
                // document.getElementById(IdWithQueen[i]).innerHTML = 'Q';
                document.getElementById(IdWithQueen[i]).setAttribute("class","chess-queen square-box");
            }
            done = 1;
        }
    }

    handleChange = e => {
        
    }


    render(){
        this.HandleSimulation(this.state.board_size);
        if(done===0){
            BoardSize(this.state.board_size);
        }
        var displayBoard = null;
        if(BoardLocation){
            displayBoard = BoardLocation.map(item => <DisplayRow content={item}/> )
        }
        return(
            <React.Fragment>
                <div className="form-control">
                    <form onSubmit={this.handleSubmit}>
                        <input name="board-size" onChange={this.handleChange}></input>
                        <button type="submit">Simulate</button>
                    </form>
                </div>
                <p>Total Number of Iterations: {iterations}</p>
                <div className="main-board-container">
                    {displayBoard}
                </div>
            </React.Fragment>
        )
    }
}

function RenderBoard(columns) {

    var n = columns.length, row = 0, col = 0
    console.log("The value of n: "+n);
    while (row < n) {
        while (col < n) {
            if(columns[row] === col){
                console.log("Inside RenderBoard");
                IdWithQueen[row] = '_'+row+col;
            }
            col++
        }
        col = 0
        row++
    }
    console.log(IdWithQueen);
}

function isAttacked(columns) {
  var len = columns.length, last = columns[len - 1], previous = len - 2

  while (previous >= 0) {
    if (columns[previous] === last) return true
    if (last - (len - 1) === columns[previous] - previous) return true
    if (last + (len - 1) === columns[previous] + previous) return true
    previous--
  }

  return false
}

function PlaceNextQueen(total, queens, columns) {
  if (queens === 0) return columns
  columns = columns || []

  for (var column = 0; column < total; column++) {
    columns.push(column)
    iterations++
    if (!isAttacked(columns) && PlaceNextQueen(total, queens - 1, columns)) {
        console.log("Function is Called");
        return columns
    }
    columns.pop(column)
  }
  
  return null;
}

export default Board;