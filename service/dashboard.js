

var barOptions = {
    series: [{
        data: [10, 8, 12, 6]
    }],
    chart: {
        type: 'bar',
        height: 'auto',
        width: '100%',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            distributed: true,
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: false,
            columnWidth: '40%'
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true

    },
    xaxis: {
        categories: ['Nicolas', 'Renan', 'Levy', 'Venâncio'],
    },
    yaxis: {
        title: {
            text: 'Quantidade'
        }
    }
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barOptions);
barChart.render();



var pieOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
        height: 'auto',
        width: '100%',
        type: 'pie',
        toolbar: {
            show: false
        }
    },
    labels: ['1989', 'Harry Poter e a Pedra Filosofal', 'É Assim Que Acaba', 'Hunger Games', 'Dom Casmurro'],
    legend: {
        position: 'bottom'
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex];
        },
        style: {
            fontSize: '14px',
            colors: ['#fff']
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                height: '100%',
                width: '100%',
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieOptions);
pieChart.render();

