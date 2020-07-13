var currTime = 0;
var currInterval = 0;
var isFocused = true;

(function() {
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    let timer;
    const focusTime = 20*60*1000;
    const freeTime = 10*60*1000;
    const superFreeTime = 30*60*1000;
    const timeTick = 1000;
    const maxIntervals = 4;
    

    browser.runtime.onMessage.addListener((message) => {
      if(message.command === "start") {
        resetVars();
        timer = setInterval(timerTick, timeTick);
      } else if(message.command === "pause") {
        //is pause or resume??
        clearInterval(timer);
      } else if(message.command === "reset") {
        //first pause it
        resetVars();
      }

    });

    function timerTick() {
      currTime -= timeTick;
      
      if(currTime > 0) {
        return; 
      }
      
      // browser.runtime.sendMessage({
      //   command:"done",

      //   timeLeft:currTime,
      //   overAllTime:-1,
      //   isInFocus:isFocused
      // })
    
      
      //play sound?
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