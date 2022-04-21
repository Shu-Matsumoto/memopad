// ストップウォッチの開始時刻
let swStartTime = Date.now();
// ストップウォッチの累積時刻
let oddTime = 0;
// ストップウォッチのタイマーID
let timerId;

// ストップウォッチ開始
function startStopwatch(timerDisplayAreaID) {
  
  // スタート時間のクリア
  swStartTime = Date.now();

  timerId = setInterval(refleshSWCounter, 10);

  let displayAreaId = document.getElementById(timerDisplayAreaID);
  function refleshSWCounter()
  {
    displayAreaId.innerText = getSWElapsedTimeText(Date.now() - swStartTime + oddTime);
  }
}

// ストップウォッチ停止
function stopStopwatch() {
  
  // 累積時刻の更新
  oddTime += Date.now() - swStartTime;
  // 定期処理停止
  clearInterval(timerId);
}

// ストップウォッチリセット
function resetStopwatch(timerDisplayAreaID) {
  
  // 累積時刻のクリア
  oddTime = 0;
  let displayAreaId = document.getElementById(timerDisplayAreaID);
  displayAreaId.innerText = "00:00:000";
}

function getSWElapsedTimeText(elapsedTime) {

  // m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
  var min = Math.floor(elapsedTime / 60000);

  // s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
  var sec = Math.floor(elapsedTime % 60000 / 1000);

  //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
  var msec = elapsedTime % 1000;

  //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
  //javascriptでは文字列数列を連結すると文字列になる
  //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
  min  = ('0' + min).slice(-2);
  sec  = ('0' + sec).slice(-2);
  msex = ('0' + msec).slice(-3);

  //HTMLのid　timer部分に表示させる　
  return min + ":" + sec + ":" + msec;
}
