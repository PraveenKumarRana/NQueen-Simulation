import React from 'react';
import DisplayRow from './DisplayRow';

var BoardLocation = [];
var done = 0;
var iterations = 0
var IdWithQueen = [];
var new_board_size = 4;
const BoardSize = (size) => {
    for(var i=0; i<size; i++){
        var arr = [];
        for(var j=0; j<size; j++){
            if((i+j)%2===0){
                arr[j] = {
                    position: '_'+i+j,
                    color: "#dfc8f8"
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
            board_size: 5,
            update: false,
            IdWithQueen:[],
            iterations: 0,
        }
    }

    HandleSimulation = (size) => {
        RenderBoard(PlaceNextQueen(size,size));
    }

    componentDidMount = () => {
        if(this.state.IdWithQueen.length>=0 && done===0){
            this.UpdateBoard();
        }
    }

    UpdateBoard = e => {
        console.log("Inside");
        for(var k=0; k<this.state.board_size; k++){
            for(var p=0; p<this.state.board_size; p++){
                if(document.getElementById('_'+k+p)!=null){
                    document.getElementById('_'+k+p).setAttribute("class","square-box");
                }
            }
        }
        for(var i=0; i<this.state.board_size; i++){
            if(document.getElementById(IdWithQueen[i])!==null){
                document.getElementById(IdWithQueen[i]).setAttribute("class","chess-queen square-box");
            }
            done = 1;
        }
    }
    
    handleChange = e => {
        iterations = 0;
        BoardLocation = [];
        e.preventDefault();
        new_board_size = e.target.value
        if(new_board_size){
            this.setState({
                board_size:new_board_size,
                IdWithQueen
            })
        }
    }

    handleSubmit = e => {
        BoardLocation = [];
        iterations = 0;
        e.preventDefault();
        console.log(this.state.board_size);
        this.setState({
            board_size:new_board_size,
            IdWithQueen
        })
        this.UpdateBoard();
    }

    render(){
        console.log("Render function called!");
        BoardSize(this.state.board_size);
        var displayBoard = null;
        displayBoard = BoardLocation.map(item => <DisplayRow content={item}/> )
        this.HandleSimulation(this.state.board_size);
        return(
            <React.Fragment>
                <div className="form-group">
                    <form style={{display:"flex"}} onSubmit={this.handleSubmit}>
                        <input name="board_size" style={{width:"500px"}} className="form-control" onChange={this.handleChange} placeholder="Enter board size and double tap."></input>
                        <button type="submit" style={{marginLeft: "20px", width:"90px"}} className="form-control btn btn-primary">Simulate</button>
                    </form>
                </div>
                <p>Total Number of Iterations: <b>{iterations}</b></p>
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