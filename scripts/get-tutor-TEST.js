function getTutor() {  
	
	$("#submit").click(function (){
		let tutorsRef = db.collection("Tutors");
		let searchSubjects = [];
		//Doesn't work because you need a composite index for each combination of subject and rate.
		//A composite index is needed when the query has chained comparison operators that are not "=="
		//let rateQuery = document.getElementById("rate").value;
		//tutorsRef = tutorsRef.where("rate", "<=", parseFloat(rateQuery));
		$('.subject-check-input').each(function() {
			if(this.checked) {
				searchSubjects.push(this.id);
			}
		})
		tutorsRef = tutorsRef.where("subjects", "array-contains-any", searchSubjects);

		if(document.getElementById("max-text").value !== "") {
			tutorsRef = tutorsRef.where("rate", "<=", document.getElementById("max-text").value);
		}

		tutorsRef.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				console.log(doc.id, " => ", doc.data());
			});
		});
	});
}

/*
function redirect() {
	document.getElementById("submit").addEventListener('click', function(){
		console.log("button pressed");
		window.location.href = "searchV2.html" + "test";
	});
}
*/

getTutor();