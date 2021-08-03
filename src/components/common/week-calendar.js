import { useEffect, useState } from "react";
import { Table } from "antd";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const columns = weekdays.map((item) => ({
  title: item,
  dataIndex: item,
  key: item,
}));

export default function WeekCalendar({ data }) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const dataObj = {
      key: 0,
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    };
    data?.forEach((item) => {
      const itemArray = item.split(" ");
      dataObj[itemArray[0]] = itemArray[1];
    });

    setTableData([dataObj]);
  }, [data]);
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      size={"small"}
      bordered
    ></Table>
  );
}
