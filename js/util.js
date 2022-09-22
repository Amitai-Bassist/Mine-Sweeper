
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

var tens = "00"
var seconds = "00"
function clock(){
    var eltens = document.querySelector('.tens') 
    var elseconds = document.querySelector('.seconds') 
    
      tens++; 
    if(tens <= 9){
        eltens.innerHTML = "0" + tens
    } 
    if (tens > 9){
        eltens.innerHTML = tens
    }   
    if (tens > 99) {
        seconds++;
        elseconds.innerHTML = "0" + seconds
        tens = 0;
        eltens.innerHTML = "0" + 0
    }  
    if (seconds > 9){
        elseconds.innerHTML = seconds
    }
}