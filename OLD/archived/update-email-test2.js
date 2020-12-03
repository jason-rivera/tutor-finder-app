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
updateUserProfileAuth("Jacob OneOne");

//--------------------------------------------------------------------
// Updates the firestore user's "name", "phone", "address"
//--------------------------------------------------------------------

// function updateUserProfileFirestore(name, phone, address) {
//   firebase.auth().onAuthStateChanged(function (user) {
//       console.log("user is signed in: " + user.uid);
//       db.collection("users").doc(user.uid)
//           .update({
//               "name": name,
//               "phone": phone,
//               "address": address
//           }).then(function () {
//               console.log("updated users database");
//           }).catch(function (error) {
//               console.log("cannot update users database");
//           })
//   })
// }
// updateUserProfileFirestore("Bill Gates", "123-4567", "Seattle")