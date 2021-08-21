import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { getMapGeoJSON } from "../../lib/services/api";
import { CommonChartComponentProps } from "../modal/statistics";

export default function Distribution({ data }: CommonChartComponentProps) {
  const [mapGeoJSON, setMapGeoJSON] = useState<any>(null);
  const [options, setOptions] = useState<any>({
    colorAxis: {
      min: 0,
      stops: [
        [0, "#fff"],
        [0.5, "#2f7ed8"],
        // [0.5, Highcharts.getOptions().colors[0]],
        [1, "#1890ff"],
      ],
    },
    //legend by default

    mapNavigation: {
      enabled: true,
      enableButtons: false,
      enableMouseWheelZoom: true, //不起作用
    },

    credits: { enabled: false },

    exporting: {
      enabled: true,
    },

    title: { text: undefined },
    // title: {
    //   text: '<select defaultValue="car1"><option value="car1">car1</option><option value="car2">car2</option></select>',
    //   useHTML: true,
    // },

    series: [
      {
        type: "map",
        name: "Total",
        states: {
          hover: {
            color: "#a4edba",
          },
        },
        tooltip: {
          valueSuffix: ` people`,
        },
      },
    ],
  });

  useEffect(() => {
    getMapGeoJSON().then((res) => {
      const { data } = res;
      setMapGeoJSON(data);
      setOptions({
        series: [{ mapData: data }],
      });
    });
  }, []);

  useEffect(() => {
    if (!data || !mapGeoJSON) {
      return;
    }

    const mapSource = data.map((item) => {
      const target = mapGeoJSON?.features.find(
        (feature: any) =>
          item.name.toLowerCase() === feature.properties.name.toLowerCase()
      );

      return !!target
        ? {
            "hc-key": target.properties["hc-key"],
            value: item.amount,
          }
        : {};
    });

    setOptions({
      series: [
        {
          data: mapSource,
          tooltip: {
            valueSuffix: ` people`,
          },
        },
      ],
    });
  }, [data, mapGeoJSON]);

  // useEffect(() => {
  //   console.log(options.series);
  // }, [options]);

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
      constructorType={"mapChart"}
    />
  );
}
