import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Typography, Row, Col, Table, Spin } from "antd";
import { EditEvents, EditNews, AddEvents, AddNews } from "../../Components";

import { StyledTable } from "./styled";

import AdminRoutes from "../../Api/routes/admin";

import Cookies from "js-cookie";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsEditData, setEventsEditData] = useState({
    visible: false,
    record: {},
  });
  const [newsEditData, setNewsEditData] = useState({
    visible: false,
    record: {},
  });

  const token = Cookies.get("auth_token");

  const reviewColumns = [
    {
      title: "User",
      dataIndex: "user",
      key: "key1",
      width: "20%",
    },
    {
      title: "Event",
      dataIndex: "eventName",
      key: "key2",
      width: "20%",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "key3",
      width: "40%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "key4",
      width: "20%",
      render: (data: any) => {
        return <div>Rating: {data}</div>;
      },
    },
  ];

  const newsColumn = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => {
        return (
          <div
            style={{
              width: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data: string) => {
        return <div>{data.toUpperCase()}</div>;
      },
    },
  ];

  const eventsColumn = [
    {
      title: "Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => {
        return (
          <div
            style={{
              width: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data: string) => {
        return <div>{data?.toUpperCase()}</div>;
      },
    },
  ];

  useEffect(() => {
    const getAllData = async () => {
      if (token) {
        try {
          setLoading(true);
          const headers = {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}${AdminRoutes.getAllData}`,
            { headers }
          );
          const { reviews, newsItems, events } = response?.data?.data;
          setReviewsData(reviews);
          setNewsData(newsItems);
          setEvents(events);
          setLoading(false);
        } catch (error: any) {
          const errMessage =
            error?.response?.data?.message || "An Error Occured";
          setLoading(false);
          Modal.error({ title: "An Error Occured", content: errMessage });
        }
      }
    };
    getAllData();
  }, [token]);

  return (
    <div style={{ height: "100%" }}>
      <Spin spinning={loading}>
        <EditEvents
          modalData={eventsEditData}
          setModalData={setEventsEditData}
        />
        <EditNews modalData={newsEditData} setModalData={setNewsEditData} />
        <div
          style={{
            height: "100%",
            borderRadius: 15,
            backgroundColor: "white",
            padding: "30px 10px 10px 10px",
            margin: "10px 0",
          }}
        >
          <Row gutter={[10, 20]} justify="space-between">
            <Col>
              <Typography.Title level={3} style={{ margin: 5 }}>
                Event
              </Typography.Title>
            </Col>
            <Col>
              <AddEvents />
            </Col>
            <Col span={24}>
              <StyledTable
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setEventsEditData({ visible: true, record });
                    },
                  };
                }}
                pagination={{ pageSize: 5 }}
                dataSource={events}
                columns={eventsColumn}
                rowClassName={() => "clickable-row"}
              />
            </Col>
          </Row>
        </div>
        <div
          style={{
            height: "100%",
            borderRadius: 15,
            backgroundColor: "white",
            padding: "30px 10px 10px 10px",
            margin: "10px 0",
          }}
        >
          <Row gutter={[10, 20]} justify="space-between">
            <Col>
              <Typography.Title level={3} style={{ margin: 5 }}>
                News
              </Typography.Title>
            </Col>
            <Col>
              <AddNews />
            </Col>
            <Col span={24}>
              <StyledTable
                pagination={{ pageSize: 5 }}
                dataSource={newsData}
                columns={newsColumn}
                rowClassName={() => "clickable-row"}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setNewsEditData({ visible: true, record });
                    },
                  };
                }}
              />
            </Col>
          </Row>
        </div>
        <div
          style={{
            height: "100%",
            borderRadius: 15,
            backgroundColor: "white",
            padding: "30px 10px 10px 10px",
            margin: "10px 0",
          }}
        >
          <Row gutter={[10, 20]} justify="space-between">
            <Col>
              <Typography.Title level={3} style={{ margin: 5 }}>
                Reviews
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Table
                pagination={{ pageSize: 5 }}
                dataSource={reviewsData}
                columns={reviewColumns}
              />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default HomePage;
