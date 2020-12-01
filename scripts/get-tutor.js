function getTutor() {  	
	$("#submit").click(function (){
		let tutorsRef = db.collection("Tutors");
		let searchSubjects = [];
		$('.subject-check-input').each(function() {
			if(this.checked) {
				searchSubjects.push(this.id);
			}
		})
		console.log(searchSubjects); 
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
		writeToModal(tutorsRef);
	});
}

function writeToModal(tutorsRef) {
	tutorsRef.get()
	.then(function(querySnapshot) {
		$(".modal-body").empty();
		querySnapshot.forEach(function(doc) {
			db.collection("Users").doc(doc.id)
			.onSnapshot(function(snap){
				console.log(doc.id, " => ", doc.data());
				console.log(snap.id, " => ", snap.data());

				$("#search-results").append(
					'<div class="card" style="width: 18rem;">'
					+    '<img src="images/profile_pic0.png" class="card-img-top" alt="...">'
					+   '<div class="card-body">'
					+	'<h5 class="card-title">' + snap.data().name + '</h5>'
					+	'<div class="grid-1x2">'
					+		'<div class="pair-container">'
					+			'<img src="images/star.svg.png" class="rating-star" alt="star">'
					+			'<div class="rating-value">' + Math.round(doc.data().rating) + '</div>'
					+		'</div>'
					+		'<div class="pair-container">'
					+			'<p class="rate-heading">Rate:</p>'
					+			'<p class="rate-value">$' + doc.data().rate + '/hr</p>'
					+		'</div>'
					+	'</div>'
					+	'<p class="card-text">Subjects:' + getSubjectString(doc) + '</p>'
					+	'<a href="#" class="btn btn-primary" id="appt_'+snap.id+'"  onclick="requestAppointment(this.id)" data-dismiss="modal" data-toggle="modal" data-target="#apptModal">Request appointment</a>'
					+  '</div>'
					+ '</div>'
					+ '</br>'
				);
				getSubjectString(doc);
			});
		});
	});
}



function requestAppointment(inputString) {
	let userid = inputString.split("_")[1]
	console.log(userid)
	
	setCalendar(userid)

}
function getSubjectString(doc) {
	let subjectString = " ";
	let size = doc.data().subjects.length;
	for (i = 0; i < size - 1; i++) {
		subjectString += doc.data().subjects[i] + ", "
	}
	subjectString += doc.data().subjects[size - 1];
	return subjectString;
}

getTutor();
