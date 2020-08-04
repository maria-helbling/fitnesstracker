//js to deal with charts of stats.

$.get('/api/workout', data=>{
    intensityMinutes(data);
})

const intensityMinutes = (arr)=>{
    let minuteObj = {}
    arr.forEach(element => {
        let dt = moment(element.day).format('MM DD YYYY')
        if (!minuteObj[dt]){
            minuteObj[dt]=element.exercises.filter(element=>element.duration !== undefined).map(element => element = element.duration).reduce((total, num)=>total+num,0)
        } else {
            minuteObj[dt]+=element.exercises.filter(element=>element.duration !== undefined).map(element => element = element.duration).reduce((total, num)=>total+num,0)
        }
    });
    let minutes = []
    let dates = []
    for (let day in minuteObj){
        minutes.push(minuteObj[day])
        dates.push(day)
    }
    let target = $('#intensityMinutes')
    drawChart('darkgreen',minutes ,target)
}

//draw little trend chart
let drawChart = (chartColor, dataArr, appendTarget) =>{
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
            labels: [' ', ' ', ' ', ' ', ' ', ' ',' ',' ',' ',' ',' ',' ',' ',' '],
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
                        beginAtZero:false,
                        display: false
                    },
                    gridLines: {
                        display:false
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
                enabled: false
            },
            maintainAspectRatio: false
            }
    })
}

