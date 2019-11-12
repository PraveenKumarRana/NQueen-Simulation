import React from 'react';
import DisplayRow from './DisplayRow';

var BoardLocation = [];
var iterations = 0
var done = 0;
var IdWithQueen = [];
var new_board_size = 5;
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

    // HandleSimulation = (size) => {
    //     RenderBoard(PlaceNextQueen(size,size));
    // }
    

    componentDidMount = () => {
        var CBoard = new Array(this.state.board_size);
        const {board_size} = this.state; 
        for(var i=0; i<board_size; i++){
            CBoard[i]=new Array(board_size);
        }

        var PlaceNQueens = function PlaceNQueen(n,col){
            if(col>=n) return 1;
            for(var i=0; i<n; i++){
                if(isSafes(n,i,col,CBoard)){
                    CBoard[i][col]=1;
                    iterations++;
                    if(document.getElementById('_'+i+col)!=null){
                        // console.log("Inside");
                        document.getElementById('_'+i+col).setAttribute("class","chess-queen square-box");
                    }
                    // console.log("Console: "+PlaceNQueens(n,col+1));
                    if(PlaceNQueens(n,col+1)===1) return 1;
                    else {
                        CBoard[i][col]=0;
                        if(document.getElementById('_'+i+col)!=null){
                            // console.log("Inside");
                            document.getElementById('_'+i+col).setAttribute("class","square-box");
                        }
                    }
                }
            }
            return 0;
        }
        if(done === 0){
            PlaceNQueens(board_size,0);
            done = 1;
        }
    }

    // UpdateBoard = e => {
    //     for(var k=0; k<this.state.board_size; k++){
    //         for(var p=0; p<this.state.board_size; p++){
    //             if(document.getElementById('_'+k+p)!=null){
    //                 document.getElementById('_'+k+p).setAttribute("class","square-box");
    //             }
    //         }
    //     }
    //     for(var i=0; i<this.state.board_size; i++){
    //         if(document.getElementById(IdWithQueen[i])!==null){
    //             document.getElementById(IdWithQueen[i]).setAttribute("class","chess-queen square-box");
    //         }
    //     }
    // }
    
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
        // console.log(this.state.board_size);
        this.setState({
            board_size:new_board_size,
            IdWithQueen
        })
        // this.UpdateBoard();
    }

    render(){
        // console.log("Render function called!");
        BoardSize(this.state.board_size);
        var displayBoard = null;
        displayBoard = BoardLocation.map(item => <DisplayRow content={item}/> )
        // this.HandleSimulation(this.state.board_size);
        return(
            <React.Fragment>
                <div className="form-group">
                    <form style={{display:"flex"}} onSubmit={this.handleSubmit}>
                        <input name="board_size" style={{width:"500px"}} className="form-control" onChange={this.handleChange} placeholder="Enter the Board Size."></input>
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

var isSafes = function isSafe(n,row,col,CBoard){
    var i,j;
    for(i=0; i<col; i++) if(CBoard[row][i]) return 0;
    for(i=row, j=col; j>=0 && i<n; i++,j--) if(CBoard[i][j]) return 0;
    for(i=row,j=col; j>=0&& i<n; i++,j--) if(CBoard[i][j]) return 0;
    return 1;
}

export default Board;