
var timer;

var currTime;
var currInterval;
var isFocused;

const focusTime = 20*60*1000;
const freeTime = 10*60*1000;
const superFreeTime = 30*60*1000;
const timeTick = 1000;
const maxIntervals = 4;

function timerTick() {
  console.log("timerTick")

  currTime -= timeTick;
  
  var minutes = Math.floor((currTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((currTime % (1000 * 60)) / 1000);
  $('#timer').innerHTML(minutes + ':' + seconds);

  if(currTime > 0) {
    return;
  }
  
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

function initVars() {
  currTime = focusTime;
  currInterval = 0;
  isFocused = true;
}

function listenForClicks() {
  $('#start').on("click", (e) => {

    initVars();
    // var tmr = require('timer');
    // debugger;

    // tmr.setInterval(timerTick, timeTick); 
    // timer = setInterval(timerTick, timeTick);  
    setInterval(timerTick, timeTick);  
  });
  // $('#pause').on("click", (e) => {
  //   //is pause or resume??
  //   clearInterval(timer);
  // });
  // $('#reset').on("click", (e) => {
  //   //first pause it
  //   initVars();
  // });
}


function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`bar error: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

listenForClicks();