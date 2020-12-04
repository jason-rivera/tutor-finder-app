// ----------- CALENDAR ----------
//creates the html for a calendar and handles the user interaction
//USAGE
//setCalendar(tutorID) -> gets the calendar from the selected tutor, automatically calls createCalendar()


// ----------- MUST BE INSTANCE VARIABLES BEGINNING -----------

//instance array of the week days, could be replaced by methods already in the Date object
let calDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
//shorter week day names
let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

//the local date, current weekday, and last sunday
let localDate = new Date()
let lastSunday = new Date()
let selectedDay = localDate.getDay()
lastSunday.setDate(localDate.getDate() - selectedDay)
lastSunday.setHours(0, 0, 0)

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let weekOf = months[lastSunday.getMonth()] + ", " + lastSunday.getDate() 
let longWeekOf = lastSunday.getFullYear() + "_" + months[lastSunday.getMonth()] + "_" + lastSunday.getDate()  
console.log(longWeekOf)
console.log(weekOf)


console.log("DEBUG: \nlocal date" + localDate +"\n selected day's date: " + selectedDay + ""+calDays[selectedDay] +" \nlast sunday date: " + lastSunday)

//this is a default map in the same format as what is stored
let availability = new Map([
    // 0 never avalible, 1 avalible, 2 booked. array pos means hour
    ['Monday', 	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Tuesday', 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Wednesday',   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Thursday', 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Friday', 	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Saturday', 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Sunday', 	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
    ])

//this is a default map in the same format as what is stored
let tempAvailability = new Map([
    // 0 never avalible, 1 avalible, 2 booked. array pos means hour
    ['Monday', 	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Tuesday', 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Wednesday',   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Thursday', 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Friday', 	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Saturday', 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    ['Sunday', 	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
    ])

//the last selected row and col, starts as null
let radioRow = null
let radioCol = null

//the selected tutor
let selectedTutor = null

// ----------- MUST BE INSTANCE VARIABLES END -----------



//settings for the size of the grid. 
let rowHeight = "25px" 
let openWidth = "150px"
let closedWidth = "25px"


//the first and last time to be displayed on the calendar
let startTime = 6
let endTime = 21

// ----------- THIS GETS THE CALENDAR FOR THE SELECTED TUTOR ----------
function initializeCalendar(tutorID) {
    localDate = new Date()
    lastSunday = new Date()
    
    selectedDay = localDate.getDay()
    lastSunday.setDate(localDate.getDate() - selectedDay)
    lastSunday.setHours(0, 0, 0)
    weekOf = months[lastSunday.getMonth()] + ", " + lastSunday.getDate()
    longWeekOf = lastSunday.getFullYear() + "_" + months[lastSunday.getMonth()] + "_" + lastSunday.getDate()

    console.log(availability)
    setCalendar(tutorID)

}
// ----------- THIS GETS THE CALENDAR FOR THE SELECTED TUTOR ----------
function setCalendar(tutorID) {
    console.log("getting calendar for: " + tutorID)
    
    db.collection("Tutors").doc(tutorID)
        .get().then(function(doc) {
            console.log(availability)
            console.log("loading tutor calendar: " + doc.id)
            availability.set("Monday", doc.data().schedule.Monday)
            availability.set("Tuesday", doc.data().schedule.Tuesday)
            availability.set("Wednesday", doc.data().schedule.Wednesday)
            availability.set("Thursday", doc.data().schedule.Thursday)
            availability.set("Friday", doc.data().schedule.Friday)
            availability.set("Saturday", doc.data().schedule.Saturday)
            availability.set("Sunday", doc.data().schedule.Sunday)
            console.log("test: " + availability)
            overwriteTempAvalibility()
            selectedTutor = tutorID
            console.log(availability) 
            console.log(tempAvailability) 
            createCalendar()
            updateCourseDropdown()
        }).catch(function(error) {
            console.log("Error getting documents: ", error)
        
    })
}
    
// ----------- THIS CREATES THE HTML ELEMENT FOR THE CALENDAR ----------
function createCalendar() {

    console.log("recreating calendar")
    console.log(availability)
    console.log(tempAvailability)
    //clear old calendar
    document.getElementById("calendarContainer").innerHTML = ""

    //create grid for new calendar
    //console.log((closedWidth * 6) + openWidth)
    //$('#calendarContainer').css("width", "277px")
    $('#calendarContainer').css("grid-template-rows", "2em repeat("+(endTime-startTime)+", "+rowHeight+");")
    
        
    //Creates the weekday headings
    for (let weekday = 0; weekday < calDays.length; weekday++) {

        let currentWeekday = calDays[weekday]
        
        //Creates the weekday names at the top of the calendar
        $('#calendarContainer').append('<h6 id="heading_'+currentWeekday+'">'+currentWeekday+'</h6>')

        //classes from bootstrap
        $('#heading_'+currentWeekday).addClass("text-center")
        $('#heading_'+currentWeekday).addClass("align-middle")

        //sets the col
        $('#heading_'+currentWeekday).addClass(currentWeekday)

        //sets the row
        $('#heading_'+currentWeekday).css("grid-row", "1")

    }

    //creates the calendar body
    for (let hour = startTime; hour < endTime; hour++) { 
        for (let weekday = 0; weekday < calDays.length; weekday++) {

            //Creates an element of the calendar
            $('#calendarContainer').append('<p id="button_'+hour+'_'+weekday+'" onmousedown="updateTime(this.id)">'+hour+":30"+'</p>')
            //classes from bootstrap
            $('#button_'+hour+'_'+weekday).addClass("text-center")
            $('#button_'+hour+'_'+weekday).addClass("align-middle")
            $('#button_'+hour+'_'+weekday).addClass("border")
            $('#button_'+hour+'_'+weekday).css("height", rowHeight)

            //sets the color
            $('#button_'+hour+'_'+weekday).addClass("color"+tempAvailability.get(calDays[weekday])[hour])

            //sets the column
            $('#button_'+hour+'_'+weekday).addClass(calDays[weekday])

            //sets the row
            $('#button_'+hour+'_'+weekday).css("grid-row", (hour - startTime + 2))

            

            //console.log("DEBUG: aval on"+ calDays[weekday] +" at "+index+":30 is: "+availability.get(calDays[weekday])[index])
            
        }
    }
    //update the col widths after everything loads in
    updateAvalibility()
    changeRows()
}

        

// ----------- THIS HANDLES THE INTERACTION BETWEEN THE USER AND THE CALENDAR ----------
function updateTime(inputString) {
    //breaks up an input string into the values after _
    let rowPos = inputString.split("_")[1]
    let colPos = inputString.split("_")[2]
    
    let aval = tempAvailability.get(calDays[colPos])[rowPos]

    let user = firebase.auth().currentUser;

    //console.log("DEBUG: Column: "+ colPos+" Row: "+rowPos+"Aval: "+aval)

    if (colPos > selectedDay){
        
        selectedDay++

    } else if (colPos < selectedDay) {

        selectedDay--

    } else {
        switch (aval) {
            case 0:
                console.log("Case 0: unavalible timeslot")
                if (selectedTutor == user.uid) {
                    tempAvailability.get(calDays[colPos])[rowPos] = 1;
                    $('#button_'+rowPos+'_'+colPos).removeClass("color0")
                    $('#button_'+rowPos+'_'+colPos).addClass("color1")
                }
                break;

            case 1:
                console.log("Case 1: avalible timeslot")
                if (selectedTutor == user.uid) {
                    tempAvailability.get(calDays[colPos])[rowPos] = 0;
                    $('#button_'+rowPos+'_'+colPos).removeClass("color1")
                    $('#button_'+rowPos+'_'+colPos).addClass("color0")
                } else {
                    if (radioRow != null) {
                        console.log("remove old selection")
                        tempAvailability.get(calDays[radioCol])[radioRow] = 1;
                    }
                    console.log("new selection")
                    tempAvailability.get(calDays[colPos])[rowPos] = 3;
                    $('#button_'+radioRow+'_'+radioCol).removeClass("color3")
                    $('#button_'+rowPos+'_'+colPos).addClass("color3")
                    radioRow = rowPos
                    radioCol = colPos
                }
                
                break;
            case 2:
                console.log("Case 2: unavalible timeslot -> already scheduled")
                
                break;
            case 3:
                console.log("Case 3: remove selection")
                tempAvailability.get(calDays[colPos])[rowPos] = 1;
                $('#button_'+rowPos+'_'+colPos).removeClass("color3")
                radioCol = null
                radioRow = null
                break;
            default:
                break;
        }
    }
    if (radioCol == null) {
        $("#submitApptReqBtn").prop("disabled", true);
    } else {
        $("#submitApptReqBtn").prop("disabled", false);
    }
    //update the col widths
    changeRows()
}


// ----------- THIS CHANGES WHICH DAY IS SELECTED AND THE CHANGING OF WIDTHS ----------
function changeRows(){
    for (let weekday = 0; weekday < calDays.length; weekday++) {
        if (weekday == selectedDay){
            
            $("."+calDays[weekday]).css("color", "#000000FF")
            $("."+calDays[weekday]).css("width", openWidth)

        } else {
            $("."+calDays[weekday]).css("color", "#00000000")
            $("."+calDays[weekday]).css("width", closedWidth)
        }
    }
}

function changeWeek(move) {
    if (move == "previous") {
        console.log("previous week: " + move)
        lastSunday.setDate(lastSunday.getDate() - 7)

    } else if (move == "future") {
        console.log("future week: " + move)
        lastSunday.setDate(lastSunday.getDate() + 7)
    }
    weekOf = months[lastSunday.getMonth()] + ", " + lastSunday.getDate()  
    longWeekOf = lastSunday.getFullYear() + "_" + months[lastSunday.getMonth()] + "_" + lastSunday.getDate()  
    console.log(longWeekOf)
    radioRow = null
    radioCol = null
    overwriteTempAvalibility()
    createCalendar()
}

function overwriteTempAvalibility() {
    tempAvailability.set("Monday", $.extend(true,[], availability.get("Monday")))
    tempAvailability.set("Tuesday", $.extend(true,[], availability.get("Tuesday")))
    tempAvailability.set("Wednesday", $.extend(true,[],availability.get("Wednesday")))
    tempAvailability.set("Thursday", $.extend(true,[],availability.get("Thursday")))
    tempAvailability.set("Friday", $.extend(true,[],availability.get("Friday")))
    tempAvailability.set("Saturday", $.extend(true,[],availability.get("Saturday")))
    tempAvailability.set("Sunday", $.extend(true,[],availability.get("Sunday")))
}

// ----------- THIS GETS THE TUTORS AVALIBILITY ----------
function updateAvalibility() {
    
    console.log(tempAvailability)
    console.log("Trying to get new tutor schedule for this week")

    document.getElementById("currentWeekButton").innerHTML = weekOf
    db.collection("Sessions").where("tutorID", "==", selectedTutor).where("weekOf", "==", longWeekOf)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) { 
            
            console.log(doc.data())

            tempAvailability.get(calDays[doc.data().tempCol])[doc.data().tempRow] = 2;
            $('#button_'+doc.data().tempRow+'_'+doc.data().tempCol).addClass("color2")
            
        }) 
    })
    
}

// ----------- THIS GETS THE TUTORS COURSES ----------
function updateCourseDropdown() {
    db.collection("Tutors").doc(selectedTutor)
    .onSnapshot(function(doc){ 
        $('#courseSelectDropdown').append('<option>unspecified</option>' )
        for (let index = 0; index < doc.data().subjects.length; index++) {
            $('#courseSelectDropdown').append('<option>'+doc.data().subjects[index]+'</option>')
            
        }
        
    })
}

/*
// ----------- THIS UPDATES THE TUTORS SCHEDULE ----------
function updateTable() {
    db.collection("Tutors").doc(selectedTutor).set({
        schedule: {
        // 0 never avalible, 1 avalible, 2 booked. 3 means selected,array pos means hour
        // 3 should not show up in the database, if it does its an error
        Monday: 	availability.get(calDays[1]),
        Tuesday: 	availability.get(calDays[2]),
        Wednesday: 	availability.get(calDays[3]),
        Thursday: 	availability.get(calDays[4]),
        Friday: 	availability.get(calDays[5]),
        Saturday: 	availability.get(calDays[6]),
        Sunday: 	availability.get(calDays[0])
    }
    }, {merge: true})

}*/

// ----------- THIS CREATES A SESSION ----------
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
            db.collection("Sessions").doc(user.uid + Date.now()).set({

            //just storing the row and col pos from the calendar currently, not as readable but its reliable. can be changed later
            //calendar does not support creating a session thats not in the current week, this will need to be changed
            weekOf: longWeekOf,
            lastSunday: lastSunday,
            tempRow: radioRow,
            tempCol: radioCol,
            sessionDate: sessionDate,
            creationDate: Date.now(),
            tutorID: selectedTutor,
            userID: user.uid, 
            subject: document.getElementById("courseSelectDropdown").value


            }).catch(function(error) {
                console.log("Error getting documents: ", error)
            })
            
        }
    });

    
}
        
    