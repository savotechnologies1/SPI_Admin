import ReactApexChart from "react-apexcharts";

const CapacityRadialChart = () => {
  const series = [30, 50, 80]; // Values for each section
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",

    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
          
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "24px",
            color: "#000",
            fontWeight: "bold",
            offsetY: 10,
          },
          total: {
            show: true,
            label: "Total",
            formatter: () => `500`,
          },


        },
        track: {
          background: "#f0f0f0",
        },
      },
    },
    labels: ["Sanding", "Inspection", "CutTrim"],
    colors: ["#00C853", "#FFC107", "#FF5722"], // Green, yellow, red
    legend: {
      show: true,
      position: "bottom",
      markers: {
        size: 10,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Status By Process</h2>
      <ReactApexChart options={options} series={series} type="radialBar" height={300} />
    </div>
  );
};

export default CapacityRadialChart;
