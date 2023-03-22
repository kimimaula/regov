import { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Spin } from "antd";
import { RatingField, TextAreaField, TextField } from "../../Components";
import axios from "axios";
import ReviewRoutes from "../../Api/routes/reviews";
import Cookies from "js-cookie";

type EventDataType = {
  event: {
    id: string | undefined;
    eventName: string;
  };
};

const AddReviewNoData = ({ event }: EventDataType) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get("auth_token");

  const handleFinish = async () => {
    console.log(event?.id);
    form
      .validateFields()
      .then(async () => {
        const sendData = {
          ...form.getFieldsValue(),
          event: event?.id,
        };
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${ReviewRoutes.addReviews}`,
            sendData,
            { headers }
          );
          Modal.success({
            title: "Success!",
            content: "Review Added",
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

  useEffect(() => {
    form.setFieldValue("eventName", event.eventName);
  }, [event, form]);

  return (
    <Form form={form} name="addReview">
      <Spin spinning={loading}>
        <Button onClick={() => setShowModal(true)} type="primary">
          Add Review
        </Button>
        <Modal
          title="Basic Modal"
          open={showModal}
          onOk={() => handleFinish()}
          onCancel={() => setShowModal(false)}
          cancelText="Cancel"
          okText="Add Review"
        >
          <Row>
            <Col span={24}>
              <TextField
                disabled={true}
                label="Event Name"
                name="eventName"
                rules={[{ required: true, message: "Please enter event name" }]}
              />
            </Col>
            <Col span={24}>
              <TextAreaField
                label="Review"
                name="review"
                maxLength={150}
                rules={[{ required: true, message: "Please enter review" }]}
              />
            </Col>
            <Col span={24}>
              <RatingField
                label="Rating"
                name="rating"
                rules={[{ required: true, message: "Please add rating" }]}
              />
            </Col>
          </Row>
        </Modal>
      </Spin>
    </Form>
  );
};

export default AddReviewNoData;
