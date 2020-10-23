$(document).ready(function() {
  var signUpForm = $("form.form-signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var ageInput = $("input[name = 'choice']");
  var ageVerifyForm = $("form.form-ageVerify");
  var nameInput = $("input#name-input");

  ageVerifyForm.on("submit", function(event){
      event.preventDefault();
      
      if (ageInput[0].checked === false && ageInput[1].checked === false){
          alert("Please select one of the options below");
      } else if (ageInput[0].checked){
        signUpForm.removeClass("hide");
        ageVerifyForm.addClass("hide");
      } else if (ageInput[1].checked){
          alert("You must be 21 or older to create an account");
          window.location.replace("/");
      }
  });


  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.name || !userData.email || !userData.password) {
      return;
    }
    
    signUpUser(userData.name, userData.email, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  function signUpUser(name, email, password) {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/profile");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});