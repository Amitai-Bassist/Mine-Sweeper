
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

var gTens = "00"
var gSeconds = "00"
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