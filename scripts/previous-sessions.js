let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Sessions").where("userID", "==", user.uid).orderBy("sessionDate")
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
                    if (sessionDate > Date.now()) {
                      status = "Upcomming"
                    } else {
                      status = "Happened"
                    }
                    console.log(sessionDate)
                    $("#accordionExample").append(
                        '<div class="card">'+
                            '<div class="card-header" id="headingOne'+doc.id+'">'+
                                '<h2 class="mb-0">'+
                                '<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne'+doc.id+'" aria-expanded="true" aria-controls="collapseOne'+doc.id+'">'+
                                months[sessionDate.getMonth()]+ " " + sessionDate.getDate()  + " " + sessionDate.getHours() + ":" + sessionDate.getMinutes()+ ", " + sessionDate.getFullYear() + 
                                "\t ----- Tutor: " + snap.data().name +
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
                                          '<button type="button" id="'+doc.data().tutorID+'"class="btn btn-primary leave-review-button" data-toggle="modal" onClick="updateModal(this.id)" data-target="#exampleModalCenter">Leave Review</button>'+
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