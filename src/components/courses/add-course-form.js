import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Upload,
  Modal,
  message,
} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  addCourse,
  getCourseCode,
  getCourseTypes,
  getTeachers,
  updateCourse,
} from "../../lib/services/api";
import moment from "moment";
import ImgCrop from "antd-img-crop";
import { InboxOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Item } = Form;
const { Option } = Select;

const DescriptionItem = styled(Item)`
  height: 100%;
  .ant-form-item-control .ant-form-item-control-input {
    height: calc(100% - 24px);
  }
  .ant-form-item-control-input-content {
    height: 100%;
  }
`;
const UploadItem = styled(Item)`
  height: calc(100% - 24px);
  .ant-form-item-control-input,
  .ant-form-item-control-input-content,
  .ant-upload-picture-card-wrapper,
  .ant-upload-list.ant-upload-list-picture-card,
  .ant-upload-list-picture-card-container,
  .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    height: 100%;
    width: 100%;
  }
`;
const UploadInner = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 1.2em;
    color: #999;
  }
  p .anticon {
    font-size: 2em;
    color: #1890ff;
  }
`;
const DeleteIcon = styled(CloseCircleOutlined)`
  color: red;
  position: absolute;
  right: 1em;
  top: 2em;
  font-size: 24px;
  opacity: 0.5;
`;

const DurationUnitItem = styled(Item)`
  .ant-form-item-label {
    visibility: hidden;
  }
`;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function AddCourseForm({ onSuccess, isReset, course }) {
  console.log({ onSuccess, isReset, course });
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const req = {
      ...values,
      duration: +values.duration,
      startTime: values.startTime && values.startTime.format("YYYY/MM/DD"),
    };
    if (!!course) {
      (async () => {
        const result = await updateCourse({ ...req, id: course.id });
        if (result.data) {
          message.success("Updated course successfully.");
        }
      })();
    } else {
      (async () => {
        const result = await addCourse(req);
        if (!!result.data) {
          onSuccess(result.data);
        } else {
          message.error(result.msg);
        }
      })();
    }
  };

  const onFocus = async () => {
    setLoading(true);
    const { data } = await getTeachers();
    if (!!data) {
      setSelectOptions(data.teachers);
    }
    setLoading(false);
  };

  if (isReset) {
    form.resetFields();
  }

  useEffect(() => {
    if (!!course) {
      const values = {
        ...course,
        type: course.type.map((item) => item.id),
        teacherId: course.teacherName,
        startTime: moment(course.startTime),
      };

      form.setFieldsValue(values);

      setFileList([{ name: "Cover Image", url: course.cover }]);
    }
  }, [course, form]);

  useEffect(() => {
    if (!course && !!onSuccess) {
      (async () => {
        const codeResponse = await getCourseCode();
        !!codeResponse.data && form.setFieldsValue({ uid: codeResponse.data });
      })();
    }
    (async () => {
      const typeResponse = await getCourseTypes();
      !!typeResponse.data && setCourseTypes(typeResponse.data);
    })();
  }, []);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{ durationUnit: 1, cover: "" }}
    >
      <Row gutter={[22, 6]} style={{ marginTop: "1em" }}>
        <Col span={8}>
          <Item
            label="Course Name"
            name="name"
            rules={[{ required: true }, { max: 100, min: 3 }]}
          >
            <Input type="text" placeholder="course name" />
          </Item>
        </Col>

        <Col span={5}>
          <Item label="Teacher" name="teacherId" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="select teacher"
              onFocus={onFocus}
              loading={loading}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {selectOptions?.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>

        <Col span={5}>
          <Item label="Type" name="type" rules={[{ required: true }]}>
            <Select mode="multiple">
              {courseTypes?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>

        <Col span={6}>
          <Item label="Course Code" name="uid" rules={[{ required: true }]}>
            <Input type="text" placeholder="Course Code" disabled />
          </Item>
        </Col>
      </Row>

      <Row gutter={[22, 6]}>
        <Col span={8}>
          <Item label="Start Date" name="startTime">
            <DatePicker
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
              onChange={(date) => {
                console.log(date);
              }}
              style={{ width: "100%" }}
            />
          </Item>

          <Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            ></InputNumber>
          </Item>

          <Item
            label="Student Limit"
            name="maxStudents"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={1}
              max={10}
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            ></InputNumber>
          </Item>

          <Input.Group compact>
            <Item
              label="Duration"
              name="duration"
              rules={[{ required: true }]}
              style={{ width: "calc(100% - 84px)" }}
            >
              <Input type="number" min={1} />
            </Item>
            <DurationUnitItem
              label="unit"
              name="durationUnit"
              style={{ width: "84px" }}
            >
              <Select>
                {["year", "month", "week", "day", "hour"].map((item, index) => (
                  <Option key={item} value={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </DurationUnitItem>
          </Input.Group>
        </Col>

        <Col span={8}>
          <DescriptionItem
            label="Description"
            name="detail"
            rules={[
              { required: true },
              {
                min: 100,
                max: 1000,
                message:
                  "Description length must between 100 - 1000 characters.",
              },
            ]}
          >
            <TextArea
              placeholder="Course description"
              style={{ height: "100%" }}
            ></TextArea>
          </DescriptionItem>
        </Col>

        <Col span={8}>
          <UploadItem label="Cover" name="cover">
            <ImgCrop rotate aspect={16 / 9}>
              <Upload
                action="https://photoslibrary.googleapis.com/v1/uploads"
                maxCount={1}
                listType="picture-card"
                fileList={fileList}
                beforeUpload={(file) => {
                  //less than 0.5MB
                  const isSmallEnough = file.size / 1024 / 1024 < 0.5;
                  if (!isSmallEnough) {
                    message.error("Image must smaller than 500KB!");
                  }
                  return isSmallEnough;
                }}
                onChange={({ file, fileList }) => {
                  if (file?.response) {
                    const { url } = file.response;
                    form.setFieldsValue({ cover: url });
                  } else {
                    form.setFieldsValue({ cover: "" });
                  }
                  setIsUploading(file.status === "uploading");
                  setFileList(fileList);
                }}
                onPreview={async (file) => {
                  if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                  }
                  setPreview({
                    previewImage: file.url || file.preview,
                    previewVisible: true,
                    previewTitle:
                      file.name ||
                      file.url.substring(file.url.lastIndexOf("/") + 1),
                  });
                }}
              >
                {fileList.length >= 1 ? null : (
                  <UploadInner>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined size="big" />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </UploadInner>
                )}
              </Upload>
            </ImgCrop>
            <Modal
              visible={preview.previewVisible}
              title={preview.previewTitle}
              footer={null}
              onCancel={() => {
                setPreview({ previewVisible: false });
              }}
            >
              <img
                alt={preview.previewTitle}
                style={{ width: "100%" }}
                src={preview.previewImage}
              />
            </Modal>
          </UploadItem>
          {isUploading && (
            <DeleteIcon
              onClick={() => {
                setIsUploading(false);
                setFileList([]);
              }}
            />
          )}
        </Col>
      </Row>

      <Item>
        <Button type="primary" htmlType="submit" style={{ width: "150px" }}>
          Create Course
        </Button>
      </Item>
    </Form>
  );
}
