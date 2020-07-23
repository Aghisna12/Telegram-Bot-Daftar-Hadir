/**
* File Name : Bot_Daftar_Hadir.gs
* Language Code : Google Script(gs)
* Build Date : 23-07-2020 : 8am (Yogyakarta, Indonesia)
* Last Update : -
* Credit : Aghisna12
*/


var bot = new Telegram('TOKEN BOT TELEGRAM');

//format waktu/tanggal dari variable datetime
function formatWaktu(datetime) {
  var bulan_lengkap = ['error','jan','feb','mar','apr','mei','jun','jul','agust','sep','okt','nov','des'];
  var hasil = "";
  datetime = datetime.toString();
  if (datetime.length == 12) {
    var tahun = datetime.slice(0, 4);
    var bulan = datetime.slice(4, 6);
    var hari = datetime.slice(6, 8);
    var jam = datetime.slice(8, 10);
    var menit = datetime.slice(10, 12);
    hasil = hari + "-" + bulan_lengkap[parseInt(bulan)] + "-" + tahun + " " + jam + ":" + menit;
  }
  return hasil;
}

function prosesPesan(update) {
  // detek klo ada pesan dari user
  if (update.message) { 

    // penyederhanaan variable
    var msg = update.message;
    var text = msg.text;
    var chat_id = msg.chat.id;
    var user = msg.from;
    var user_id = user.id;

    // jika user ketik /ping, bot akan jawab Pong!
    if ( /\/hadir/i.exec(text) ){
      var user_index = indexId(getSheet(), user_id);
      if (user_index != -1) {
        var result = getUser(getSheet(), user_id);
        if (result) {
          if (result.status == 'success') {
            var datas = result.data[0];
            var pesan = 'Maaf, Anda sudah terdaftar hadir.\n\n```\nUsername : ' + datas.username + '\nUser Id : ' + datas.user_id + '\nTanggal Hadir : ' + formatWaktu(datas.tanggal_hadir) + '\nJenis Kelamin : ' + datas.jenis_kelamin + '```';
            return bot.sendMessage(chat_id, pesan, {parse_mode:'markdown'});
          } else {
            var datas = result.data;
            var pesan = 'Maaf, terjadi kesalahan.\n\n```data : ' + datas.data + '```';
            return bot.sendMessage(chat_id, pesan, {parse_mode:'markdown'});
          }
        }
      }
      
      var username = '';
      
      if (user.username) {
        username = user.username;
      }
      
      if (username != '') {
        var pesan = 'Silakan pilih jenis kelamin';
        var keyboard = {
          'inline_keyboard':[[{'text':'Laki-Laki','callback_data':'hadir_' + username + '_' + user_id + '_laki-laki'}],[{'text':'Perempuan','callback_data':'hadir_' + username + '_' + user_id + '_perempuan'}]]
        };
        return bot.sendMessage(chat_id, pesan, {reply_markup:keyboard});
      } else {
        var pesan = 'Maaf, username akun Anda kosong. silakan buat username akun Anda.';
        return bot.sendMessage(chat_id, pesan);
      }
    }
  } else if (update.callback_query) {
    var query = update.callback_query;
    var msg_id = query.message.message_id;
    var chat_id = query.message.chat.id;
    var data = query.data;
    
    if(data.includes('hadir_')) {
      var hadir_r = data.split('_');
      if (hadir_r.length == 4) {
        var param = {
          parameter:{
            username:hadir_r[1],
            user_id:hadir_r[2],
            tanggal_hadir:dateNow(),
            jenis_kelamin:hadir_r[3]
          }
        };
        var result = addUser(param, getSheet(), akses_token);
        if (result) {
          if (result.status == 'success') {
            var datas = result.data;
            var pesan = 'Terimakasih, Anda berhasil terdaftar hadir.\n```\nUsername : ' + datas.username + '\nUser Id : ' + datas.user_id + '\nTanggal Hadir : ' + formatWaktu(datas.tanggal_hadir) + '\nJenis Kelamin : ' + datas.jenis_kelamin + '```';
            bot.sendMessage(chat_id, pesan, {parse_mode:'markdown'});
          } else {
            var datas = result.data;
            var pesan = 'Maaf, terjadi kesalahan.\n\n```data : ' + datas + '```';
            bot.sendMessage(chat_id, pesan, {parse_mode:'markdown'});
          }
        }
      }
    }
  }
}

function doPost(query) {
  // Memastikan pesan yang diterima hanya dalam format JSON
  if(query.postData.type == "application/json") {
    
    // Kita parsing data yang masuk
    var update = JSON.parse(query.postData.contents);
    
    // Jika data pesan update valid, kita proses
    if (update) {
      prosesPesan(update);
    }
  }
}

//Test Case
/*
function generateUsers() {
  var jenis_kelamin = ['laki-laki', 'perempuan'];
  for (var i = 1; i <= 5; i++) {
    var jenkel = jenis_kelamin[Math.floor(Math.random() * jenis_kelamin.length)];
    var param = {
      parameter:{
        username:'test' + String(i),
        user_id:i,
        tanggal_hadir:dateNow(),
        jenis_kelamin:jenkel
      }
    };
    addUser(param, getSheet(), akses_token);
  }
}

function testSpeed() {
  var start = +new Date();
  for (var i = 0; i < 10; i++) {
    var index = indexId(getSheet(), 599);
    //var index = cobaSearch1(getSheet(), "599");
    //var index = cobaSearch2(getSheet(), "599");
  }
  var end =  +new Date();
  var diff = end - start;
  Logger.log(index + "|" + diff);
}

function testSheet() {
  var result = getUser(getSheet(), 445372887);
  Logger.log(result);
}
*/
