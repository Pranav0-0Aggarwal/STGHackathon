const firebaseConfig = {
    apiKey: "AIzaSyDdRXTl50wBB2fsZWGRd2oU8mLfgcs3fGE",
    authDomain: "horcrux-d2131.firebaseapp.com",
    databaseURL: "https://horcrux-d2131-default-rtdb.firebaseio.com",
    projectId: "horcrux-d2131",
    storageBucket: "horcrux-d2131.appspot.com",
    messagingSenderId: "842859551267",
    appId: "1:842859551267:web:ffcbcab993e52d788eef96",
    measurementId: "G-HCSBJ0H4VE"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function register () {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var user_name = document.getElementById('user_name').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid!!')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      email : email,
      user_name : user_name,
      last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).set(user_data)
    alert('User Created!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
  })
  document.getElementById('email').value=''
  document.getElementById('password').value=''
  document.getElementById('user_name').value=''
}

function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid!!')
    return
  }
  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).update(user_data)
    alert('You are Logged In!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
  })
  document.getElementById('email').value=''
  document.getElementById('password').value=''
  document.getElementById('user_name').value=''
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}