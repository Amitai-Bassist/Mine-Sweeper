var modal = document.getElementById("myModal")
var btn = document.getElementById("myBtn")
var span = document.getElementsByClassName("close")[0]
var gTens = "00"
var gSeconds = "00"

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function clock(){
    var eltens = document.querySelector('.tens') 
    var elseconds = document.querySelector('.seconds') 
    
    gTens++; 
    if(gTens <= 9){
        eltens.innerHTML = "0" + gTens
    } 
    if (gTens > 9){
        eltens.innerHTML = gTens
    }   
    if (gTens > 99) {
        gSeconds++;
        elseconds.innerHTML = "0" + gSeconds
        gTens = 0;
        eltens.innerHTML = "0" + 0
    }  
    if (gSeconds > 9){
        elseconds.innerHTML = gSeconds
    }
}

function resetClock(){
    clearInterval(gClockInterval)
    gTens = "00"
    gSeconds = "00"
    var eltens = document.querySelector('.tens') 
    var elseconds = document.querySelector('.seconds') 
    eltens.innerHTML = gTens
    elseconds.innerHTML = gSeconds
}

function useHint(){
    gGame.useHint = true
    var modal = document.getElementById("myModal")
    modal.style.display = "none"
    var elBtn = document.querySelector('.hints')
    gGame.hints--
    elBtn.innerText = '💡'.repeat(gGame.hints)
}

function hintClick(i,j){
    for (var idx = -1; idx  <=  1; idx++){
        for (var jdx = -1; jdx <=  1; jdx++){ //Neighbor loop for the cell
            if (i + idx < 0 || j + jdx < 0 || 
            i + idx === gBoard.length || j + jdx === gBoard.length) continue
            gBoard[i + idx][j + jdx].isShown = true
        }
    }
    renderBoard(gBoard)
    setTimeout(
        function() {
            for (var idx = -1; idx  <=  1; idx++){
                for (var jdx = -1; jdx <=  1; jdx++){ //Neighbor loop for the cell
                    if (i + idx < 0 || j + jdx < 0 || 
                        i + idx === gBoard.length || j + jdx === gBoard.length) continue
                        gBoard[i + idx][j + jdx].isShown = false
                }
            }
            renderBoard(gBoard)
        }, 1000)
    gGame.useHint = false
}

// apply modal that appears when clicking the hint button:
btn.onclick = function() {
  modal.style.display = "block"
}
span.onclick = function() {
  modal.style.display = "none"
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}