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

		if (document.getElementById("mathCheckbox").checked) {
			tutorsRef = tutorsRef.where("math", "==", true);
		}
		if (document.getElementById("englishCheckbox").checked) {
			tutorsRef = tutorsRef.where("english", "==", true);
		}
		if (document.getElementById("historyCheckbox").checked) {
			tutorsRef = tutorsRef.where("history", "==", true);
		}
		if (document.getElementById("programmingCheckbox").checked) {
			tutorsRef = tutorsRef.where("programming", "==", true);
		}

		let rateQuery = document.getElementById("rate").value;
		tutorsRef = tutorsRef.where("rate", "<=", parseFloat(rateQuery));			

		tutorsRef.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				console.log(doc.id, " => ", doc.data());
			});
		});
	});

}

getTutor();