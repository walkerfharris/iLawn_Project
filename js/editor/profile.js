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

      // setting a mock payment for demo purposes
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
      // submit a payment

      $('.submitBtn').on('click', function() {
        $('#cardName').empty();
        $('#cardNumber').empty();
        $('#cardDate').empty();
        $('#cardZip').empty();
        $('#payment-message').html('Thanks for choosing iLawn Services, your payment of $10.82 have been submitted')
      })

      // here the weather forecast will be shown - using openweathermap.org api
      function weatherForcast() {
        var myCity = 'Houston';
        var myKey = '5390e1033cebf65be8bffb26609e1dfb'
        var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + myCity + ',us&mode=json&appid=' + myKey;
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: 'GET',
        }).done(function(response) {
          console.log(response);
          console.log(response.list.length);
          for (var i = 2; i < response.list.length; i += 8) {
            var myForecastImg;
            var myWeaCondition;
            var date = response.list[i].dt_txt;
            var weaCond = response.list[i].weather[0].main;
            console.log(weaCond);
            console.log(date);
            var convert = moment(new Date(date));
            var convertedDate = moment(convert).format("ddd, MMM DD");
            console.log(convertedDate);
            var dayForecast = $('<div>');
            dayForecast.addClass('col-md-3 btn text-center dayForecast');
            if (weaCond == 'Rain') {
              myForecastImg = 'img/weather/rainy.png'
              myWeaCondition = "Rainy"
            } else if (weaCond == 'Clear') {
              myForecastImg = 'img/weather/sunny.png'
              myWeaCondition = "Clear"
            } else if (weaCond == 'Clouds') {
              myForecastImg = 'img/weather/pcloudy.png'
              myWeaCondition = "Cloudy"
            }
            var forecastDate = $('<p>').text(convertedDate);
            var forecastImg = $('<img>').attr('src', myForecastImg);
            var weaCondition = $('<p>').text(myWeaCondition);
            // append the weather info to the weather-here
            dayForecast.prepend(forecastDate);
            dayForecast.append(forecastImg);
            dayForecast.append(weaCondition);
            $('#weather-here').append(dayForecast);
          }
        }); // response function ends here
      } // weatherForcast function ends here
      weatherForcast();
});