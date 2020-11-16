function populateSessions() {

    firebase.auth().onAuthStateChanged(function (user) {

	db.collection("PastSessions").doc("TestSessionID1"+user.uid).set({
        tutorID: "1",
        userID: user.uid,
        date: 12,
        subject: "math",
        arrayTest: [
            'test11', 
            'test12',
            'test13',
            'test14'
        ]
        
	})
	db.collection("PastSessions").doc("TestSessionID2"+user.uid).set({
        tutorID: "2",
        userID: user.uid,
        date: 13,
        subject: "science",
        arrayTest: [
            'test21', 
            'test22',
            'test23',
            'test24'
        ]
        
    })
    db.collection("PastSessions").doc("TestSessionID3"+user.uid).set({
        tutorID: "3",
        userID: user.uid,
        date: 14,
        subject: "humanities",
        arrayTest: [
            'test31', 
            'test32',
            'test33',
            'test34'
        ]
        
    })
    db.collection("PastSessions").doc("TestSessionID4"+user.uid).set({
        tutorID: "4",
        userID: user.uid,
        date: 15,
        subject: "physics",
        arrayTest: [
            'test41', 
            'test42',
            'test43',
            'test44'
        ]
        
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