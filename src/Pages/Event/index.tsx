import axios from "axios";
import { useState, useEffect } from "react";
import EventRoutes from "../../Api/routes/events";
import { useParams } from "react-router-dom";
import { Modal, Typography, Row, Col, Image, Skeleton, Rate } from "antd";
import { AddReviewEvent } from "../../Components";

type UserDataType = {
  username: string;
};

type ReviewDataType = {
  review: string;
  rating: number;
  user: UserDataType;
};

interface displayDataProps {
  eventId: string;
  eventName: string;
  description: string;
  averageRating: number;
  reviews: ReviewDataType[];
}

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState<displayDataProps>({
    eventId: "",
    eventName: "",
    description: "",
    averageRating: 0,
    reviews: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}${EventRoutes.getEvent}?id=${id}`
        );
        setDisplayData(response?.data?.data ?? []);
        setLoading(false);
      } catch (error: any) {
        const errMessage = error?.response?.data?.message || "An Error Occured";
        setLoading(false);
        Modal.error({ title: "An Error Occured", content: errMessage });
      }
    };
    getEvents();
  }, [id]);

  return (
    <Skeleton loading={loading} avatar active>
      <Row
        style={{ padding: 30, backgroundColor: "white", margin: 25 }}
        gutter={[0, 10]}
        align="middle"
      >
        <Col>
          <Typography.Title level={1} style={{ margin: 5 }}>
            {displayData.eventName}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row>
            <Col>
              <Rate
                allowHalf
                disabled
                defaultValue={displayData.averageRating}
              />
            </Col>
            <Col>
              <Typography.Title level={5} style={{ margin: 5 }}>
                Average ({displayData?.averageRating?.toFixed(1) || 0})
              </Typography.Title>
            </Col>
          </Row>
        </Col>
        <Row gutter={[0, 40]}>
          <Col span={24}>
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Col>
          <Col span={24} style={{ whiteSpace: "pre-wrap" }}>
            {displayData.description}
          </Col>
          <Col>
            <AddReviewEvent
              event={{
                id: id,
                eventName: displayData.eventName,
              }}
            />
          </Col>
        </Row>
      </Row>
    </Skeleton>
  );
};

export default Events;
