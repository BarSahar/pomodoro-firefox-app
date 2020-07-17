let currTime = 0;
let currInterval = 0;
let isFocused = true;

(function() {
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    let timer;
    let audio = new Audio('asset/alarm.mp3');
    
    const focusTime = 20*60*1000;
    const freeTime = 10*60*1000;
    const superFreeTime = 30*60*1000;
    const timeTick = 1000;
    const maxIntervals = 4;
    

    browser.runtime.onMessage.addListener((message) => {
      switch(message.command) {
        case "start" :
          resetVars();
          timer = setInterval(timerTick, timeTick);
          break;
        case "pause" :
          clearInterval(timer);
          break;
        case "reset" :
          clearInterval(timer);
          resetVars();
          break;
      }
    });

    function timerTick() {
      currTime -= timeTick;
      
      if(currTime > 0) {
        return; 
      }    
      setupNextIteration();
      
      audio.play();
      if (isFocused) {
        alert("Focus time!");
      } else {
        alert("Break time, Facebook away!");
      }
    }
    
    function setupNextIteration() {
      isFocused = !isFocused;
      currInterval++;
    
      if(currInterval != maxIntervals) {
        currTime = isFocused ? focusTime : freeTime;
        return;
      }
    
      currInterval = -1;
      currTime = superFreeTime;
    }

    function resetVars() {
      currTime = focusTime;
      currInterval = 0;
      isFocused = true;
    }
  
  })();