let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Sessions").where("userID", "==", user.uid).orderBy("sessionDate", "desc")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                  db.collection("Users").doc(doc.data().tutorID)
                  .onSnapshot(function(snap){ 
                    
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
                    if (sessionDate > Date.now()) {
                      status = "Upcoming"
                      icon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-alarm" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' + 
                      '<path fill-rule="evenodd" d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>' +
                    '</svg>'
                      disableButton = "disabled"
                    } else {
                      status = "Happened"
                      icon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                      '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>' +
                    '</svg>'
                      disableButton = ""
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
                                      '<img src="https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic" class="card-img" alt="small profile pic">'+
                                    '</div>'+
                                    '<div class="col-md-8">'+
                                      '<div class="card-body">'+
                                          '<h5 class="card-title">'+snap.data().name+'</h5>'+
                                          '<p class="card-text">Subject: '+doc.data().subject+'</p>'+
                                          '<p class="card-text">Rate: '+doc.data().rate+'</p>'+
                                          '<p class="card-text">Status: '+status+'</p>'+
                                          '<p class="card-text"><small class="text-muted">Tutor ID: '+doc.data().tutorID+'</small></p>'+
                                          '<button type="button" id="'+doc.data().tutorID+'"class="btn btn-primary leave-review-button" data-toggle="modal" onClick="updateModal(this.id)" data-target="#exampleModalCenter" '+disableButton+'>Leave Review</button>'+
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
                });
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        });
});

function updateModal(tutorid) {

  document.getElementById("tutorName").innerText = tutorid;
  
}

/*
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    November, 15. 2020
                  </button>
                </h2>
              </div>
          
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="row no-gutters">
                    <div class="col-md-2">
                      <img src="https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic" class="card-img" alt="small profile pic">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">TUTOR NAME</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Session ID: 123412341243</small></p>
                        <!-- Button trigger modal. -->
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Leave Review</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

 */