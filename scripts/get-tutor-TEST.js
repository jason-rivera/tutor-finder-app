function getTutor() {  
	$('#tutor-form').submit(function () { //makes it so page doesn't refresh on submit
		return false;
	});
    /*
	$(document).ready(function () {
		$("#submit-button").click(function (){
			firebase.auth().onAuthStateChanged(function (user) {
				if (user){
					
					let tutorsRef = db.collection("Tutors");
					console.log(tutorsRef);
					
					
					console.log(user.uid + " is now a tutor.");
					db.collection("Tutors").doc(user.uid).set({
						description: document.getElementById("tutor-description").value,
						rate: document.getElementById("rate").value,
						math: document.getElementById("mathCheckbox").checked,
						english: document.getElementById("englishCheckbox").checked,
						history: document.getElementById("historyCheckbox").checked,
						programming: document.getElementById("programmingCheckbox").checked
					})
					
				} else {
					console.log("no user signed in");
				}
			})
		});
	});
	*/
	$("#submit-button").click(function (){

		let tutorsRef = db.collection("Tutors");

		let rate = document.getElementById("rate").value;
		tutorsRef = tutorsRef.where("rate", "<=", parseFloat(rate));			

		tutorsRef
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				console.log(doc.id, " => ", doc.data());
			});
		});
	});

}

getTutor();