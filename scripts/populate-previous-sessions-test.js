function populateSessions() {

    firebase.auth().onAuthStateChanged(function (user) {

	db.collection("PastSessions").doc("TestSessionID1"+user.uid).set({
        tutorid: "1",
        userID: user.uid,
        date: 12,
        subject: "math"
        
	})
	db.collection("PastSessions").doc("TestSessionID2"+user.uid).set({
        tutorID: "2",
        userID: user.uid,
        date: 13,
        subject: "science"
        
    })
    db.collection("PastSessions").doc("TestSessionID3"+user.uid).set({
        tutorid: "3",
        userID: user.uid,
        date: 14,
        subject: "humanities"
        
    })
    db.collection("PastSessions").doc("TestSessionID4"+user.uid).set({
        tutorid: "4",
        userID: user.uid,
        date: 15,
        subject: "physics"
        
	})
	.then(function() {
		console.log("Previous sessions populated successfully!");
	})
	.catch(function(error) {
		console.error("Error populating: ", error);
    });
});
}

populateSessions();