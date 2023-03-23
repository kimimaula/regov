import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Typography, Row, Col, Spin, Rate, Tag } from "antd";

import { AddReviews, EditReviews } from "../../Components";
import ReviewRoutes from "../../Api/routes/reviews";

import { StyledTable } from "./styled";

import Cookies from "js-cookie";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [editReviewsData, setEditReviewsData] = useState({
    visible: false,
    record: {},
  });

  const token = Cookies.get("auth_token");

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      width: "10%",
      render: (data: { _id: string; eventName: string }) => {
        return <div>{data?.eventName}</div>;
      },
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      width: "50%",
      render: (data: string) => {
        return <div style={{ whiteSpace: "pre-wrap" }}>{data}</div>;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "20%",
      render: (data: string) => {
        return <Rate disabled defaultValue={parseInt(data)} />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (data: string) => {
        return (
          <Tag color={data === "draft" ? "gold" : "blue"}>
            {data.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    const getEvents = async () => {
      if (token) {
        try {
          setLoading(true);
          const headers = {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}${ReviewRoutes.getUserReviews}`,
            { headers }
          );
          setReviewsData(response?.data?.data ?? []);
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
  }, [token]);

  return (
    <div style={{ height: "100%", padding: 25 }}>
      <EditReviews
        modalData={editReviewsData}
        setModalData={setEditReviewsData}
      />
      <Spin spinning={loading}>
        <Typography.Title level={1} style={{ margin: "15px 0" }}>
          User Dashboard
        </Typography.Title>
        <div
          style={{
            height: "100%",
            borderRadius: 15,
            backgroundColor: "white",
            padding: "30px 10px 10px 10px",
          }}
        >
          <Row gutter={[10, 20]} justify="space-between">
            <Col>
              <Typography.Title level={3} style={{ margin: 5 }}>
                Reviews
              </Typography.Title>
            </Col>
            <Col span={3}>
              <AddReviews />
            </Col>
            <Col span={24}>
              <StyledTable
                size="middle"
                pagination={{ pageSize: 10 }}
                dataSource={reviewsData}
                columns={columns as any}
                rowClassName={() => "clickable-row"}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setEditReviewsData({ visible: true, record });
                    },
                  };
                }}
              />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default HomePage;
