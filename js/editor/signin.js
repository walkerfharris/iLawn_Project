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
            var pass = passText.val().trim();

            localStorage.clear();
            localStorage.setItem('userKey', uid);
            console.log(localStorage.getItem('userKey'));

            database.ref('/clients/' + uid).on('value', function(snapshot) {
              console.log(snapshot.val());
            });
            window.location.href = 'profile.html';
            return false;
      });

});