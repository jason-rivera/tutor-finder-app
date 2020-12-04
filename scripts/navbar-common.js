function addNavbarCommon(currentPage) {
	let fileName = String(currentPage.split("/").slice(-1)); 
	
	let pagenames = new Map([
		['index.html', "Home"],
		['profile.html', "Profile"],
		['searchV2.html', "Search"],
		['sessions.html', "Sessions"],
		['tutor-form.html', "Tutor Form"],
		['reviews.html', "Reviews"],
		['sessions-tutor.html', "Accept Session"],
		['login.html', "Login"]
	])

	if (!pagenames.has(fileName)) {
		fileName = 'index.html'
		console.log("pagename does not exist, using default");
	}

	console.log("filename: " + fileName)
	console.log(pagenames.get(fileName))

	$("body").prepend(
		'<nav id="navBarCommonBar" class="navbar navbar-expand-xl navbar-dark bg-dark">'
		+	'	<a class="navbar-brand" href="#">' + pagenames.get(fileName) + '</a>'
		+	'	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">'
		+	'		<span class="navbar-toggler-icon"></span>'
		+	'	</button>'
		+	'	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">'
		+	'		<div class="navbar-nav">'
		+	'			<a id="navButton_Home" class="nav-item nav-link" href="index.html">Home</a>'
		+	'			<a id="navButton_Search" class="nav-item nav-link" href="searchV2.html">Search</a>'
		+	'			<a id="navButton_Sessions" class="nav-item nav-link" href="sessions.html">Sessions</a>'
		+	'			<a id="navButton_Tutor" class="nav-item nav-link" href="tutor-form.html">Tutor Form</a>'
		+	'			<a id="navButton_SessionsTutor" class="nav-item nav-link" href="sessions-tutor.html">Tutor Sessions</a>'
		+	'			<a id="navButton_Reviews" class="nav-item nav-link" href="reviews.html">Reviews</a>'
		+	'			<a id="navButton_Profile" class="nav-item nav-link" href="profile.html">Profile</a>'
		+	'			<a id="navButton_Login"class="nav-item nav-link" href="login.html">Log In</a>'
		+	'		</div>'
		+	'	</div>'
		+	'</nav>'
		);
		
		$('a[href="'+fileName+'"').addClass("active")

		$('#navButton_Profile').hide()
		$('#navButton_Sessions').hide()
		$('#navButton_Sessions').hide()
		$('#navButton_SessionsTutor').hide()
		$('#navButton_Reviews').hide()
		$('#navButton_Tutor').hide()

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				$('#navButton_Profile').show()
				$('#navButton_Sessions').show()
				$('#navButton_Tutor').show()
				$('#navButton_SessionsTutor').show()
				$('#navButton_Reviews').show()
				$("#navButton_Login").text("Log Out")
				$("#navButton_Login").click(function() {
					logout();
				});
			}
		})	
}

function logout(){ //needed for logout functionality on logout button
    firebase.auth().signOut().then(function () { //if successful
		console.log("user logged out");
		window.location.assign("index.html");
	})
	.catch(function (error) {
		console.log("Error logging out: " + error);
	});

}

