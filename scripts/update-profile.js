function updateProfile() { //update User fields based on input from profile.html
	$(document).ready(function () {
		$("#update-btn").click(function (){
			firebase.auth().onAuthStateChanged(function (user) {
				if (user){
					db.collection("Users").doc(user.uid).update({
						name: document.getElementById("name-text").value,
						email: document.getElementById("email-text").value,
						birthYear: document.getElementById("birth-year-text").value,
						location: document.getElementById("location-text").value,
						photoURL: document.getElementById("picture-text").value,
					})
					.then(function() {
						window.location.href = "profile.html";
					})
				}
			})
		});
	});

	$('#update-profile').submit(function () {
		return false;
	});
}
  
updateProfile();
