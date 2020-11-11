function welcomeMsg() {

	/**
	db.collection("Users").doc("01")
	.onSnapshot(function(q) {
		console.log(q.data()); //print the document fields of doc 01
		console.log(q.data().message);
		document.getElementById("abc").innerText = q.data().message;
	})
	*/

    firebase.auth().onAuthStateChanged(function (user) {
        if (user){
            console.log ("user is signed in");
            db.collection("Users")
            .doc(user.uid)
            .get()
            .then(function(doc){
                var n = doc.data().name;
                console.log(n);
                //$("#username").text(n);	
				document.getElementById("welcome-msg").innerText = "Welcome " + n;
            })
        }
        else {
            console.log ("no user is signed in");
        }
    })
}

welcomeMsg();