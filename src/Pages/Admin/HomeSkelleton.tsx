import { Skeleton, Card, Row, Col } from "antd";

const HomeSkeleton = () => {
  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4].map((_, index) => (
          <Col key={index} xs={24} sm={6} md={6}>
            <Card className="rounded-xl shadow-lg">
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeSkeleton;