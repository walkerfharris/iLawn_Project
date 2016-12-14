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
      var emailText = $('#email');
      var passText = $('#password');
      var passConfText = $('#password_confirm');
      var uidText = $('#username');
      var addressText = $('#address');
      var phoneText = $('#phone');

      // Add sign up event

      $('#signUpBtn').on('click', function() {

            var email = emailText.val().trim();
            var pass = passText.val().trim();
            var passConf = passConfText.val().trim()
            var uid = uidText.val().trim();
            var address = addressText.val().trim();
            var phone = phoneText.val().trim();
            // signup verification if any field missing then it will show error message
            if ((email === '') || (pass === '') || (passConf === '') || (uid === '') || (address === '') || (phone === '')) {
              // display error message that one of the info fields is missing
              $('#error-message').html('<p>please fill all required fields</p>')
              return false;
            } else if (pass !== passConf) {
              $('#error-message').html('<p>password and password Confirm is not matching</p>')
            } else {
            // store the uid to localstorage
            localStorage.clear();
            localStorage.setItem('userKey', uid);
            console.log(localStorage.getItem('userKey'));

            // Push client info to the database
            // the uid will be treated as the key for the client entry in the DB
            var newClient = database.ref('/clients/' + uid).push({
                userid: uid,
                email: email,
                address: address,
                phone: phone,
            })
            var clientID = newClient.key;
            localStorage.setItem('newClientID', clientID);
            window.location.href = 'profile.html';
            return false;
          } // function excuted on else, ends here
        }); // signup onClick function end here


      console.log(localStorage.getItem('userKey'));
      console.log(localStorage.getItem('newClientID'));
})