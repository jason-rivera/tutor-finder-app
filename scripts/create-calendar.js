// ----------- CALENDAR ----------
//creates a calendar used by the search page to select a session

// ----------- MUST BE INSTANCE VARIABLES BEGINNING -----------

//instance array of the week days, could be replaced by methods already in the Date object
let calDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

//shorter week day names
let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

//months
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//the local date, day of last sunday, current date, 
let localDate = new Date()
let lastSunday = new Date()
let selectedDay = localDate.getDay()
lastSunday.setDate(localDate.getDate() - selectedDay)
lastSunday.setHours(0, 0, 0)

//weekOf as a string for display, long week of for searching
let weekOf = months[lastSunday.getMonth()] + ", " + lastSunday.getDate() 
let longWeekOf = lastSunday.getFullYear() + "_" + months[lastSunday.getMonth()] + "_" + lastSunday.getDate()  

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


// ----------- START POINT FOR CREATING/RELOADING CALENDAR ----------
function initializeCalendar(tutorID) {
    localDate = new Date()
    lastSunday = new Date()
    
    selectedDay = localDate.getDay()
    lastSunday.setDate(localDate.getDate() - selectedDay)
    lastSunday.setHours(0, 0, 0)
    weekOf = months[lastSunday.getMonth()] + ", " + lastSunday.getDate()
    longWeekOf = lastSunday.getFullYear() + "_" + months[lastSunday.getMonth()] + "_" + lastSunday.getDate()
    
    $("#submitApptReqBtn").prop("disabled", true);
    
    radioRow = null
    radioCol = null
    setCalendar(tutorID )
}

// ----------- THIS GETS THE CALENDAR FOR THE SELECTED TUTOR ----------
function setCalendar(tutorID) {    
    db.collection("Tutors").doc(tutorID)
    .get().then(function(doc) {

        availability.set("Monday", doc.data().schedule.Monday)
        availability.set("Tuesday", doc.data().schedule.Tuesday)
        availability.set("Wednesday", doc.data().schedule.Wednesday)
        availability.set("Thursday", doc.data().schedule.Thursday)
        availability.set("Friday", doc.data().schedule.Friday)
        availability.set("Saturday", doc.data().schedule.Saturday)
        availability.set("Sunday", doc.data().schedule.Sunday)

        overwriteTempAvalibility()
        selectedTutor = tutorID
        createCalendar()
        updateCourseDropdown()

    }).catch(function(error) {
        console.log("Error getting documents: ", error)
    })
}

//overwrites tempavalibilty without copying it as a reference
function overwriteTempAvalibility() {
    tempAvailability.set("Monday", $.extend(true,[], availability.get("Monday")))
    tempAvailability.set("Tuesday", $.extend(true,[], availability.get("Tuesday")))
    tempAvailability.set("Wednesday", $.extend(true,[],availability.get("Wednesday")))
    tempAvailability.set("Thursday", $.extend(true,[],availability.get("Thursday")))
    tempAvailability.set("Friday", $.extend(true,[],availability.get("Friday")))
    tempAvailability.set("Saturday", $.extend(true,[],availability.get("Saturday")))
    tempAvailability.set("Sunday", $.extend(true,[],availability.get("Sunday")))
}

// ----------- THIS GETS THE TUTORS COURSES ----------
function updateCourseDropdown() {
    db.collection("Tutors").doc(selectedTutor)
    .onSnapshot(function(doc){ 
        $('#courseSelectDropdown').empty()
        $('#courseSelectDropdown').append('<option>Choose a course</option>' )
        for (let index = 0; index < doc.data().subjects.length; index++) {
            $('#courseSelectDropdown').append('<option>'+doc.data().subjects[index]+'</option>')
            
        }
        
    })
}
    
// ----------- THIS CREATES THE HTML ELEMENT FOR THE CALENDAR ----------
function createCalendar() {
    document.getElementById("calendarContainer").innerHTML = ""
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
            
            let tempDate = new Date(lastSunday)
            tempDate.setDate(parseInt(lastSunday.getDate()) + parseInt(weekday))
            tempDate.setHours(parseInt(lastSunday.getHours()) + parseInt(hour))
             
            //if date is in the past, color it gray (4)
            if (tempDate <= localDate) {
                tempAvailability.get(calDays[weekday])[hour] = 4
            }

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
        }
    }
    //update the col widths after everything loads in
    updateAvalibility()
    changeRows()
}

// ----------- THIS GETS THE TUTORS AVALIBILITY FOR THE CALENDAR ----------
function updateAvalibility() {
    db.collection("Sessions").where("tutorID", "==", selectedTutor).where("weekOf", "==", longWeekOf)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) { 
            if (tempAvailability.get(calDays[doc.data().tempCol])[doc.data().tempRow] != 4) {
                tempAvailability.get(calDays[doc.data().tempCol])[doc.data().tempRow] = 2;
                $('#button_'+doc.data().tempRow+'_'+doc.data().tempCol).addClass("color2")
            }
        }) 
    })
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
    let tempDate = new Date(lastSunday)
    tempDate.setDate(parseInt(lastSunday.getDate()) + parseInt(selectedDay))
    weekOf = months[tempDate.getMonth()] + ", " + tempDate.getDate()  
    document.getElementById("currentWeekButton").innerHTML = weekOf
}

// ----------- THIS HANDLES THE INTERACTION BETWEEN THE USER AND THE CALENDAR ----------
function updateTime(inputString) {
    //breaks up an input string into the values after _
    let rowPos = inputString.split("_")[1]
    let colPos = inputString.split("_")[2]
    
    let aval = tempAvailability.get(calDays[colPos])[rowPos]
    let user = firebase.auth().currentUser;

    if (colPos > selectedDay){
        selectedDay++
    } else if (colPos < selectedDay) {
        selectedDay--
    } else {
        switch (aval) {
            case 0:
                if (selectedTutor == user.uid) {
                    tempAvailability.get(calDays[colPos])[rowPos] = 1;
                    $('#button_'+rowPos+'_'+colPos).removeClass("color0")
                    $('#button_'+rowPos+'_'+colPos).addClass("color1")
                }
                break;
            case 1:
                if (selectedTutor == user.uid) {
                    tempAvailability.get(calDays[colPos])[rowPos] = 0;
                    $('#button_'+rowPos+'_'+colPos).removeClass("color1")
                    $('#button_'+rowPos+'_'+colPos).addClass("color0")
                } else {
                    if (radioRow != null) {
                        tempAvailability.get(calDays[radioCol])[radioRow] = 1;
                    }
                    tempAvailability.get(calDays[colPos])[rowPos] = 3;
                    $('#button_'+radioRow+'_'+radioCol).removeClass("color3")
                    $('#button_'+rowPos+'_'+colPos).addClass("color3")
                    radioRow = rowPos
                    radioCol = colPos
                }
                break;
            case 2:
                //do nothing
                break;
            case 3:
                tempAvailability.get(calDays[colPos])[rowPos] = 1;
                $('#button_'+rowPos+'_'+colPos).removeClass("color3")
                radioCol = null
                radioRow = null
                break;
            case 4:
                break;
            default:
                break;
        }
    }
    if (radioCol == null) {
        $("#submitApptReqBtn").prop("disabled", true)
    } else {
        $("#submitApptReqBtn").prop("disabled", false)
    }
    //update the col widths
    changeRows()
}

// ----------- SHIFTS WEEK FORWARDS AND BACKWARDS ----------
function changeWeek(move) {

    if (move == "previous") {
        lastSunday.setDate(lastSunday.getDate() - 7)
    } else if (move == "future") {
        lastSunday.setDate(lastSunday.getDate() + 7)
    }

    weekOf = months[lastSunday.getMonth()] + ", " + lastSunday.getDate()  
    longWeekOf = lastSunday.getFullYear() + "_" + months[lastSunday.getMonth()] + "_" + lastSunday.getDate()  
    radioRow = null
    radioCol = null
    overwriteTempAvalibility()
    createCalendar()
}

// ----------- THIS CREATES A SESSION ----------
function createSession() {
    firebase.auth().onAuthStateChanged(function(user) {
    
        if (radioRow != null) {

            //CHANGE SELCTED TIMESLOT TO CONFIMRED (3 -> 2)
            tempAvailability.get(calDays[radioCol])[radioRow] = 2;

            let sessionDate = lastSunday
            sessionDate.setDate(lastSunday.getDate() + parseInt(radioCol))
            sessionDate.setHours(parseInt(radioRow), 30, 0)

            let message = $('#messageBoxSession').value
                
            db.collection("Tutors").doc(selectedTutor).get().then(function(doc) {
                db.collection("Sessions").doc(user.uid + Date.now()).set({

                    weekOf: longWeekOf,
                    tempRow: radioRow,
                    tempCol: radioCol,
                    sessionDate: sessionDate,
                    creationDate: new Date(),
                    message: message,
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
    })
}
        
    