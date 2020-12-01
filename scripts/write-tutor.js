function submitButtonEvent() {  
	$('#tutor-form').submit(function () { //makes it so page doesn't refresh on submit
		return false;
	});
	$(document).ready(function () {
		$("#submit-button").click(function (){
			writeTutor();
		});
		//
	});
}

function writeTutor() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user){
			let tutorRef = db.collection("Tutors").doc(user.uid);
			tutorRef.get()
			.then(function(docSnapshot) {
				if(docSnapshot.exists) {
					updateTutorFields(user, tutorRef);
				} else {
					setTutorFields(user, tutorRef);
				}
				writeSchedule(tutorRef);
				setCheckedSubjects(user, tutorRef);
			});
		} else {
			console.log("no user signed in");
		}
	})
}

function fillForm() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user){
			let tutorRef = db.collection("Tutors").doc(user.uid);
			setCalendar(tutorRef);
			tutorRef.get()
			.then(function(docSnapshot) {
				if(docSnapshot.exists) {
					$("#tutor-description").val(docSnapshot.data().description);
					$("#rate").val(docSnapshot.data().rate);
					for (i = 0; i < docSnapshot.data().subjects.length; i++) {
						$('#' + docSnapshot.data().subjects[i]).prop("checked", true );
					}
					makeCalendar();
				} else {
					makeCalendar();
				}
			});
		} else {
			console.log("no user signed in");
			window.location.href = "login.html";
		}
	});
}

function setCheckedSubjects(user, tutorRef) {
	$('.subject-check-input').each(function() {
		if(this.checked) {
			tutorRef.update({
				subjects: firebase.firestore.FieldValue.arrayUnion(this.id)
			})
		}
	})
}

function updateTutorFields(user, tutorRef) {
	console.log(user.uid + " has been updated.");
	tutorRef.update({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		subjects: [], //don't worry about finding unchecked subjects, just reset the array
		//reviews and rating get updated when a review is submitted
	});
}

function setTutorFields(user, tutorRef) {
	console.log(user.uid + "is now a tutor.");
	tutorRef
	.set({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		rating: 0,
		reviews: 0,
		onTime: 0,
		teachingSkill: 0,
		knowledge: 0,
		subjects: [],
        schedule: {
			Monday: 	availability.get(calDays[1]),
			Tuesday: 	availability.get(calDays[2]),
			Wednesday: 	availability.get(calDays[3]),
			Thursday: 	availability.get(calDays[4]),
			Friday: 	availability.get(calDays[5]),
			Saturday: 	availability.get(calDays[6]),
			Sunday: 	availability.get(calDays[0])
		}
	})
}

let availability = new Map([
	['Monday', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	['Tuesday', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	['Wednesday', [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	['Thursday', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	['Friday', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	['Saturday', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	['Sunday', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
])

let selectedDay = 3;  
let startTime = 6;
let endTime = 21;
let rowHeight = "20px";
let calDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function setCalendar(tutorRef) {
    tutorRef
    .get().then(function(doc) {
		availability.set('Monday', doc.data().schedule.Monday);
		availability.set('Tuesday', doc.data().schedule.Tuesday);
		availability.set('Wednesday', doc.data().schedule.Wednesday);
		availability.set('Thursday', doc.data().schedule.Thursday);
		availability.set('Friday', doc.data().schedule.Friday);
		availability.set('Saturday', doc.data().schedule.Saturday);
		availability.set('Sunday', doc.data().schedule.Sunday);
	});
	
}   
   
function makeCalendar() {

	console.log(availability);
	console.log(availability.get("Wednesday"));

	//create grid for new calendar
	$('#calendarContainer').css("grid-template-rows", "2em repeat("+(endTime-startTime)+", "+rowHeight+");")
	
	//makes day header for each column
    for (let index = 0; index < calDays.length; index++) {
        $('#calendarContainer').append(
            //I have no idea why this code works while missing a " but it breaks when put in
            '<h6  class=" text-center align-middle '+calDays[index]+' style=" grid-row: 1; width: 15em">'+calDays[index]+'</h6>'
		);                        
    }

	//makes time buttons for each cell on the grid
    for (let index = startTime; index < endTime; index++) {
                        
        $('#calendarContainer').append( //put the hour at 30 mins (e.g. 6:30, 7:30, 8:30, etc)
            '<p  class="text-center align-middle border times" style=" grid-row:'+(index - startTime + 2)+';">'+index+":30"+'</p>'
        )
        for (let index2 = 0; index2 < calDays.length; index2++) {
            console.log(availability.get(calDays[index2])[index]);
            $('#calendarContainer').append(
                '<p id="button_'+index+'_'+index2+'" onmousedown="updateTime(this.id)" class=" text-center align-middle border '+calDays[index2]+' color'+availability.get(calDays[index2])[index]+'" style=" grid-row:'+(index - startTime + 2)+';">'+index+":30"+'</p>'      
            )
        }
    }
		
	//color of the time cells if they are pressed on/off
    for (let index = 0; index < calDays.length; index++) {
        if (index == selectedDay){
            $("."+calDays[index]).css("color", "#000000FF")
            $("."+calDays[index]).css("width", "100px")

        } else {
            $("."+calDays[index]).css("color", "#00000000")
            $("."+calDays[index]).css("width", "20px")                 
        }
    }          
}         
               
function updateTime(inputString) {
    let rowPos = inputString.split("_")[1]
    let colPos = inputString.split("_")[2]
    let aval = availability.get(calDays[colPos])[rowPos]
    console.log("Column: "+ colPos+" Row: "+ rowPos + "Aval: " + aval)

    if (colPos > selectedDay){
        selectedDay++;

    } else if (colPos < selectedDay) {
        selectedDay--;
    } else {
        switch (aval) {
            case 0:
                availability.get(calDays[colPos])[rowPos] = 1;
                $('#button_'+rowPos+'_'+colPos).removeClass("color0")
                $('#button_'+rowPos+'_'+colPos).addClass("color1")
                break;
            case 1:
                availability.get(calDays[colPos])[rowPos] = 0;
                $('#button_'+rowPos+'_'+colPos).removeClass("color1")
                $('#button_'+rowPos+'_'+colPos).addClass("color0")
                break;
            default:
                break;
        }
    }

    for (let index = 0; index < calDays.length; index++) {
        if (index == selectedDay){   
            $("."+calDays[index]).css("color", "#000000FF")
            $("."+calDays[index]).css("width", "100px")
            console.log(index + " is " + calDays[index] + " and is selected")
            console.log($("."+calDays[index]))

        } else {
            $("."+calDays[index]).css("color", "#00000000")
            $("."+calDays[index]).css("width", "20px")
            console.log(index + " is " + calDays[index] + " and is notselected") 
        }           
    }             
}

function writeSchedule(tutorRef) {
    tutorRef
	.set({
        schedule: {
        // 0 never avalible, 1 avalible, 2 booked. array pos means hour
        //Looping through this was difficult so its hardcoded 7 lines vs 1 loop ehhh
        Monday: 	availability.get(calDays[1]),
        Tuesday: 	availability.get(calDays[2]),
        Wednesday: 	availability.get(calDays[3]),
        Thursday: 	availability.get(calDays[4]),
        Friday: 	availability.get(calDays[5]),
        Saturday: 	availability.get(calDays[6]),
        Sunday: 	availability.get(calDays[0])
		}
    }, {merge: true})      
}

fillForm();
submitButtonEvent();