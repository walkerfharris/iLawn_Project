$(document).ready(function() {

    // client sign up
    $('#clientSignUp').on('click', function() {
        var LSRole = "client";
        localStorage.setItem('role', LSRole);
        console.log(localStorage.getItem('role'));
    });
    $('#contSignUp').on('click', function() {
        var LSRole = "contractor";
        localStorage.setItem('role', LSRole);
        console.log(localStorage.getItem('role'));
    });
})