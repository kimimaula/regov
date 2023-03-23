import { useState } from "react";
import { Button, Modal, Form, Row, Col, Spin } from "antd";
import { TextAreaField, TextField } from "../../Components";
import axios from "axios";
import AdminRoutes from "../../Api/routes/admin";
import Cookies from "js-cookie";

type Status = "draft" | "published";

const AddEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get("auth_token");

  const handleFinish = async (status: Status) => {
    form
      .validateFields()
      .then(async () => {
        const sendData = {
          ...form.getFieldsValue(),
          status,
        };
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${AdminRoutes.addEvents}`,
            sendData,
            { headers }
          );
          Modal.success({
            title: "Success!",
            content: "Event Updated",
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
          Add Event
        </Button>
        <Modal
          title="Add New Event"
          open={showModal}
          closable={false}
          footer={[
            <Button key="close" danger onClick={() => setShowModal(false)}>
              Close
            </Button>,
            <Button key="draft" onClick={() => handleFinish("draft")}>
              Save as Draft
            </Button>,
            <Button
              key="publish"
              type="primary"
              onClick={() => handleFinish("published")}
            >
              Publish
            </Button>,
          ]}
        >
          <Row>
            <Col span={24}>
              <TextField
                label="Event Name"
                name="eventName"
                rules={[{ required: true, message: "Please enter event name" }]}
              />
            </Col>
            <Col span={24}>
              <TextAreaField
                label="Event Description"
                name="description"
                maxLength={150}
                rules={[
                  { required: true, message: "Please enter event description" },
                ]}
              />
            </Col>
          </Row>
        </Modal>
      </Spin>
    </Form>
  );
};

export default AddEvents;
