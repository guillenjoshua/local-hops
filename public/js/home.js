$(document).ready(function(){
    $(".login-home").on("click", function(event){
        event.preventDefault();
        window.location.replace("/login");
    });

    $(".signup-home").on("click", function(event){
        event.preventDefault();
        window.location.replace("/signup");
    });
})