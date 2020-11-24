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
		
		if (!(searchSubjects === undefined || searchSubjects.length == 0)) {
			tutorsRef = tutorsRef.where("subjects", "array-contains-any", searchSubjects);
		}

		$('.price-bracket').each(function() {
			if(this.checked) {
				if (this.id == 0) {
					tutorsRef = tutorsRef.where("rate", ">=", parseInt(this.id)).where("rate", "<=", parseInt(this.id) + 10);
				} else if (this.id == "any-price") {
					tutorsRef = tutorsRef.where("rate", ">=", 0);
				} else if (this.id == 61) {
					tutorsRef = tutorsRef.where("rate", ">=", parseInt(this.id));
				} else {
					tutorsRef = tutorsRef.where("rate", ">=", parseInt(this.id)).where("rate", "<=", parseInt(this.id) + 9);
				}
			}
		})

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