let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Sessions").where("userID", "==", user.uid).orderBy("sessionDate", "desc")
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

                      let tutoricon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eyeglasses" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                      '<path fill-rule="evenodd" d="M4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"/>' +
                      '</svg>'

                      let acceptedIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-alarm" fill="limegreen" xmlns="http://www.w3.org/2000/svg">'
                      +'<path fill-rule="evenodd" d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>'
                      +'</svg>'

                      let happenedIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                      '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>' +
                      '</svg>'

                      let awaitingIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock-history" fill="orange" xmlns="http://www.w3.org/2000/svg">'
                      +'<path fill-rule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>'
                      +'<path fill-rule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>'
                      +'<path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>'
                      +  '</svg>'

                      let expiredIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-octagon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
                      +'<path fill-rule="evenodd" d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>'
                      + '<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
                      +'</svg>'
                      
                      let timestatus

                      if (sessionDate > Date.now()) {
                        timestatus = true
                      } else {
                        timestatus = false
                      }


                      if (doc.data().accepted && timestatus) {
                        status = "Accepted & Upcoming"
                        disableButton = "disabled"
                        icon = acceptedIcon
                      } else if (doc.data().accepted && !timestatus) {
                        status = "Happened"
                        disableButton = ""
                        icon = happenedIcon
                      } else if (!doc.data().accepted && timestatus) {
                        status = "Awaiting confirmation"
                        disableButton = "disabled"
                        icon = awaitingIcon
                      } else {
                        status = "Expired"
                        disableButton = "disabled"
                        icon = expiredIcon
                      }

                      console.log(sessionDate)
                      $("#accordionExample").append(
                          '<div class="card">'+
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
                                            '<p class="card-text"><small class="text-muted">Tutor ID: '+doc.data().tutorID+'</small></p>'+
                                            '<button type="button" id="'+doc.id+'"class="btn btn-primary leave-review-button" data-toggle="modal" onClick="updateModal(this.id)" data-target="#exampleModalCenter" '+disableButton+'>Leave Review</button>'+
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
  