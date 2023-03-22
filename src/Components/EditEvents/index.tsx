import { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Spin, Button } from "antd";
import { TextAreaField, TextField } from "../../Components";
import axios from "axios";
import AdminRoutes from "../../Api/routes/admin";
import Cookies from "js-cookie";

interface EditEventsProps {
  modalData: { visible: boolean; record: any };
  setModalData: (arg0: any) => void;
}

const EditEvents = ({ modalData, setModalData }: EditEventsProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get("auth_token");

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
              setModalData({ visible: false });
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

  const isPublished = modalData?.record?.status === "published";

  useEffect(() => {
    form.setFieldsValue({
      ...modalData?.record,
      eventDescription: modalData?.record?.description,
    });
  }, [modalData, form]);

  return (
    <Form form={form} name="addReview">
      <Spin spinning={loading}>
        <Modal
          title="Basic Modal"
          open={modalData.visible}
          closable={false}
          footer={
            isPublished
              ? [
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => setModalData({ visible: false })}
                  >
                    Close
                  </Button>,
                ]
              : [
                  <Button
                    key="close"
                    danger
                    onClick={() => setModalData({ visible: false })}
                  >
                    Close
                  </Button>,
                  <Button
                    key="draft"
                    onClick={() => setModalData({ visible: false })}
                  >
                    Save as Draft
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => handleFinish()}
                  >
                    Add Review
                  </Button>,
                ]
          }
        >
          <Row>
            <Col span={24}>
              <TextField
                label="Event Name"
                name="eventName"
                disabled={isPublished}
                rules={[{ required: true, message: "Please enter event name" }]}
              />
            </Col>
            <Col span={24}>
              <TextAreaField
                label="Event Description"
                name="eventDescription"
                maxLength={500}
                disabled={isPublished}
                rules={[{ required: true, message: "Please enter review" }]}
              />
            </Col>
          </Row>
        </Modal>
      </Spin>
    </Form>
  );
};

export default EditEvents;
