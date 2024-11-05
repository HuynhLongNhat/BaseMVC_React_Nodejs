import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import microservices from "../../../src/asset/microservices.png";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Microservices: Kiến trúc hiện đại cho ứng dụng linh hoạt</h1>
              <p className="lead">
                Khám phá sức mạnh của microservices trong việc xây dựng các ứng
                dụng phức tạp, dễ dàng mở rộng và bảo trì.
              </p>
              <Button variant="primary" href="#learn-more">
                Tìm hiểu thêm
              </Button>
            </Col>
            <Col md={6}>
              <img
                className="img-fluid"
                src={microservices} // Thay bằng hình ảnh minh họa microservices
                alt="Microservices"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Giới thiệu Microservices */}
      <Container id="learn-more" className="my-5">
        <Row>
          <Col md={12}>
            <h2>Microservices là gì?</h2>
            <p>
              Microservices là một kiến trúc phần mềm, trong đó ứng dụng được
              chia thành các dịch vụ nhỏ, độc lập và kết nối với nhau. Mỗi dịch
              vụ tập trung vào một chức năng nghiệp vụ cụ thể và có thể được
              phát triển, triển khai và mở rộng độc lập với các dịch vụ khác.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Lợi ích của Microservices */}
      <Container className="my-5">
        <h2>Lợi ích của Microservices</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Tính linh hoạt</Card.Title>
                <Card.Text>
                  Dễ dàng thay đổi và cập nhật từng dịch vụ mà không ảnh hưởng
                  đến toàn bộ hệ thống.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Khả năng mở rộng</Card.Title>
                <Card.Text>
                  Mở rộng quy mô từng dịch vụ độc lập để đáp ứng nhu cầu tăng
                  trưởng.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Khả năng phục hồi</Card.Title>
                <Card.Text>
                  Lỗi trong một dịch vụ không ảnh hưởng đến hoạt động của các
                  dịch vụ khác.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Khi nào nên sử dụng Microservices */}
      <Container className="my-5">
        <h2>Khi nào nên sử dụng Microservices?</h2>
        <p>
          Microservices phù hợp với các ứng dụng phức tạp, yêu cầu khả năng mở
          rộng cao và có nhiều nhóm phát triển độc lập.
        </p>
        <ul>
          <li>Ứng dụng có nhiều chức năng nghiệp vụ khác nhau.</li>
          <li>Yêu cầu khả năng mở rộng và đáp ứng lượng truy cập lớn.</li>
          <li>Có nhiều nhóm phát triển độc lập.</li>
        </ul>
      </Container>

      {/* Liên kết đến các tài liệu tham khảo */}
      <Container className="my-5">
        <h2>Tìm hiểu thêm</h2>
        <p>Dưới đây là một số tài liệu tham khảo hữu ích về Microservices:</p>
        <ul>
          <li>
            <a href="https://microservices.io/">microservices.io</a>
          </li>
          <li>
            <a href="https://martinfowler.com/articles/microservices.html">
              Microservices by Martin Fowler
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Home;
