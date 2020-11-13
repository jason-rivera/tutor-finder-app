//--------------------------------------------------------------------
// Updates the firestore user's "name", "phone", "address"
//--------------------------------------------------------------------
function updateUserProfileFirestore(email) {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("Users").doc(user.uid).update({
              "email": email,
          }).then(function () {
              console.log("updated email in firestore, but not auth");
          }).catch(function (error) {
              console.log("failed to update email");
          })

          db.collection("Users").doc(user.uid).get().then(function(doc){
            var n = doc.data().name;
            document.getElementById("hello").innerText = "Hello " + n;
  })

});


}
updateUserProfileFirestore("johnsoncashili@cash.com");

// var user = firebase.auth().currentUser;

// user.updateEmail("user@example.com").then(function() {
// // Update successful.
// }).catch(function(error) {
// // An error happened.
// });

//--------------------------------------------------------------------
// Updates the authenticated user's "displayName"
//--------------------------------------------------------------------
// function updateUserProfileAuth(name) {
//     firebase.auth().onAuthStateChanged(function (user) {
//         console.log("old email: " + user.email);
//         user.updateProfile({
//             email: name
//         }).then(function () {
//             console.log("updated authenticated user profile");
//             console.log("new display name: " + user.email);
//         }).catch(function (error) {
//             console.log("authenticated user profile update failed");
//         })
//     })
// }
// updateUserProfileAuth("johnsoncashili@gmail.com");


