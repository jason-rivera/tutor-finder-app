// returns all names

function getStuff() {
  db.collection("Users")
  .get()
  .then(function(snap) {
    snap.forEach(function(doc){
      var m = doc.data().name;
      console.log(m);
      // $("#quotes-go-here").append("<div>" + m + "</div>");
    })
  })
}

getStuff();