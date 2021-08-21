import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { CommonChartComponentProps } from "../modal/statistics";

export default function PieChart({
  data,
  title,
  category,
}: CommonChartComponentProps) {
  const [options, setOptions] = useState<any>({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
      },
    ],
  });
  useEffect(() => {
    if (!data && !category) {
      return;
    }

    const dataSource = data?.map((item) => ({
      name: item.name,
      y: item.amount,
    }));
    const total = dataSource?.reduce((acc, cur) => acc + cur.y, 0);
    let titleText, subtitleText;
    if (total) {
      if (!!title) {
        titleText = `${title} total: ${total}`;
      } else {
        subtitleText = `${category} total: ${total}`;
      }
    }
    setOptions({
      series: [
        {
          name: "percentage",
          colorByPoint: true,
          data: dataSource,
        },
      ],
      title: {
        text: titleText || "",
        style: { color: "#666", fontSize: "14px" },
      },
      subtitle: {
        text: subtitleText,
        align: "right",
        style: { color: "#666", fontSize: "14px" },
      },
    });
  }, [data, title, category]);

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
      constructorType={"chart"}
    />
  );
}
