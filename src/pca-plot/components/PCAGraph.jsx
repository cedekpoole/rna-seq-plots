import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HC_annotations from "highcharts/modules/annotations";
import { useState, useEffect, useRef } from "react";
import Highcharts3d from "highcharts/highcharts-3d";

// Initializing Highcharts with additional modules
highchartsAccessibility(Highcharts);
HC_exporting(Highcharts);
HC_annotations(Highcharts);
Highcharts3d(Highcharts);

function PCAGraph({
  pcaData,
  scoresData,
  parsedSampleInfo,
  selectedPCs,
  colorBy,
}) {
  // Sort the selected PCs in ascending order
  const sortedPCs = [...selectedPCs].sort((a, b) => a - b);

  const [chartOptions, setChartOptions] = useState({});
  const [colorMapping, setColorMapping] = useState({});
  const [chartKey, setChartKey] = useState(0);

  const is3D = selectedPCs.length === 3;

  const chartRef = useRef(null);

  const colorsArray = [
    "rgb(254,125,43)",
    "rgb(60,89,193)",
    "rgb(0,158,115)",
    "rgb(247,72, 165)",
    "rgb(240,228,66)", // Add more colors if needed
  ];

  const addDragFunctionality = (chart) => {
    function dragStart(eStart) {
      eStart = chart.pointer.normalize(eStart);
  
      const posX = eStart.chartX,
            initialBeta = chart.options.chart.options3d.beta,
            sensitivity = 5;  // lower is more sensitive
      const handlers = [];
  
      function drag(e) {
        e = chart.pointer.normalize(e);
  
        // Calculate the new beta value within specified limits
        let newBeta = initialBeta + (posX - e.chartX) / sensitivity;
        const minBeta = 20; // Minimum rotation angle (restricts left rotation)
        const maxBeta = 80;  // Maximum rotation angle (allows more right rotation)
        newBeta = Math.max(minBeta, Math.min(newBeta, maxBeta)); // Constrain within limits
  
        chart.update({
          chart: {
            options3d: {
              beta: newBeta
            }
          }
        }, undefined, undefined, false);
      }
  
      function unbindAll() {
        handlers.forEach((unbind) => {
          if (unbind) {
            unbind();
          }
        });
        handlers.length = 0;
      }
  
      handlers.push(Highcharts.addEvent(document, 'mousemove', drag));
      handlers.push(Highcharts.addEvent(document, 'touchmove', drag));
      handlers.push(Highcharts.addEvent(document, 'mouseup', unbindAll));
      handlers.push(Highcharts.addEvent(document, 'touchend', unbindAll));
    }
  
    Highcharts.addEvent(chart.container, 'mousedown', dragStart);
    Highcharts.addEvent(chart.container, 'touchstart', dragStart);
  };
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [is3D]);
  

  useEffect(() => {
    // Create a stable color mapping for series names
    const updatedColorMapping = { ...colorMapping };
    parsedSampleInfo.forEach((sample) => {
      const seriesName = sample[colorBy];
      if (!updatedColorMapping[seriesName]) {
        updatedColorMapping[seriesName] =
          colorsArray[
            Object.keys(updatedColorMapping).length % colorsArray.length
          ];
      }
    });
    setColorMapping(updatedColorMapping);
  }, [colorBy, parsedSampleInfo]);

  useEffect(() => {
    const seriesData = {};
    const initialAnnotations = [];
    parsedSampleInfo.forEach((sample, idx) => {
      const seriesName = sample[colorBy];
      if (!seriesData[seriesName]) {
        seriesData[seriesName] = {
          name: seriesName,
          color: colorMapping[seriesName], // Use the stable color mapping
          data: [],
        };
      }
      const point = {
        x: scoresData[idx][sortedPCs[0] - 1],
        y: scoresData[idx][sortedPCs[1] - 1],
        z: is3D ? scoresData[idx][sortedPCs[2] - 1] : null,
        name: Object.values(sample)[0],
        id: "point" + idx, // Unique ID for the point
        ...sample,
      };
      seriesData[sample[colorBy]].data.push(point);

      // Add a default annotation for each point
      initialAnnotations.push({
        id: "annotation-point" + idx, // Unique ID for the annotation
        labels: [
          {
            point: "point" + idx,
            text: point.name,
            backgroundColor: "rgba(255,255,255,0.5)",
            borderColor: "black",
            shape: "connector",
            overflow: "justify",
            crop: true,
          },
        ],
        labelOptions: {
          shape: "connector",
          align: "right",
          justify: false,
          crop: true,
          style: {
            fontSize: "0.7em",
            fontWeight: "bold",
            textOutline: "1px white",
          },
          allowOverlap: true,
        },
      });
    });

    const newOptions = {
      chart: {
        type: "scatter",
        marginBottom: 120,
        marginRight: 15,
        marginTop: 80,
        options3d: is3D
          ? {
              enabled: true,
              alpha: 10,
              beta: 30,
              depth: 250,
              viewDistance: 15,
              fitToPlot: false,
              frame: {
                bottom: { size: 1, color: "rgba(0,0,0,0.02)" },
                back: { size: 1, color: "rgba(0,0,0,0.04)" },
                side: { size: 1, color: "rgba(0,0,0,0.06)" },
              },
            }
          : {enabled: false},
        events: {
          load: function () {
            // Add default annotations on load
            this.annotations.forEach((annotation) => {
              annotation.labels[0].options.point = this.get(
                annotation.labels[0].options.point
              );
            });
          },
        },
      },
      title: {
        text: "",
        style: {
          color: "transparent",
        },
      },
      xAxis: {
        title: {
          text: `PC${sortedPCs[0]} (${(
            pcaData[`pc${sortedPCs[0]}`] * 100
          ).toFixed(2)}%)`,
        },
      },
      yAxis: {
        lineWidth: 1,
        gridLineWidth: 1, // Width of the grid lines
        gridLineColor: "#EEEEEE",
        title: {
          text: `PC${sortedPCs[1]} (${(
            pcaData[`pc${sortedPCs[1]}`] * 100
          ).toFixed(2)}%)`,
        },
      },
      zAxis: is3D 
      ? {
        title: {
          text: `PC${sortedPCs[2]} (${(
            pcaData[`pc${sortedPCs[2]}`] * 100
          ).toFixed(2)}%)`,
          style: {
            color: '#333333',
          },
          align: 'high',
          offset: 0,
          rotation: 0,
          y: 15, // Adjust the y position to avoid overlapping
        },
      } : null,
      tooltip: {
        hideDelay: 200,
      },
      legend: {
        verticalAlign: "top",
      },
      plotOptions: {
        scatter: {
          tooltip: {
            pointFormat: "<b>{point.name}</b><br>Type: {point.type}",
          },
        },
        series: {
          marker: {
            symbol: "circle",
            radius: 4,
          },
          states: {
            inactive: {
              opacity: 1,
            },
          },
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                const chart = this.series.chart;
                // Use point's ID to find the associated annotation
                const annotation = chart.annotations.find(
                  (a) => a.options.id === "annotation-" + this.id
                );
                if (annotation) {
                  // Remove the existing annotation using the annotation's ID
                  chart.removeAnnotation(annotation.options.id);
                } else {
                  // Add a new annotation for the point
                  chart.addAnnotation({
                    id: "annotation-" + this.id,
                    labels: [
                      {
                        point: this.id,
                        text: this.name,
                        backgroundColor: "rgba(255,255,255,0.5)",
                        borderColor: "black",
                        shape: "connector",
                        overflow: "justify",
                        crop: true,
                      },
                    ],
                    labelOptions: {
                      shape: "connector",
                      align: "right",
                      justify: false,
                      crop: true,
                      style: {
                        fontSize: "0.7em",
                        fontWeight: "bold",
                        textOutline: "1px white",
                      },
                      allowOverlap: true,
                    },
                  });
                }
              },
            },
          },
        },
      },
      series: Object.values(seriesData),
      annotations: initialAnnotations,
    };
    setChartOptions(newOptions);
  }, [
    is3D,
    colorBy,
    pcaData,
    colorMapping,
    scoresData,
    parsedSampleInfo,
    selectedPCs,
  ]);

  const handleChartRendered = (chart) => {
    if (is3D) {
      addDragFunctionality(chart);
    } 
  };

  return (
    <div className="h-[450px] -ml-5 sm:h-[700px] lg:h-[600px] w-full">
      <HighchartsReact
        key={chartKey}
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ className: "h-full" }}
        callback={handleChartRendered}
      />
    </div>
  );
}

export default PCAGraph;
