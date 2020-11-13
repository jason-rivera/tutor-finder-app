
function updateUserProfileAuth() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Your email is: ' + user.email);
  } else {
    console.log('not logged in');
  }
});

}

updateUserProfileAuth();