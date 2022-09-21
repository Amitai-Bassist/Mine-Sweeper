'uses strict'

var gBoard
const gGAME = {
            MINE: '💣',
            FLAG: '🚩',
            MINE_EXPLODED: '💥',

            }
var gGame = {isOn: false, 
            level: 4,
            mineCount: 2,
            emptyCoords: [],
            shownCount: 0, 
            markedCount: 0, 
            secsPassed: 0,
            }


function initGame(){
    buildBoard()
    renderBoard(gBoard)
}

function buildBoard(){
    gBoard = []
    for (var i = 0; i < gGame.level; i++){
        gBoard.push([])
        for (var j = 0; j < gGame.level; j++){
            gBoard[i][j] = {
                location: {i,j},
                isShown: 'false',
                containing: null
            }
            gGame.emptyCoords.push({i,j})
        }
    }
}


function setMinesNegsCount(board){
    for (var i = 0; i < board.length; i++){
        for (var j = 0; j <  board.length; j++){  //loop over every cell in the board
            if (board[i][j].containing === gGAME.MINE) continue
            var mineCounter = negsCellCheck(board,i,j)    //Neighbor loop for every cell
            board[i][j].containing = mineCounter
        }
    }
    console.log('board after counting', board);
}

function negsCellCheck(board,i,j){  
    var mineCounter = 0
    for (var idx = -1; idx  <=  1; idx++){
        for (var jdx = -1; jdx <=  1; jdx++){ //Neighbor loop for every cell
            if (i + idx < 0 || j + jdx < 0 || 
            i + idx === board.length || j + jdx === board.length || //check overflow 
            (idx === 0 && jdx === 0)) continue //don't check the current cell 
            if (board[i + idx][j + jdx].containing === gGAME.MINE){
                mineCounter++
            }
        }
    }
    return mineCounter
}

function renderBoard(board){
    var strHTML = '<table>\n'
    for (var i = 0; i < gGame.level; i++){
        strHTML += '<tr>\n'
        for (var j = 0; j < gGame.level; j++){
            strHTML += `<td class="cell cell-${i}-${j} un-clicked"
             onclick="cellClicked(this,${i},${j})">${board[i][j].containing}</td>\n`
        }
        strHTML += '\n'
    }
    strHTML += '</table>\n'
    var elBoard = document.querySelector('div')
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j){
    if (!gGame.isOn){
        console.log(gBoard)
        insertMines(i,j)
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
    }
}

function cellMarked(elCell){

}

function checkGameOver(){

}

function expandShown(board, elCell, i, j){

}

function choseLevel(level,mines){
    gGame.level = level
    gGame.mineCount = mines
    initGame()
}

function insertMines(i,j){
    var firstIdx = (i * 4) + j
    gGame.emptyCoords.splice(firstIdx,1)
    for (var i = 1; i <= gGame.mineCount; i++){
        var idx = gGame.emptyCoords[getRandomInt(0,gGame.emptyCoords.length)] 
        gBoard[idx.i][idx.j].containing = gGAME.MINE 
    }
}
