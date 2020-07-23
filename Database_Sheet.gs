/**
* File Name : Database_Sheet.gs
* Language Code : Google Script(gs)
* Build Date : 23-07-2020 : 8am (Yogyakarta, Indonesia)
* Last Update : -
* Credit : Aghisna12
*/


var global_sheet_id = 'Google SpreadSheet Id';

var global_sheet_name = 'daftar_hadir';//sheet name

var akses_token = 'belajarbot';//token

/*
const kolom = {
  username:0,
  id:1,
  tanggal_hadir:2,
  jenis_kelamin:3
};
*/

function responseCors(data, callback) {
  if (data) {
    if (callback) {
      return ContentService.createTextOutput(callback + '(' + JSON.stringify(data) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
  }
  return ContentService.createTextOutput('response("Data atau Callback Kosong");').setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function auth(token) {
  if (token == akses_token) {
    return 'success';
  }
  return 'error';
}

function getSheet() {
  var sheet;
  var sheet_id = SpreadsheetApp.openById(global_sheet_id);
  if (sheet_id) {
    sheet = sheet_id.getSheetByName(global_sheet_name);
  }
  return sheet;
}

function dateNow(day = 0) {
  var date = new Date();
  if (day != 0) {
    date.setDate(date.getDate() + day);
  }
  var tanggal = Utilities.formatDate(date, 'Asia/Jakarta', 'YYYYMMddHHmm');
  return tanggal;
}

//jika user_id != -1 maka user_id sudah ada
function cobaSearch1(sheet, user_id) {
  if (sheet) {
    var len_cols = 5; /*sheet.getLastColumn();*/
    var range = sheet.getRange(1,len_cols/* + 1*/);
    var len_rows = sheet.getLastRow();
    if (range) {
      range.setFormula('=VLOOKUP("' + user_id + '", A2:B' + len_rows + ', 2, FALSE)');
      return range.getValue();
    }
  }
  return -1;
}

//jika user_id != -1 maka user_id sudah ada
//nomor baris tersedia
function cobaSearch2(sheet, user_id) {
  if (sheet) {
    var len_cols = 5; /*sheet.getLastColumn();*/
    var range = sheet.getRange(1,len_cols/* + 1*/);
    var len_rows = sheet.getLastRow();
    if (range) {
      range.setFormula('=QUERY({A2:D' + len_rows + ', ARRAYFORMULA(ROW(A2:D' + len_rows + '))}, "select Col1, Col' + (len_cols/* + 1*/) + ' where Col2 = ' + parseInt(user_id) + '")');
      var user_name = range.getValue();
      range = sheet.getRange(1,len_cols + 1);
      var index_row = range.getValue();
      return index_row;
    }
  }
  return -1;
}

function indexId(sheet, id) {
  var index = -1;
  if (sheet) {
    var range = sheet.getDataRange().getValues();
    for (var i = 1; i < range.length; i++) {
      if (range[i][1] == id) {
        index = i + 1;
        break;
      }
    }
  }
  return index;
}

function hasId(sheet, id) {
  return indexId(sheet, id) != -1;
}

function getUsers(sheet) {
  var result = {};
  if (sheet) {
    var range = sheet.getDataRange().getValues();
    if (range) {
      result['status'] = 'success';
      result['total'] = range.length - 1;
      result['now'] = dateNow();
      var data = [];
      for (var i = 1; i < range.length; i++) {
        if (range[i][0] && range[i][1] && range[i][2] && range[i][3]) {
          data.push({
            'username':range[i][0],
            'user_id':range[i][1],
            'tanggal_hadir':range[i][2],
            'jenis_kelamin':range[i][3]
          });
        }
      }
      result['data'] = data;
    }
  } else {
    result['status'] = 'failed';
    result['data'] = 'sheet tidak ditemukan';
  }
  return result;
}

function getUser(sheet, user_id) {
  var result = {};
  if (sheet) {
    var range = sheet.getDataRange().getValues();
    if (range) {
      result['status'] = 'success';
      result['total'] = range.length - 1;
      result['now'] = dateNow();
      var data = [];
      for (var i = 1; i < range.length; i++) {
        if ((range[i][0] && range[i][1] && range[i][2] && range[i][3]) && range[i][1] == user_id) {
          data.push({
            'username':range[i][0],
            'user_id':range[i][1],
            'tanggal_hadir':range[i][2],
            'jenis_kelamin':range[i][3]
          });
        }
      }
      result['data'] = data;
    }
  } else {
    result['status'] = 'failed';
    result['data'] = 'sheet tidak ditemukan';
  }
  return result;
}

function addUser(param, sheet, token) { 
  var result = {}
  if (!token || (token && auth(token) != 'success')) {
    result['status'] = 'failed';
    result['data'] = 'token kosong/salah';
    return result;
  }
  var username = param.parameter.username;
  if (username) {
    var user_id = param.parameter.user_id;
    if (user_id) {
      if (sheet) {
        if (!hasId(sheet, user_id)) {
          var tanggal_hadir = param.parameter.tanggal_hadir;
          if (!tanggal_hadir) {
            tanggal_hadir = dateNow();
          }
          var jenis_kelamin = param.parameter.jenis_kelamin;
          if (jenis_kelamin) {
            var res = sheet.appendRow([username, user_id, tanggal_hadir, jenis_kelamin]);
            if (res) {
              result['status'] = 'success';
              result['data'] = {'username':username, 'user_id':user_id, 'tanggal_hadir':tanggal_hadir, 'jenis_kelamin':jenis_kelamin};
            } else {
              result['status'] = 'failed';
              result['data'] = 'gagal menambahkan data';
            }
          } else {
            result['status'] = 'failed';
            result['data'] = 'parameter jenis_kelamin kosong';
          }
        } else {
          result['status'] = 'failed';
          result['data'] = 'user_id sudah ada';
        }
      } else {
        result['status'] = 'failed';
        result['data'] = 'sheet tidak ditemukan';
      }
    } else {
      result['status'] = 'failed';
      result['data'] = 'parameter user_id kosong';
    }
  } else {
    result['status'] = 'failed';
    result['data'] = 'parameter username kosong';
  }
  return result;
}

function delUser(param, sheet, token) {
  var result = {};
  if (!token || (token && auth(token) != 'success')) {
    result['status'] = 'failed';
    result['data'] = 'token kosong/salah';
    return result;
  }
  var user_id = param.parameter.user_id;
  if (user_id) {
    if (sheet) {
      var index = indexId(sheet, user_id);
      if (index != -1) {
        var res = sheet.deleteRow(index);
        if (res) {
          result['status'] = 'success';
          result['data'] = {'id':user_id};
        } else {
          result['status'] = 'failed';
          result['data'] = 'gagal menghapus data';
        }
      } else {
        result['status'] = 'failed';
        result['data'] = 'user_id tidak ditemukan';
      }
    } else {
      result['status'] = 'failed';
      result['data'] = 'sheet tidak ditemukan';
    }
  } else {
    result['status'] = 'failed';
    result['data'] = 'parameter user_id kosong';
  }
  return result;
}

function doGet(param) {
  var action = param.parameter.action;
  var sheet = getSheet();
  var token = param.parameter.token;
  
  switch(action) {
    case 'auth':
      return responseCors(auth(token), 'initialize');
      break;
    case 'getusers':
      return responseCors(getUsers(sheet), 'setusers');
      break;
    case 'adduser':
      return responseCors(addUser(param, sheet, token), 'response');
      break;
    case 'deluser':
      return responseCors(delUser(param, sheet, token), 'response');
      break;
    default:
      return HtmlService.createHtmlOutput('<!DOCTYPE html><html><head><title>Belajar Bot</title></head><body><center><h1>Belajar Bot Telegram<hr>Aghisna12 &copy; 2020</h1></center></body></html>');
  }
}
