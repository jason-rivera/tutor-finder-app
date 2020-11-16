$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("PastSessions").where("userID", "==", user.uid).where('arrayTest', 'array-contains-any', ['test11', 'test41'])
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var p = document.createElement("p");
                    p.innerHTML = doc.data().tutorID+doc.data().subject;

                    $("body").append(p);

                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        });
});