var CBoard = [[]];
function Initialize(n){
    for(var i=0; i<n; i++){
        for(var j=0; j<n; j++){
            CBoard[i][j]=0;
        }
    }
}

function isSafe(n,row,col){
    var i,j;
    for(i=0; i<col; i++) if(CBoard[row][i]) return false;
    for(i=row, j=col; j>=0 && i<n; i++,j--) if(CBoard[i][j]) return false;
    for(i=row,j=col; j>=0&& i<n; i++,j--) if(CBoard[i][j]) return false;
    return true;
}

function PlaceNQueen(n,col){
    if(col>=n) return true;
    for(var i=0; i<n; i++){
        if(isSafe(i,col)){
            CBoard[i][col]=1;
            if(PlaceNQueen(n,col+1)) return true;
            CBoard[i][col]=0;
        }
    }
    return false;
}

Initialize(5);
PlaceNQueen(5);