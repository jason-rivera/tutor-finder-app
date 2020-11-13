function logout(){
    firebase.auth().signOut().then(function () { //if successful
		console.log("user logged out");
	})
	.catch(function (error) {
		console.log("Error logging out: " + error);
	});
}