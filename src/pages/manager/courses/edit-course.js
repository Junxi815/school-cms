import { Row, Col, Input, Select } from "antd";
import { useState } from "react";

export default function EditCourse() {
  const [searchType, setSearchType] = useState("uid");
  const [selectOptions, setSelectOptions] = useState([]);
  return (
    <Row>
      <Col span={12}>
        <Input.Group compact size="big">
          <Select
            defaultValue="uid"
            onChange={(value) => {
              setSearchType(value);
            }}
          >
            <Select.Option value="uid">Code</Select.Option>
            <Select.Option value="name">Name</Select.Option>
            <Select.Option value="type">Category</Select.Option>
          </Select>
          <Select
            showSearch
            placeholder={`Search course by ${searchType}`}
            // onFocus={onFocus}
            // loading={loading}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {selectOptions?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Input.Group>
      </Col>
    </Row>
  );
}
