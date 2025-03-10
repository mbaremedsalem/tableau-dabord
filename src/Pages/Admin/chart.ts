import { ChartOptions, ChartData } from 'chart.js'

const options: ChartOptions<'doughnut'> = {
  maintainAspectRatio: false,
  cutout: '60%',
  animation: {
    duration: 500 // Removed 'resize' and kept valid properties
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label || ''
          if (label) {
            label += ': '
          }
          if (context.raw !== null) {
            label += new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD' 
            }).format(Number(context.raw))
          }
          return label
        }
      },
      backgroundColor: '#fff',
      titleColor: '#000',
      bodyColor: '#000',
      borderColor: 'red',
      borderWidth: 1
    }
  }
}

const data13: ChartData<'doughnut'> = {
  labels: ['Tablet', 'Mobile', 'Desktop'],
  datasets: [
    {
      data: [10, 10, 80],
      backgroundColor: ['yellow', 'green', 'black'],
      borderWidth: 0
    }
  ]
}

export { options, data13 }
