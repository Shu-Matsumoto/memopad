// 現在時刻文字列取得
function getCurrentTimeText(){
  let nowTime = new Date(); //  現在日時を得る
  let nowHour = nowTime.getHours(); // 時を抜き出す
  let nowMin  = nowTime.getMinutes(); // 分を抜き出す
  let nowSec  = nowTime.getSeconds(); // 秒を抜き出す

  let timeString = nowHour + ":" + nowMin + ":" + nowSec;
  return timeString;
}
      