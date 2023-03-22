import axios from "axios";
import { useState, useEffect } from "react";
import EventRoutes from "../../Api/routes/events";
import { Modal, Card, Typography, Row, Col, Image, Skeleton, Rate } from "antd";

type displayDataProps = {
  eventId: string;
  eventName: string;
  description: string;
  averageRating: number;
};

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}${EventRoutes.getEvents}`
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
  }, []);

  return (
    <div>
      <Typography.Title level={1} style={{ margin: 5 }}>
        Events
      </Typography.Title>
      <Skeleton loading={loading} avatar active>
        <div>
          {displayData?.map((d: displayDataProps) => {
            return (
              <Card
                extra={
                  <Rate disabled allowHalf defaultValue={d.averageRating} />
                }
                style={{ margin: 10 }}
                key={d.eventId}
                title={d.eventName}
              >
                <Row gutter={10}>
                  <Col span={5}>
                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  </Col>
                  <Col span={19}>
                    <div
                      style={{
                        maxWidth: "100%",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {d.description}
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </div>
      </Skeleton>
    </div>
  );
};

export default Events;
