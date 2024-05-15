function validateForm() {
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;

    if (password != confirm_password) {
      document.getElementById("password_error").innerHTML = "Le password non corrispondono";
      return false;
    }
    if (password.length < 6) {
      document.getElementById("password_error").innerHTML = "Sono necessari minimo 6 caratteri";
      return false;
    }
    else
      return true;
  }

  