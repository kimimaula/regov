import axios from "axios";
import { useState, useEffect } from "react";
import NewsRoutes from "../../Api/routes/news";
import { Modal, Card, Typography, Row, Col, Image, Skeleton } from "antd";

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

  return (
    <div>
      <Typography.Title level={1} style={{ margin: 5 }}>
        News
      </Typography.Title>
      <Skeleton loading={loading} avatar active>
        <div>
          {displayData?.map((d: displayDataProps) => {
            return (
              <Card style={{ margin: 10 }} key={d._id} title={d.title}>
                <Row gutter={10}>
                  <Col span={5}>
                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  </Col>
                  <Col span={19}>
                    <div style={{ maxWidth: "100%", wordWrap: "break-word" }}>
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

export default HomePage;
