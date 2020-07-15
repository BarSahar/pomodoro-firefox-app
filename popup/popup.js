

function updateTimer(page) {
  let currTime = page.currTime;
  let currInterval = page.currInterval;
  let isFocused = page.isFocused;
  var maxInterval = 4;

  var minutes = Math.floor((currTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((currTime % (1000 * 60)) / 1000);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  
  $('#timer').text(minutes + ':' + seconds);
  $('#iteration').text(currInterval + '/' + maxInterval);

}

function onError(error) {
  console.log(`Error: ${error}`);
}

function timerTick() {
  browser.runtime.getBackgroundPage().then(updateTimer, onError);
}

function initClickListener() {
  $('#start').on("click", (e) => {
    $('#start').hide();
    $('#pause').show();
    browser.runtime.sendMessage({
      command:"start"
    })
  });
  $('#pause').on("click", (e) => {
    $('#start').show();
    $('#pause').hide();
    browser.runtime.sendMessage({
      command:"pause"
    })
  });
  $('#reset').on("click", (e) => {
    browser.runtime.sendMessage({
      command:"reset"
    })
  });
}

$('#pause').hide();
initClickListener();
timerTick();
setInterval(timerTick, 500);