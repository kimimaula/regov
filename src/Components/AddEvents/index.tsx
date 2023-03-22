import { useState } from "react";
import { Button, Modal, Form, Row, Col, Spin } from "antd";
import {
  RatingField,
  SelectField,
  TextAreaField,
  TextField,
} from "../../Components";
import axios from "axios";
import AdminRoutes from "../../Api/routes/admin";
import Cookies from "js-cookie";

const AddEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get("auth_token");

  type eventDataType = {
    _id: string;
    eventName: string;
  };

  const handleFinish = async () => {
    form
      .validateFields()
      .then(async () => {
        const sendData = {
          ...form.getFieldsValue(),
        };
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${AdminRoutes}`,
            sendData,
            { headers }
          );
          Modal.success({
            title: "Success!",
            content: "Notes Updated",
            onOk: () => {
              setShowModal(false);
              window.location.reload();
            },
          });
        } catch (error: any) {
          const errMessage =
            error?.response?.data?.message || "An Error Occured";
          setLoading(false);
          Modal.error({
            title: "An Error Occured",
            content: errMessage,
          });
        }
      })
      .catch((errors) =>
        Modal.error({
          title: "An Error Occured",
          content: errors?.errorFields[0]?.errors[0],
        })
      );
  };

  return (
    <Form form={form} name="addReview">
      <Spin spinning={loading}>
        <Button onClick={() => setShowModal(true)} type="primary">
          Add Note
        </Button>
        <Modal
          title="Basic Modal"
          open={showModal}
          onOk={() => handleFinish()}
          onCancel={() => setShowModal(false)}
          cancelText="Save as Draft"
          okText="Add Review"
        >
          <Row>
            <Col span={24}>
              <TextField
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter event name" }]}
              />
            </Col>
            <Col span={24}>
              <TextAreaField
                label="Content"
                name="content"
                maxLength={150}
                rules={[{ required: true, message: "Please enter review" }]}
              />
            </Col>
          </Row>
        </Modal>
      </Spin>
    </Form>
  );
};

export default AddEvents;
