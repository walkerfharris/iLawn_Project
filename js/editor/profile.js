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

      $('#profile-header').html('Welcome ' + localStorage.getItem('userKey'));
      $('#account-info').html(localStorage.getItem('userKey'));
      // retrieve the username and pushID or the uuid from the local storage

      var userName = localStorage.getItem('userKey')
      console.log(userName);
      database.ref('/clients/' + userName).on('value', function(snapshot) {
          // log the client data to the console
          console.log(snapshot.val());
          console.log(snapshot.val().userid);
          console.log(snapshot.val().email);
          console.log(snapshot.val().address);
          console.log(snapshot.val().phone);
          $('#name').html('<h3>' + snapshot.val().userid + '</h3>')
          $('#address').html('<h4><i class="fa fa-map-marker fa-2" aria-hidden="true"></i> ' + snapshot.val().address + '</h4>')
          $('#email').html('<h5><i class="fa fa-envelope fa-2" aria-hidden="true"></i> ' + snapshot.val().email + '</h5>')
          $('#phone').html('<h5><i class="fa fa-phone-square fa-2" aria-hidden="true"></i> ' + snapshot.val().phone + '</h5>')
      })

      $('#signOutBtn').on('click', function() {
          window.location.href = 'index.html';
          return false;
      })

});