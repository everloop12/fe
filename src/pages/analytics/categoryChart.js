import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const lineChartOptions = {
  chart: {
    height: 450,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: function (val, { seriesIndex, w }) {
        if (val === 0) return null;
        const seriesName = w.globals.seriesNames[seriesIndex];
        return `${seriesName}: ${val}`;
      }
    }
  }
};

// ==============================|| CATEGORY LINE CHART ||============================== //

const CategoryChart = ({ slot, chartX, chartY }) => {

  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  // Define a unique color palette for the categories
  const colorPalette = [
    '#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B',
    '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#FFBB78', '#F7B6D2',
    '#C5B0D5', '#C49C94', '#AEC7E8', '#FF9896', '#98DF8A', '#FF9896',
    '#FF5733', '#1ABC9C'
  ];

  const [options, setOptions] = useState(lineChartOptions);

  useEffect(() => {
    // Adjust the number of ticks based on the slot
    let tickAmount;
    if (slot === 'year') {
      tickAmount = 12; // One tick per month
    } else if (slot === 'week') {
      tickAmount = 7; // One tick per day
    } else if (slot === 'day') {
      tickAmount = 24; // One tick per hour
    } else {
      tickAmount = chartX.length; // Default to the length of the x-axis data
    }

    setOptions((prevState) => ({
      ...prevState,
      colors: colorPalette, // Use unique colors for each line
      xaxis: {
        categories: chartX,
        labels: {
          style: {
            colors: new Array(chartX.length).fill(secondary),
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: tickAmount, // Dynamically set the tick amount based on the slot
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val, { seriesIndex, w }) {
            if (val === 0) return null;
            const seriesName = w.globals.seriesNames[seriesIndex];
            return `${seriesName}: ${val}`;
          }
        }
      }
    }));
  }, [primary, secondary, line, theme, slot, chartX]);

  return <ReactApexChart options={options} series={chartY} type="line" height={450} />;
};

CategoryChart.propTypes = {
  slot: PropTypes.string,
  chartX: PropTypes.array.isRequired, // X-axis categories (e.g., dates or category names)
  chartY: PropTypes.array.isRequired, // Y-axis values (percentage of questions or similar data)
};

export default CategoryChart;
