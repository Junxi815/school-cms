import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { LineChartProps } from "../modal/statistics";

export default function LineChart({ data }: LineChartProps) {
  const today = new Date();
  const [options, setOptions] = useState<any>({
    title: {
      text: `Increment in ${today.getFullYear()}`,
    },

    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].slice(0, today.getMonth() + 1),
    },

    yAxis: {
      title: {
        text: "increment",
      },
    },

    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentYear = today.getFullYear() + "";
    const currentMonth = today.getMonth() + 1;

    const series = Object.entries(data)
      .filter(([_, data]) => !!data && !!data.length)
      .map(([name, data]) => ({
        name,
        data: new Array(currentMonth).fill(0).map((_, index) => {
          const month = index + 1;
          const formattedMonth = month > 9 ? "" + month : "0" + month;
          const target = data.find(
            (item) =>
              item.name.split("-")[0] === currentYear &&
              item.name.split("-")[1] === formattedMonth
          );

          return (target && target.amount) || 0;
        }),
      }));

    setOptions({
      series,
    });
  }, [data]);

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
      constructorType={"chart"}
    />
  );
}
