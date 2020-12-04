function createSession() {
    firebase.auth().onAuthStateChanged(function(user) {
    
    if (radioRow == null) {
        console.log("Nothing recorded")
        
        } else {
            //CHANGE SELCTED TIMESLOT TO CONFIMRED (3 -> 2)
            tempAvailability.get(calDays[radioCol])[radioRow] = 2;
            //UPDATE TUTOR SCHEDULE
            console.log("Updating schedule for: " + selectedTutor)
            //updateTable()

            //CREATE NEW SESSION
            console.log("At this point a session must be created in the database, as of now it only updates the schedule for the tutor")

            let user = firebase.auth().currentUser;

            let sessionDate = lastSunday
            console.log("Session date" + sessionDate)
            console.log("radioCol" + radioCol)
            console.log("newDate: "+ (lastSunday.getDate() + parseInt(radioCol)))
            sessionDate.setDate(lastSunday.getDate() + parseInt(radioCol))
            sessionDate.setHours(parseInt(radioRow), 30, 0)
            console.log("Session date" + sessionDate)
            //user.uid + newTimestamp is a pretty safe bet that it will be unique
            
        db.collection("Tutors").doc(selectedTutor).get().then(function(doc) {

             db.collection("Sessions").doc(user.uid + Date.now()).set({

            //just storing the row and col pos from the calendar currently, not as readable but its reliable. can be changed later
            //calendar does not support creating a session thats not in the current week, this will need to be changed
            weekOf: longWeekOf,
            tempRow: radioRow,
            tempCol: radioCol,
            sessionDate: sessionDate,
            creationDate: Date.now(),
            tutorID: selectedTutor,
            userID: user.uid, 
            rate: doc.data().rate,
            accepted: false,
            subject: document.getElementById("courseSelectDropdown").value


            }).catch(function(error) {
                console.log("Error tutor documents: ", error)
            })
        }).catch(function(error) {
            console.log("Error session documents: ", error)
        })
            
        }
    });

    
}