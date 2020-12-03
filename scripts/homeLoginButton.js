function loginButton() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (!user){
			$("body").append(
			  '<a class="btn btn-primary my-2 my-sm-0 all-main-button" href="login.html" role="button">'
			+		'<div class="homepage-text">Login</div>'
			+ '</a>'
			);
		}
	});
}

loginButton();