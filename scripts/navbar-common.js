/* this code is badly formatted however it makes the textblock a little clearer */
function navbarCommonAdd() {    
    $("body").prepend('<navbar id="navBarCommonBar" class="navbar navbar-expand-lg navbar-dark bg-dark">');
    $("#navBarCommonBar").append('<a class="navbar-brand" href=""></a>');
    $("#navBarCommonBar a").text(navBarCommonName.name);

	firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
		    $("#navBarCommonBar").append('<button class="navbar-toggler" id="navBarButton" type="button" data-toggle="collapse" data-target="#navbarToggler">');
			$("#navBarButton").append('<span class="navbar-toggler-icon">');
			$("#navBarCommonBar").append('<div class="collapse navbar-collapse" id="navbarToggler">');
			$("#navbarToggler").append('<ul id="burgerMenu" class="navbar-nav ml-auto">'); 
			$("#navBarburgerMenu").append('<li class="nav-item" id="searchNavButton">');
			$("#navBarburgerMenu").append('<li class="nav-item" id="reviewsNavButton">');
			$("#burgerMenu").append('<li class="nav-item" id="homeNavButton">');
			$("#burgerMenu").append('<li class="nav-item" id="loginNavButton">');
			$("#homeNavButton").append('<a class="nav-link" href="index.html">Home</a>');
			$("#homeNavButton").append('<a class="nav-link" href="profile.html">Profile</a>');
			$("#homeNavButton").append('<a class="nav-link" href="searchV2.html">Search</a>');
			$("#homeNavButton").append('<a class="nav-link" href="previous-sessions.html">Previous Sessions</a>');
			$("#homeNavButton").append('<a class="nav-link" href="tutor-form.html">Tutor Form</a>');
			$("#homeNavButton").append('<a class="nav-link" href="reviews.html">Reviews</a>');
		    $("#loginNavButton").append('<a class="nav-link">Log Out</a>');
			$("#loginNavButton").click(function() {
				logout();
			});
		}
	});			
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

navbarCommonAdd()
