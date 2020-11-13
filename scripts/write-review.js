function writeReview() {  
        $(document).ready(function () {
          $("#submitReview").click(function (){
              firebase.auth().onAuthStateChanged(function (user) {

                  var dateNow = new Date();

                  if (user){
                      console.log(user.uid + " Left a review");
                      db.collection("Reviews").doc(tutorIDForReview).set({
                          StudentID: user.uid,
                          TutorID: tutorIDForReview,
                          onTime: document.getElementById("rangeOnTime").value,
                          teachingSkill: document.getElementById("teachingAbility").value,
                          knowledge: document.getElementById("knowledge").value,
                          message: document.getElementById("reviewTextArea").value,
                          Date: dateNow.getTime()
                      })
                      $("#submitReview").value = "Thanks!";
                      
                  } else {
                      console.log("no user signed in");
                  }
              })
          });
      });
  }

  writeReview();