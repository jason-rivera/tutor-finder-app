//--------------------------------------------------------------------
// Updates the authenticated user's "displayName"
//--------------------------------------------------------------------
function updateUserProfileAuth(name) {
  firebase.auth().onAuthStateChanged(function (user) {
      console.log("user is signed in: " + user.uid);
      console.log("old display name: " + user.displayName);
      user.updateProfile({
          displayName: name
      }).then(function () {
          console.log("updated authenticated user profile");
          console.log("new display name: " + user.displayName);
      }).catch(function (error) {
          console.log("authenticated user profile update failed");
      })
  })
}
updateUserProfileAuth("Bill Gates");

