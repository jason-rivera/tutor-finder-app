/* this code is badly formatted however it makes the textblock a little clearer */
function navbarCommonAdd() {    
    $("body").prepend('<navbar id="navBarCommonBar" class="navbar navbar-expand-lg navbar-dark bg-dark">');
    $("#navBarCommonBar").append('<a class="navbar-brand" href=""></a>');
    $("#navBarCommonBar a").text(navBarCommonName.name);
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
	// Login/logout link below
    firebase.auth().onAuthStateChanged(function (user) {
        if (user){
			$("#homeNavButton").append('<a class="nav-link" href="index.html">Log Out</a>');
			$("#loginNavButton").click(function() {
				logout();
			})
        }
        else {
            $("#homeNavButton").append('<a class="nav-link" href="login.html">Log In</a>');
        }
    })
				
}

function logout(){ //needed for logout functionality on logout button
    firebase.auth().signOut().then(function () { //if successful
		console.log("user logged out");
	})
	.catch(function (error) {
		console.log("Error logging out: " + error);
	});
}


navbarCommonAdd()

/* Old Code
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="">Home</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="search.html">Search</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="review-tutor.html">Reviews</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="login.html">Login</a>
            </li>
        </ul>
    </div>
</nav>
*/