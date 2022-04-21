// アラーム管理で使う関数、変数定義
const MAX_ALARM = 3;
// アプリ情報をJSON保存する際のデータID
const WATCH_APP_DATA_ID = "WatchAppData";
// アラームリスト
var AlarmList = [
  [false, 0, 0],
  [false, 0, 0],
  [false, 0, 0],
];
const INDEX_ALARM_ENABLE = 0;
const INDEX_ALARM_HOUR = 1;
const INDEX_ALARM_MIN = 2;

// アラーム追加
// timesetはオブジェクト
function addAlarm(alarmId, timeset) {
  if (alarmId >= MAX_ALARM)
  {
    return -1;
  }

  AlarmList[alarmId][INDEX_ALARM_ENABLE] = true;
  AlarmList[alarmId][INDEX_ALARM_HOUR] = timeset.hour;
  AlarmList[alarmId][INDEX_ALARM_MIN] = timeset.min;
}

// アラーム無効化
function disableAlarm(alarmId) {
  if (alarmId >= MAX_ALARM)
  {
    return -1;
  }

  AlarmList[alarmId][INDEX_ALARM_ENABLE] = false;
  AlarmList[alarmId][INDEX_ALARM_HOUR] = 0;
  AlarmList[alarmId][INDEX_ALARM_MIN] = 0;
}

// アラームリスト取得
function getAlarmList() {
  return AlarmList;
}

// アラームリスト保存
function saveAlarmList() {
  
  let obj = {
		alm1:{
			enable :AlarmList[0][INDEX_ALARM_ENABLE],
			hour :AlarmList[0][INDEX_ALARM_HOUR],
			min :AlarmList[0][INDEX_ALARM_MIN]
		},
		alm2:{
			enable :AlarmList[1][INDEX_ALARM_ENABLE],
			hour :AlarmList[1][INDEX_ALARM_HOUR],
			min :AlarmList[1][INDEX_ALARM_MIN]
    },
    alm3:{
			enable :AlarmList[2][INDEX_ALARM_ENABLE],
			hour :AlarmList[2][INDEX_ALARM_HOUR],
			min :AlarmList[2][INDEX_ALARM_MIN]
		},
	};

  let jsonData = JSON.stringify(obj);
  localStorage.setItem(WATCH_APP_DATA_ID, jsonData);
}

// アラームリストロード
function loadAlarmList() {

  if (localStorage.getItem(WATCH_APP_DATA_ID)) {
    const jsonData = localStorage.getItem(WATCH_APP_DATA_ID);
    const data = JSON.parse(jsonData);

    AlarmList[0][INDEX_ALARM_ENABLE] = data.alm1.enable;
    AlarmList[0][INDEX_ALARM_HOUR] = data.alm1.hour;
    AlarmList[0][INDEX_ALARM_MIN] = data.alm1.min;

    AlarmList[1][INDEX_ALARM_ENABLE] = data.alm2.enable;
    AlarmList[1][INDEX_ALARM_HOUR] = data.alm2.hour;
    AlarmList[1][INDEX_ALARM_MIN] = data.alm2.min;

    AlarmList[2][INDEX_ALARM_ENABLE] = data.alm3.enable;
    AlarmList[2][INDEX_ALARM_HOUR] = data.alm3.hour;
    AlarmList[2][INDEX_ALARM_MIN] = data.alm3.min;
  }
}

// アラーム設定初期化
function initAlarmSetting()
{
  loadAlarmList();

  $("#alarm_onoff_check1").prop('checked', AlarmList[0][INDEX_ALARM_ENABLE]);
  $("#option_select_H_1").val(AlarmList[0][INDEX_ALARM_HOUR]);
  $("#option_select_M_1").val(AlarmList[0][INDEX_ALARM_MIN]);

  $("#alarm_onoff_check2").prop('checked', AlarmList[1][INDEX_ALARM_ENABLE]);
  $("#option_select_H_2").val(AlarmList[1][INDEX_ALARM_HOUR]);
  $("#option_select_M_2").val(AlarmList[1][INDEX_ALARM_MIN]);
  
  $("#alarm_onoff_check3").prop('checked', AlarmList[2][INDEX_ALARM_ENABLE]);
  $("#option_select_H_3").val(AlarmList[2][INDEX_ALARM_HOUR]);
  $("#option_select_M_3").val(AlarmList[2][INDEX_ALARM_MIN]);
}

// チェックボックスイベントハンドラ
function setOnOChangeEvent(id, index) {
  let onoff1 = document.getElementById(id);
  onoff1.addEventListener("change", () => {

    AlarmList[index][INDEX_ALARM_ENABLE] = onoff1.checked;
    saveAlarmList();
  })
}
setOnOChangeEvent("alarm_onoff_check1", 0);
setOnOChangeEvent("alarm_onoff_check2", 1);
setOnOChangeEvent("alarm_onoff_check3", 2);

// 時間変更イベントハンドラ
function setHourChangeEvent(id, id2, index) {
  let obj = document.getElementById(id);
  obj.addEventListener("change", () => {
    AlarmList[index][INDEX_ALARM_HOUR] = $(id2).val();
    saveAlarmList();
  })
}
setHourChangeEvent("option_select_H_1", "#option_select_H_1", 0);
setHourChangeEvent("option_select_H_2", "#option_select_H_2", 1);
setHourChangeEvent("option_select_H_3", "#option_select_H_3", 2);

// 分変更イベントハンドラ
function setMinChangeEvent(id, id2, index) {
  let obj = document.getElementById(id);
  obj.addEventListener("change", () => {
    AlarmList[index][INDEX_ALARM_MIN] = $(id2).val();
    saveAlarmList();
  })
}
setMinChangeEvent("option_select_M_1", "#option_select_M_1", 0);
setMinChangeEvent("option_select_M_2", "#option_select_M_2", 1);
setMinChangeEvent("option_select_M_3", "#option_select_M_3", 2);

