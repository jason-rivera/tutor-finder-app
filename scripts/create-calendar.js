//This mess holds the Map for the calendar, it can be generated and edited by the code below.
//In order to save this map to firestore all you need to do is 

//Test map/array

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

let selectedDay = 3;

let rowHeight = "40px"
let openWidth = "150px"
let closedWidth ="20px"

let startTime = 6
let endTime = 21

let calDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let calDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

let selectedTutor = ""

function setCalendar(userid) {
    
    db.collection("Tutors").doc(userid)
        .get().then(function(doc) {
            console.log("load tutor")
            availability.set("Monday", doc.data().schedule.Monday)
            availability.set("Tuesday", doc.data().schedule.Tuesday)
            availability.set("Wednesday", doc.data().schedule.Wednesday)
            availability.set("Thursday", doc.data().schedule.Thursday)
            availability.set("Friday", doc.data().schedule.Friday)
            availability.set("Saturday", doc.data().schedule.Saturday)
            availability.set("Sunday", doc.data().schedule.Sunday)

            selectedTutor = userid

        }).catch(function(error) {
            console.log("Error getting documents: ", error)
        
    })
}
    
//This would be a problem if there was more than one tutor with the same id but that should not matter
function createCalendar() {

    document.getElementById("calendarContainer").innerHTML = "<h6 class='times text-center  align-middle'></h6>";
    $('#calendarContainer').css("grid-template-rows", "2em repeat("+(endTime-startTime)+", "+rowHeight+");");
    
    //Looping through this was difficult so its hardcoded
    

    for (let index = 0; index < calDays.length; index++) {
        
        $('#calendarContainer').append(
            //I have no idea why this code works while missing a " but it breaks when put in
            '<h6 id="heading_'+calDays[index]+'" class=" text-center align-middle  '+calDays[index]+' style=" grid-row: 1;">'+calDays[index]+'</h6>'
        )                 
    
    }

    for (let index = startTime; index < endTime; index++) {
        
        for (let index2 = 0; index2 < calDays.length; index2++) {
            
            console.log(availability.get(calDays[index2])[index])
            $('#calendarContainer').append(
                '<p id="button_'+index+'_'+index2+'" onmousedown="updateTime(this.id)" class=" text-center align-middle border '+calDays[index2]+' color'+availability.get(calDays[index2])[index]+'" style=" grid-row:'+(index - startTime + 2)+';">'+index+":30"+'</p>'
                
            )
        }
    }
    changeRows()
}

        

        
            
function updateTime(inputString) {
    let rowPos = inputString.split("_")[1]
    let colPos = inputString.split("_")[2]
    
    let aval = availability.get(calDays[colPos])[rowPos]

    console.log("Column: "+ colPos+" Row: "+rowPos+"Aval: "+aval)

    if (colPos > selectedDay){

        selectedDay++

    } else if (colPos < selectedDay) {
        selectedDay--
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
            case 2:
                
                break;
        
            default:
                break;
        }
    }
    changeRows()
}

function changeRows(){
    for (let index = 0; index < calDays.length; index++) {
        if (index == selectedDay){
            
            $("."+calDays[index]).css("color", "#000000FF")
            $("."+calDays[index]).css("width", openWidth)

        } else {
            $("."+calDays[index]).css("color", "#00000000")
            $("."+calDays[index]).css("width", closedWidth)
        }
    }
}

function updateTable(userid) {
    db.collection("Tutors").doc(userid).set({
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
        
    