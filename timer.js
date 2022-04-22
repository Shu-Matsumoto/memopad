
let onDoing = false;
$("#startButton").on("click", () => {
  if (onDoing)
  {
    // 停止ボタン
    onDoing = false;
    stopRequest = true;
    stopTimer();
    clearInterval(pollingStopRequest);
    $("#startButton").text("開始");
  }
  else
  {
    // 開始ボタン
    onDoing = true;
    stopRequest = false;
    isExecutuing = true;
    $("#startButton").text("停止");
    stratTimer();
  }
})

let countdownFunction;
let pollingFunction;
let isExecutuing = false;
let stopRequest = false;

// タイマー開始
function stratTimer() {

  const h = $("#option_select_H").val();
  const m = $("#option_select_M").val();
  const s = $("#option_select_S").val();

  let now = new Date();
  let goal = new Date();
  let totalSec = Number(h) * 3600 + Number(m) * 60 + Number(s);
  goal.setSeconds(goal.getSeconds() + totalSec);

  function refreshTimer() {
    const diff = goal - new Date(); //時間の差を取得（ミリ秒）

    let timerText = "";

    // ストップフラグ
    if (stopRequest) { return;}
    if (diff <= 0) {
      stopRequest = true;
      timerText = "0:00:00";
    } else {
      //ミリ秒から単位を修正
      const calcHour = Math.floor(diff / 1000 / 60 / 60);
      const calcMin = Math.floor(diff / 1000 / 60) % 60;
      const calcSec = Math.floor(diff / 1000) % 60;

      //取得した時間を表示（2桁表示）
      let hText = calcHour < 10 ? '0' + calcHour : calcHour;
      let mText = calcMin < 10 ? '0' + calcMin : calcMin;
      let sText = calcSec < 10 ? '0' + calcSec : calcSec;
      timerText = hText + ":" + mText + ":" + sText;
    }
    
    $("#countdownTime").text(timerText);
  }

  countdownFunction = setInterval(refreshTimer, 500);
  pollingFunction = setInterval(pollingStopRequest,100);
}

function pollingStopRequest()
{
  // カウントダウン関数定期実行を停止
  if (stopRequest && isExecutuing)
  {
    stopTimer();
    showPopupForTimerComplete();
  }
}

function stopTimer() {
  clearInterval(countdownFunction);
  isExecutuing = false;
}

function init() {
  $("#startButton").text("開始");
}

// タイマー完了時のポップアップ表示
function showPopupForTimerComplete() {

  var popup = document.getElementById("js-popup");
  if (!popup) { return; }
  popup.classList.add("is-show");

  var blackBg = document.getElementById("js-black-bg");
  var closeBtn = document.getElementById("js-close-btn");

  closePopUp(blackBg);
  closePopUp(closeBtn);

  function closePopUp(elem) {
    if (!elem) { return; }
    elem.addEventListener("click", function() {
      popup.classList.remove("is-show");
      init();
    })
  }
}