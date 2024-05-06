import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function ScreePlot({ pcaData, onSelectPC }) {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: ".",
      style: {
        color: "transparent",
      }
    },
    xAxis: {
      categories: Object.keys(pcaData).map((key) => key.toUpperCase()), // Convert to uppercase for better labeling
      title: {
        text: "Principal Component",
      },
    },
    yAxis: {
      lineWidth: 1,
      min: 0,
      max: 100,
      title: {
        text: "% of Variance Explained",
      },
    },
    plotOptions: {
      column: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              onSelectPC(this.index);
            },
          },
        },
        color: "rgb(60,89,193)",
        tooltip: {
          pointFormat: "<b>{point.y:.2f}%</b>",
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Variance",
        data: Object.values(pcaData).map((value) => value * 100), // Convert to percentage
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ScreePlot;
