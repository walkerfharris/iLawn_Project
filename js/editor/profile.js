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
      // retrieve the username from the local storage
      var userName = localStorage.getItem('userKey')
      console.log(userName);
      // retrieve the client data and info from the database
      database.ref('/clients/' + userName).on('value', function(snapshot) {
          // log the client data to the console
          console.log(snapshot.val());
          console.log(snapshot.val().userid);
          console.log(snapshot.val().email);
          console.log(snapshot.val().address);
          console.log(snapshot.val().phone);
          // change the html to reflect the client name, address and contact info
          $('#name').html('<h3>' + snapshot.val().userid + '</h3>')
          $('#address').html('<h4><i class="fa fa-map-marker fa-2" aria-hidden="true"></i> ' + snapshot.val().address + '</h4>')
          $('#email').html('<h5><i class="fa fa-envelope fa-2" aria-hidden="true"></i> ' + snapshot.val().email + '</h5>')
          $('#phone').html('<h5><i class="fa fa-phone-square fa-2" aria-hidden="true"></i> ' + snapshot.val().phone + '</h5>')
      })
      // onclick event listener to sign out from the current profile when signOutBtn clicked
      $('#signOutBtn').on('click', function() {
          window.location.href = 'index.html';
          return false;
      })
      var basePrice = 19.99;
      var firstDisc = 0.50;
      var tax = 0.0825;
      var taxAmount = (basePrice * firstDisc) * tax;
      var total = (basePrice * firstDisc) + taxAmount

      console.log(total);
      console.log(taxAmount);
      // provide a one time service qoute when oneTimeBtn clicked
      // this is only for demonstrating the service type and qoute
      $('#OneTimeBtn').on('click', function() {
          $('#subtotal').html('$' + basePrice);
          $('#discount').html('50%');
          $('#tax').html('$0.82')
          $('#total').html('$10.82')
      })
      // subscribe to continous service qoute billed monthly when monthlyBtn clicked
      // this is only for demonstrating the service type and qoute
      $('#monthlyBtn').on('click', function() {
          $('#subtotal').html('$' + basePrice);
          $('#discount').html('50%');
          $('#tax').html('$0.82')
          $('#total').html('$10.82')
      })
});