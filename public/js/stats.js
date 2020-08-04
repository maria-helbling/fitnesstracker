//js to deal with charts of stats.

$.get('/api/workout', data=>{
    intensityMinutes(data);
    countExercises(data);
    typeRatio(data)
})

//type of exercise ratio
const typeRatio = (arr)=>{
    let typeArr = [0,0]
    arr.forEach(element => {
            typeArr[0]+= element.exercises.filter(ex=>ex.type === 'cardio').length
            typeArr[1]+=element.exercises.filter(ex=>ex.type === 'strength').length
    })
    
    let target = $('#type')
    drawDoughnutChart(['darkgreen', 'goldenrod'],typeArr,target)
}
//number of exercises
const countExercises = (arr)=>{
    let exerciseObj = getDates()
    
    arr.forEach(element => {
        let dt = moment(element.day).format('MM DD YYYY')
            exerciseObj[dt]+=element.exercises.length
    })
    let numArr = []
    let dates = []
    for (let day in exerciseObj){
        numArr.push(exerciseObj[day])
        dates.push(day)
    }

    let target = $('#totalEx')
    drawChart('goldenrod',numArr ,dates,target)
}

//intensity minutes this week
const intensityMinutes = (arr)=>{
    let minuteObj = getDates()
    
    arr.forEach(element => {
        let dt = moment(element.day).format('MM DD YYYY')
            minuteObj[dt]+=element.exercises.filter(element=>element.duration !== undefined).map(element => element = element.duration).reduce((total, num)=>total+num,0)
    })

    let minutes = []
    let dates = []
    for (let day in minuteObj){
        minutes.push(minuteObj[day])
        dates.push(day)
    }

    let target = $('#intensityMinutes')
    drawChart('darkgreen',minutes ,dates,target)
}

//draw bar chart
let drawChart = (chartColor, dataArr,lableArr, appendTarget) =>{
    //set unique chart id
    let identifier = `val${dataArr[0]}`
    //put canvas on page
    // let chartArea = $(`<div class="chart-container" id="datachart">`)
    let chartArea =$(`<canvas id="${identifier}">`)
    appendTarget.append(chartArea)
    let ctx=$(`#${identifier}`);
    //draw chart
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lableArr,
            datasets: [{
                label:'',
                data: dataArr,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        display: true
                    },
                    gridLines: {
                        display:true
                    }
                }],
                xAxes:[{
                    gridLines: {
                        display:false
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            },
            maintainAspectRatio: false
            }
    })
}

//draw doughnut chart
let drawDoughnutChart = (chartColor, dataArr, appendTarget) =>{
    //set unique chart id
    let identifier = `val${dataArr[0]}`
    //put canvas on page
    // let chartArea = $(`<div class="chart-container" id="datachart">`)
    let chartArea =$(`<canvas id="${identifier}">`)
    appendTarget.append(chartArea)
    let ctx=$(`#${identifier}`);
    //draw chart
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['cardio', 'strength'],
            datasets: [{
                label:'',
                data: dataArr,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        display: false
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes:[{
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        beginAtZero:true,
                        display: false
                    }
                }]
            },
            legend: {
                display: true
            },
            tooltips: {
                enabled: true
            },
            maintainAspectRatio: false
            }
    })
}

let getDates = () => {
    let obj = {}
    for (let i=0; i<7; i++) {
        obj[moment().subtract(i,'d').format('MM DD YYYY')] = 0
    }   
    return obj
}