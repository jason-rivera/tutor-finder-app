$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
		let userDocRef = db.collection("Tutors").doc(user.uid);
		
        db.collection("Reviews").where("tutorID", "==", userDocRef)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
					
                    $("#accordionExample").append(
                        '<div class="card">'+
                            '<div class="card-header" id="headingOne'+doc.id+'">'+
                                '<h2 class="mb-0">'+
                                '<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne'+doc.id+'" aria-expanded="true" aria-controls="collapseOne'+doc.id+'">'+
                                    'Review submitted: ' +doc.data().Date.toDate()+
                                '</button>'+
                                '</h2>'+
                            '</div>'+
                        
                            '<div id="collapseOne'+doc.id+'" class="collapse" aria-labelledby="headingOne'+doc.id+'" data-parent="#accordionExample">'
							+   '<div class="card-body">'
							+	'<h5 class="card-title">' + '</h5>'
							+	'<div class="grid-1x2">'
							+		'<div class="pair-container">'
							+			'<div class="rating-value">' + '</div>'
							+		'</div>'
							+		'<div class="pair-container">'
							+			'<p class="ontime-label">Punctuality: ' + Math.round(doc.data().onTime) + '</p>'
							+			'<p class="teaching-label">Teaching skill: ' + Math.round(doc.data().teachingSkill) + '</p>'
							+			'<p class="knowledge-label">Knowledge: ' + Math.round(doc.data().knowledge) + '</p>'
							+			'<p class="message-label">Message: ' + doc.data().message + '</p>'
							+		'</div>'
							+	'</div>'	
                            + '</div>'+
                        '</div>'
                    );
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        });
});