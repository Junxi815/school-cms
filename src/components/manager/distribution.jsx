import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { getWorld } from "../../lib/services/api";

export default function Distribution({ data, title }) {
  const [options, setOptions] = useState({
    colorAxis: {
      min: 0,
      stops: [
        [0, "#fff"],
        [0.5, Highcharts.getOptions().colors[0]],
        [1, "#1890ff"],
      ],
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "bottom",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
  const [world, setWorld] = useState(null);

  useEffect(() => {
    getWorld().then((res) => {
      const { data } = res;
      setWorld(data);
      setOptions({
        series: [{ mapData: data }],
      });
    });
  }, []);

  useEffect(() => {
    if (!data || !world) {
      return;
    }

    const mapSource = data.map((item) => {
      const target = world.features.find(
        (feature) =>
          item.name.toLowerCase() === feature.properties.name.toLowerCase()
      );

      return !!target
        ? {
            "hc-key": target.properties["hc-key"],
            value: item.amount,
          }
        : {};
    });
    const options = {
      title: {
        text: `<span style="text-transform: capitalize">${title
          .split(/(?=[A-Z])/)
          .join(" ")}</span>`,
      },
      series: [
        {
          data: mapSource,
          mapData: world,
          name: "Total",
          states: {
            hover: {
              color: "#a4edba",
            },
          },
        },
      ],
    };

    setOptions(options);
  }, [data, world, title]);

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
      constructorType={"mapChart"}
    />
  );
}
