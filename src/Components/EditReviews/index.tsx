import { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Spin, Button } from "antd";
import { TextAreaField, TextField, RatingField } from "../../Components";
import axios from "axios";
import ReviewRoutes from "../../Api/routes/reviews";
import Cookies from "js-cookie";

interface EditReviewsProps {
  modalData: { visible: boolean; record: any };
  setModalData: (arg0: any) => void;
}

type Status = "draft" | "published";

const EditReviews = ({ modalData, setModalData }: EditReviewsProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get("auth_token");

  const handleFinish = async (status: Status) => {
    form
      .validateFields()
      .then(async () => {
        const sendData = {
          ...form.getFieldsValue(),
          _id: modalData?.record?._id,
          status,
        };
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${ReviewRoutes.editReviews}`,
            sendData,
            { headers }
          );
          Modal.success({
            title: "Success!",
            content: "News Updated",
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
      eventName: modalData?.record?.event?.eventName,
    });
  }, [modalData, form]);

  return (
    <Form form={form} name="addReview">
      <Spin spinning={loading}>
        <Modal
          title="Edit News"
          open={modalData.visible}
          closable={false}
          footer={
            isPublished
              ? [
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => handleFinish("published")}
                  >
                    Update
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
                ]
          }
        >
          <Row>
            <Col span={24}>
              <TextField
                label="Event Name"
                name="eventName"
                disabled={true}
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

export default EditReviews;
