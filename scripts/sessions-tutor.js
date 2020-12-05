$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("Sessions").where("tutorID", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("Tutors").doc(doc.data().tutorID).onSnapshot(function(tutorsnap){ 
          db.collection("Users").doc(doc.data().userID).onSnapshot(function(snap){ 
            
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let sessionDate = doc.data().sessionDate.toDate()
            let dateFormatted = months[sessionDate.getMonth()]
            + " " + sessionDate.getDate() 
            + " " + sessionDate.getHours() 
            + ":" + sessionDate.getMinutes()
            + ", " + sessionDate.getFullYear() 
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
              status = "Accepted & Upcoming"
              disableButton = "disabled"
              disableCancelButton = ""
              icon = acceptedIcon
            } else if (doc.data().accepted && !timestatus) {
              status = "Happened"
              disableButton = "disabled"
              disableCancelButton = "disabled"
              icon = happenedIcon
            } else if (!doc.data().accepted && timestatus) {
              status = "Awaiting confirmation"
              disableButton = ""
              disableCancelButton = ""
              icon = awaitingIcon
            } else {
              status = "Expired"
              disableButton = "disabled"
              disableCancelButton = "disabled"
              icon = expiredIcon
            } 

            $("#accordionExample").append(
                '<div class="card">'+
                    '<div class="card-header" id="headingOne'+doc.id+'">'+
                        '<h2 class="mb-0">'+
                          '<button class="btn btn-link btn-block text-left w-100" type="button" data-toggle="collapse" data-target="#collapseOne'+doc.id+'" aria-expanded="true" aria-controls="collapseOne'+doc.id+'">'+
                            '<span class="float-left">' + icon + " " + dateFormatted + '</span>' +
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
                                  '<p class="card-text">Status: '+status+'</p>'+
                                  '<p class="card-text">Message: '+doc.data().message+'</p>'+
                                  '<p class="card-text"><small class="text-muted">Tutor ID: '+doc.data().tutorID+'</small></p>'+
                                  '<button type="button" id="Accept_'+doc.id+'"class="btn btn-primary leave-review-button" onClick="acceptSession(this.id)" '+disableButton+'>Accept Session</button>'+
                                  '<button type="button" id="Cancel_'+doc.id+'"class="btn btn-primary leave-review-button" onClick="cancelSession(this.id)" '+disableCancelButton+' style="float: right">Cancel Session</button>'+
                              '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );
            $('#' + doc.data().tutorID).click(function () {
              $(".submitReview").attr('id', doc.data().tutorID);
            })
          })
        })
      });
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  });
});

function acceptSession(input) {
  let sessionID = input.split("_")[1]
  db.collection("Sessions").doc(sessionID).set({
      accepted: true
    }, {merge: true}) 
}

function cancelSession(input) {
  let sessionID = input.split("_")[1]
  db.collection("Sessions").doc(sessionID).set({
      canceled: true
    }, {merge: true}) 
}

$(document).ready(function () { 
  $('#pendingSelect input').on("click", function() {
    $('.Accepted').toggle()
  })

  $('#completeSelect input').on("click", function() {
    $('.Complete').toggle()
  })

  $('#awaitSelect input').on("click", function() {
    $('.Awaiting').toggle()
  })

  $('#cancelSelect input').on("click", function() {
    $('.Canceled').toggle()
    $('.Expired').toggle()
  })
})