function populateSessions() {

    firebase.auth().onAuthStateChanged(function (user) {

	db.collection("PastSessions").doc("TestSessionID1"+user.uid).set({
        tutorID: "11111TEST",
        userID: user.uid,
        date: new Date(2020, 10, 10, 3, 24, 0),
        subject: "math",
        sessionID: 1
        
        
	})
	db.collection("PastSessions").doc("TestSessionID2"+user.uid).set({
        tutorID: "22222TEST",
        userID: user.uid,
        date: new Date(2020, 10, 9, 3, 24, 0),
        subject: "science",
        sessionID: 2
    
    })
    db.collection("PastSessions").doc("TestSessionID3"+user.uid).set({
        tutorID: "33333TEST",
        userID: user.uid,
        date: new Date(2020, 10, 8, 3, 24, 0),
        subject: "humanities",
        sessionID: 3
        
    })
    db.collection("PastSessions").doc("TestSessionID4"+user.uid).set({
        tutorID: "44444TEST",
        userID: user.uid,
        date: new Date(2020, 10, 7, 3, 24, 0),
        subject: "physics",
        sessionID: 4
        
    })
    db.collection("PastSessions").doc("TestSessionID5"+user.uid).set({
        tutorID: "55555TEST",
        userID: user.uid,
        date: new Date(2020, 9, 10, 3, 24, 0),
        subject: "math",
        sessionID: 5
        
        
	})
	db.collection("PastSessions").doc("TestSessionID6"+user.uid).set({
        tutorID: "66666TEST",
        userID: user.uid,
        date: new Date(2020, 9, 9, 3, 24, 0),
        subject: "science",
        sessionID: 6
        
    })
    db.collection("PastSessions").doc("TestSessionID7"+user.uid).set({
        tutorID: "77777TEST",
        userID: user.uid,
        date: new Date(2020, 9, 8, 3, 24, 0),
        subject: "humanities",
        sessionID: 7
        
    })
    db.collection("PastSessions").doc("TestSessionID8"+user.uid).set({
        tutorID: "88888TEST",
        userID: user.uid,
        date: new Date(2020, 9, 7, 3, 24, 0),
        subject: "physics",
        sessionID: 8
        
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


function updateModal(tutorid) {

    document.getElementById("tutorName").innerText = tutorid;
    
  }


