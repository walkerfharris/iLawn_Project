$(document).ready(function() {
    // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCLWRw68W89mSHVL6akIaPNK2qxcqRaWPQ",
        authDomain: "ilawnproject.firebaseapp.com",
        databaseURL: "https://ilawnproject.firebaseio.com",
        storageBucket: "ilawnproject.appspot.com",
        messagingSenderId: "751810048512"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      // capture the input elements
      var uidText = $('#username');
      var passText = $('#password');

      // Add sign up event

      $('#signInBtn').on('click', function() {

            var uid = uidText.val().trim();
            var userPass = passText.val().trim();
            var dbPass;

            localStorage.clear();
            localStorage.setItem('userKey', uid);
            console.log(localStorage.getItem('userKey'));

            if (uid == 'admin123') {
              if (userPass == '123456') {
                window.location.href = 'admin.html';
                return false;
              } else {
                $('#error-message').html('<p>*User name or password is incorrect</p>')
              }
            }

            database.ref('/clients/' + uid).on('value', function(snap) {
              console.log(snap.val());
              dbPass = snap.val().pass;
            });

            database.ref('/clients').on('value', function(snapshot) {
              console.log(snapshot.val());
              console.log(dbPass);
              console.log(userPass);
              if (!snapshot.child(uid).exists()) {
                $('#error-message').html('<p>*This user is not exist in our records</p>')
              } else if (userPass != dbPass) {
                $('#error-message').html('<p>*User name or password is incorrect</p>')
                return false;
              }
              else {
                window.location.href = 'profile.html';
                return false;
              }
            });
      });

});