$('.workouts').click(function(event){
    let workoutid = $(this).data('id')
    getWorkoutData(workoutid)
})

$('#newExercise').click(function(event){
    let workoutid = $(this).data('id')
    $('#exerciseSubmit').data('id', workoutid)
})


$("[data-open]").click(function() {
    const modalId = $(this).data('open');
    $('#' +modalId).addClass("can-see")
});

$('[data-close]').click(function(){
    $(this).parent().parent().parent().removeClass('can-see')
})

$('select').on('change', function(){
    if ($('select').val() === 'cardio') {
        $('.cardioInput').css('display', 'block')
        $('.strengthInput').css('display', 'none')
    } else {
        $('.cardioInput').css('display', 'none')
        $('.strengthInput').css('display', 'block')
    }
    
})

$('#exerciseSubmit').click(function(event){
    event.preventDefault();
    let typ = $('select').val()
    let id = $(this).data('id')
    let exerObj = {
        name: $('#exerciseModal #name').val(),
        type: typ,
        duration: parseInt($('#exerciseModal #duration').val()), 
    }
    if (typ === 'cardio') {
        exerObj.distance = parseInt($('#exerciseModal #distance').val())
    } else {
        exerObj.weight = parseInt($('#exerciseModal #weight').val()),
        exerObj.sets = parseInt($('#exerciseModal #sets').val()),
        exerObj.reps = parseInt($('#exerciseModal #reps').val())
    }
    postExerciseData(exerObj,id)
})

$('#workoutSubmit').click(function(event){
    event.preventDefault();
    let newWorkoutName = $('#newWorkoutName').val()
    postNewWorkout(newWorkoutName)

})

const postNewWorkout = (workoutName) => {
    $.post('/api/workout', {name: workoutName}, (response) => {
        console.log(response);
        console.log(response._id);
        getWorkoutData(response._id);
    })
}

const postExerciseData = (exerciseObj, workoutid) => {
    $.post('/api/exercise/' + workoutid, exerciseObj, () => {
        getWorkoutData(workoutid);
    })
}

const getWorkoutData = (id) => {
    $('#newExercise').data('id', id)
    $.get('/api/'+ id, data=>{
        console.log(data)
        let dataObj = {
            name: data[0].name,
            day: data[0].day.slice(0,10),
            exercises: data[0].exercises
        }
        console.log(dataObj)
        renderWorkout(dataObj);
    })
}

const renderWorkout = (workoutObj) => {
    $('#name').text(workoutObj.name)
    $('#day').text(workoutObj.day)
    let exercises= workoutObj.exercises
    $('#count').text(exercises.length)
    $('#duration').text(exercises.filter(element=>element.duration !== undefined).map(element => element = element.duration).reduce((total, num)=>total+num,0))
    $('#sets').text(exercises.filter(element=>element.sets !== undefined).map(element => element = element.sets).reduce((total, num)=>total+num,0))
    $('#reps').text(exercises.filter(element=>element.reps !== undefined).map(element => element = element.reps).reduce((total, num)=>total+num,0))
    $('#weight').text(exercises.filter(element=>element.weight !== undefined).map(element => element = element.weight).reduce((total, num)=>total+num,0))
    $('#distance').text(exercises.filter(element=>element.distance !== undefined).map(element => element = element.distance).reduce((total, num)=>total+num,0))
}


