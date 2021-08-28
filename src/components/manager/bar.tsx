import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { BarChartProps } from "../modal/statistics";

export default function BarChart({ data }: BarChartProps) {
  const [options, setOptions] = useState<any>({
    chart: {
      type: "column",
    },
    title: {
      text: "Student VS Teacher",
    },
    subtitle: {
      text: "Comparing what students are interested in and teachers' skills",
    },

    yAxis: {
      min: 0,
      title: {
        text: "Interested vs Skills",
      },
      stackLabels: {
        enabled: true,
        format: "",
        style: {
          fontWeight: "bold",
          color:
            (Highcharts?.defaultOptions?.title?.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:14px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        stacking: "normal",
      },
    },

    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    legend: {
      align: "right",
      x: -30,
      verticalAlign: "bottom",
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts?.defaultOptions?.legend?.backgroundColor || "white",
      shadow: false,
    },
  });

  useEffect(() => {
    const { teacherSkills, studentInterest } = data;
    if (!teacherSkills || !studentInterest) {
      return;
    }
    const categories = Object.entries(teacherSkills).map(
      ([course, _]) => course
    );
    const skillsData = Object.entries(teacherSkills)
      .filter(([_, arr]) => arr.length > 0)
      .reduce(
        (acc: Array<any>, cur) => {
          for (let i = 1; i <= 5; i++) {
            const target = cur[1].find((item: any) => item.level === i);
            if (target) {
              acc[i - 1].data.push(target.amount);
            } else {
              acc[i - 1].data.push(0);
            }
          }
          return acc;
        },
        [
          { name: "Know", data: [], stack: "skills" },
          {
            name: "Practiced",
            data: [],
            stack: "skills",
          },
          { name: "Comprehend", data: [], stack: "skills" },
          { name: "Expert", data: [], stack: "skills" },
          { name: "Master", data: [], stack: "skills" },
        ]
      );
    const interestData = categories.reduce(
      (acc: any, courseName) => {
        const target = studentInterest.find((item) => item.name === courseName);
        acc.data.push(target ? target.amount : 0);
        return acc;
      },
      { name: "Amount interested", data: [] }
    );
    setOptions({
      xAxis: {
        categories,
      },
      series: skillsData.concat(interestData),
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
