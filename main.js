let socket = io();
      function setUsername() {
         socket.emit('setUsername', document.getElementById('name').value);
      };
      let user;
      socket.on('userExists', function(data) {
         document.getElementById('error-container').innerHTML = data;
      });
      socket.on('userSet', function(data) {
         user = data.username;
         document.body.innerHTML = '<h4 style="text-align:center"><strong><u>Send Message</u></strong></h4><div class="row mt-2" style="justify-content:center;display:flex"><div class="col-sm-6"><input class="form-control" type = "text" placeholder="Type message. . ." id = "message"></div>\
         <div class="col-sm-1"><button style="background: transparent;border: none" type = "button" id= "sender" name = "button" onclick = "sendMessage(); "><span style="padding:5px;" class="material-icons">send</span></button></div></div>\
         <br/><div id = "message-container" class="senderMSG"></div>';
      });

      function sendMessage() {
         let msg = document.getElementById('message').value;
         if(msg) {
            socket.emit('msg', {message: msg, user: user});
         }
      }

      socket.on('newmsg', function(data) {
         if(user) {
            document.getElementById('message').value = "";
            document.getElementById('message-container').innerHTML += 
            '<div class="yours messages"><div class="message last"> ' + data.message + ' </div><small class="chat-user"><strong style="position: relative;left: 20px;top: -5px;">'+ data.user +'</strong></small> </div>'
         }
      })