import axios from "axios";
import { useState, useEffect } from "react";
import NewsRoutes from "../../Api/routes/news";
import { Modal, Card, Typography, Row, Col, Image, Skeleton } from "antd";
import moment from "moment";

type displayDataProps = {
  _id: string;
  title: string;
  description: string;
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const getNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}${NewsRoutes.getNews}`
      );
      setDisplayData(response?.data?.data ?? []);
      setLoading(false);
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || "An Error Occured";
      setLoading(false);
      Modal.error({ title: "An Error Occured", content: errMessage });
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const today = moment(new Date()).format("D-MMM-yyyy");

  return (
    <div style={{ padding: "0px 20px", margin: 20 }}>
      <Typography.Title level={1} style={{ margin: "15px 0px" }}>
        Latest News
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: "15px 0px" }}>
        {today}
      </Typography.Title>
      <Skeleton loading={loading} avatar active>
        <Row gutter={[0, 20]}>
          {displayData?.map((d: displayDataProps) => {
            return (
              <Col span={24} key={d._id}>
                <Card title={d.title}>
                  <Row gutter={10}>
                    <Col span={5}>
                      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    </Col>
                    <Col span={19}>
                      <div
                        style={{
                          width: "100%",
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {d.description}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Skeleton>
    </div>
  );
};

export default HomePage;
