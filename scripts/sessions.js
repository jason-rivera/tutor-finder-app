let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Sessions").where('userID', '==', user.uid).orderBy("sessionDate", "desc")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  db.collection("Tutors").doc(doc.data().tutorID).onSnapshot(function(tutorsnap){ 
                    db.collection("Users").doc(doc.data().tutorID).onSnapshot(function(snap){ 
                      
                      console.log("session Data")
                      console.log(doc.id, " => ", doc.data());
                      console.log("tutor Data")
                      console.log(snap.id, " => ", snap.data());
                      // doc.data() is never undefined for query doc snapshots
                      let sessionDate = doc.data().sessionDate.toDate()
                      let status;
                      let icon;
                      let disableButton;

                      let tutoricon = '<i class="fas fa-book-reader"></i>'

                      let acceptedIcon = '<i class="far fa-calendar-check" style="color: green;"></i>'

                      let happenedIcon = '<i class=" far fa-check-circle" style="color: rgb(106, 170, 22);"></i>'

                      let awaitingIcon = '<i class="far fa-hourglass" style="color: rgba(255, 166, 0, 0.596);"></i> '

                      let expiredIcon = '<i class="far fa-calendar-times" style="color: grey;"></i>'

                      let canceledIcon = '<i class="far fa-calendar-times" style="color: rgba(151, 17, 17, 0.774);"></i>'
                      
                      let timestatus

                      if (sessionDate > Date.now()) {
                        timestatus = true
                      } else {
                        timestatus = false
                      }


                      if (doc.data().canceled){
                        status = "Canceled"
                        disableButton = "disabled"
                        disableCancelButton = "disabled"
                        icon = canceledIcon
                      } else if (doc.data().accepted && timestatus) {
                        status = "Accepted"
                        disableButton = "disabled"
                        disableCancelButton = "disabled"
                        icon = acceptedIcon
                      } else if (doc.data().accepted && !timestatus) {
                        status = "Complete"
                        disableButton = ""
                        disableCancelButton = "disabled"
                        icon = happenedIcon
                      } else if (!doc.data().accepted && timestatus) {
                        status = "Awaiting"
                        disableButton = "disabled"
                        disableCancelButton = ""
                        icon = awaitingIcon
                      } else {
                        status = "Expired"
                        disableButton = "disabled"
                        disableCancelButton = "disabled"
                        icon = expiredIcon
                      }

                      console.log(sessionDate)
                      $("#accordionExample").append(
                          '<div class="card '+status+'">'+
                              '<div class="card-header" id="headingOne'+doc.id+'">'+
                                  '<h2 class="mb-0">'+
                                    '<button class="btn btn-link btn-block text-left w-100" type="button" data-toggle="collapse" data-target="#collapseOne'+doc.id+'" aria-expanded="true" aria-controls="collapseOne'+doc.id+'">'+
                                      '<span class="float-left">' + icon + " " + months[sessionDate.getMonth()]+ " " + sessionDate.getDate()  + " " + sessionDate.getHours() + ":" + sessionDate.getMinutes()+ ", " + sessionDate.getFullYear() + '</span>' +
                                      '<span class="float-right">' + snap.data().name + " " + tutoricon + '</span>' +
                                    '</button>'+
                                  '</h2>'+
                              '</div>'+
                              '<div id="collapseOne'+doc.id+'" class="collapse" aria-labelledby="headingOne'+doc.id+'" data-parent="#accordionExample">'+
                                  '<div class="row no-gutters">'+
                                      '<div class="col-md-2">'+
                                        '<img src="'+snap.data().photoURL+'" class="card-img" alt="small profile pic">'+
                                      '</div>'+
                                      '<div class="col-md-8">'+
                                        '<div class="card-body">'+
                                            '<h5 class="card-title">'+snap.data().name+'</h5>'+
                                            '<p class="card-text">Subject: '+doc.data().subject+'</p>'+
                                            '<p class="card-text">Rate: '+tutorsnap.data().rate+'</p>'+
                                            '<p class="card-text">Status: '+status +'</p>'+
                                            '<p class="card-text"><small class="text-muted">Creation Date: '+doc.data().creationDate.toDate()  +'</small></p>'+
                                            '<p class="card-text"><small class="text-muted">Tutor ID: '+doc.data().tutorID+'</small></p>'+
                                            '<button type="button" id="'+doc.id+'"class="btn btn-primary leave-review-button" data-toggle="modal" onClick="updateModal(this.id)" data-target="#exampleModalCenter" '+disableButton+'>Leave Review</button>'+
                                            '<button type="button" id="Cancel_'+doc.id+'"class="btn btn-primary leave-review-button" onClick="cancelSession(this.id)" '+disableCancelButton+' style="float: right">Cancel Session</button>'+
                                        '</div>'+
                                      '</div>'+
                                  '</div>'+
                              '</div>'+
                          '</div>'
                      );
                      
                    })
                  })
                });
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        });
});

function updateModal(sessionId) {

  db.collection("Sessions").doc(sessionId).onSnapshot(function(doc) {
    db.collection("Tutors").doc(doc.data().tutorID).onSnapshot(function(tutorsnap){ 
      db.collection("Users").doc(doc.data().tutorID).onSnapshot(function(snap){ 

        let sessionDate = doc.data().sessionDate.toDate()
        let dateFormatted = months[sessionDate.getMonth()]+ " " 
        + sessionDate.getDate() + " " + sessionDate.getHours() + ":" 
        + sessionDate.getMinutes()+ ", " + sessionDate.getFullYear() 

        reviewDate = new Date()
        let dateNowFormatted = months[reviewDate.getMonth()]+ " " 
        + reviewDate.getDate() + " " + reviewDate.getHours() + ":" 
        + reviewDate.getMinutes()+ ", " + reviewDate.getFullYear() 

        $("#tutorName").text(snap.data().name)
        $("#tutorProfilePic").attr("src", snap.data().photoURL)
        $("#sessionDate").text("Session Date: " + dateFormatted)
        $("#reviewDate").text("Review Date: " + dateNowFormatted)
        $("#subjectTaught").text("Subject taught: " + snap.data().subject)
        $("#rateApplied").text( "Rate: " + tutorsnap.data().rate)
        $(".submitReview").attr('id', doc.data().tutorID);
        
      })
    })
  })
 }   
 function cancelSession(input) {
  let sessionID = input.split("_")[1]
  db.collection("Sessions").doc(sessionID).set({
      canceled: true

    }, {merge: true}) 
    location.reload();
}


$(document).ready(function () { 
  $('#pendingSelect input').on("click", function() {
   console.log("test: pend" );
    $('.Accepted').toggle()
  })

  $('#completeSelect input').on("click", function() {
    console.log("test: complete" );
    $('.Complete').toggle()
  })

  $('#awaitSelect input').on("click", function() {
    console.log("test: await" );
    $('.Awaiting').toggle()
  })

  $('#cancelSelect input').on("click", function() {
    console.log("test: cancel" );
    $('.Canceled').toggle()
    $('.Expired').toggle()
  })
})