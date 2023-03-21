import { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Spin } from "antd";
import { RatingField, SelectField, TextAreaField } from "../../Components";
import axios from "axios";
import EventRoutes from "../../Api/routes/events";
import ReviewRoutes from "../../Api/routes/reviews";

const AddReviewModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [form] = Form.useForm();

  type eventDataType = {
    _id: string;
    eventName: string;
  };

  useEffect(() => {
    const getEvents = async () => {
      if (showModal) {
        try {
          setLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}${EventRoutes.getEvents}`
          );
          const data = response?.data?.data ?? [];
          const options = data?.map((d: eventDataType) => {
            return {
              id: d._id,
              value: d.eventName,
              options: d.eventName,
            };
          });
          setEvents(options);
          setLoading(false);
        } catch (error: any) {
          const errMessage =
            error?.response?.data?.message || "An Error Occured";
          setLoading(false);
          Modal.error({ title: "An Error Occured", content: errMessage });
        }
      }
    };
    getEvents();
  }, [showModal]);

  const handleFinish = async () => {
    form
      .validateFields()
      .then(async () => {
        const findEvent: any = events.find(
          (e: any) => e.value === form.getFieldValue("eventName")
        );
        events.find((e) => form.getFieldValue("eventName") === "Event1");
        const sendData = {
          ...form.getFieldsValue(),
          event: findEvent?.id,
        };
        console.log("---form", {
          ...form.getFieldsValue(),
          event: findEvent?.id,
        });
        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${ReviewRoutes.addReviews}`,
            sendData
          );
        } catch (error: any) {
          const errMessage =
            error?.response?.data?.message || "An Error Occured";
          setLoading(false);
          Modal.error({ title: "An Error Occured", content: errMessage });
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
        <Button onClick={() => handleFinish()} type="primary">
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
              <SelectField
                label="Event Name"
                name="eventName"
                options={events}
                rules={[{ required: true, message: "Please enter event name" }]}
              />
            </Col>
            <Col span={24}>
              <TextAreaField
                label="Review"
                name="review"
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

export default AddReviewModal;
