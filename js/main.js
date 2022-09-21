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
    gGame.isOn = false
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
                containing: ''
            }
        }
    }
}

function renderBoard(board){
    var strHTML = '<table>\n'
    for (var i = 0; i < gGame.level; i++){
        strHTML += '<tr>\n'
        for (var j = 0; j < gGame.level; j++){
            strHTML += `<td class="cell cell-${i}-${j} un-clicked"
            onmousedown="cellClicked(event,${i},${j})">${board[i][j].containing}</td>\n`
        }
        strHTML += '\n'
    }
    strHTML += '</table>'
    var elBoard = document.querySelector('div')
    elBoard.innerHTML = strHTML
}

function cellClicked(event, i, j){
    if (event.button === 2) alert ('hi')
    if (!gGame.isOn){
        insertMines(i,j)
        setMinesNegsCount(gBoard)
        console.log(gBoard);
        renderBoard(gBoard)
        event.classList.remove("un-clicked");
        event.classList.add("clicked");
        gGame.isOn = !gGame.isOn
    }
}

function insertMines(idx,jdx){
    console.log('clicked:',idx,jdx);
    findCellsForMines(idx,jdx)
    for (var i = 1; i <= gGame.mineCount; i++){
        var x = getRandomInt(0,gGame.emptyCoords.length)
        var id = gGame.emptyCoords[x] 
        gBoard[id.i][id.j].containing = gGAME.MINE 
        gGame.emptyCoords.splice(x,1)
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
}


function findCellsForMines(idx,jdx){
    gGame.emptyCoords = []
    for (var i = 0; i < gBoard.length; i++){
        for (var j = 0; j <  gBoard.length; j++){
            if ( i >= idx - 1 && i <= idx + 1 && j >= jdx - 1 && j <= jdx + 1) continue
            gGame.emptyCoords.push({i,j})
        }
    }
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