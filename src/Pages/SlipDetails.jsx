import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import { useAuth } from '../store/AuthContext'; // Import AuthContext
import "../style/SlipDetails.css";

const SlipDetails = () => {
  const [slipNo, setSlipNo] = useState('');
  const [slipDetails, setSlipDetails] = useState(null);
  const [error, setError] = useState('');
  const { isLoggedIn } = useAuth(); // Use useAuth hook to check if user is logged in

  const handleInputChange = (e) => {
    setSlipNo(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getSlipDetails();
  };

  const getSlipDetails = async () => {
    try {
      const response = await fetch(`https://slip-project-backend.onrender.com/api/auth/slip/view-slip/${slipNo}`);
      const data = await response.json();
      if (response.ok) {
        setSlipDetails(data);
        setError('');
      } else {
        setSlipDetails(null);
        setError(data.message || 'Error fetching slip details');
      }
    } catch (err) {
      setSlipDetails(null);
      setError('Server error, please try again later');
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="text-center">
              <h2>Please log in to access this page.</h2>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="shadow p-4 mb-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h1 className="text-center mb-4 no-print">View Packing Slip Details</h1>
            <Form onSubmit={handleSubmit} className="no-print">
              <Form.Group controlId="slipNo">
                <Form.Label>Packing Slip No</Form.Label>
                <Form.Control
                  type="text"
                  value={slipNo}
                  onChange={handleInputChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <div className="text-center mt-4">
                <Button variant="primary" type="submit">
                  Get Details
                </Button>
              </div>
            </Form>
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
            {slipDetails && (
              <div className="printable-content mt-4">
                <h1 className="text-center mb-4">MAHENDRA GARMENTS</h1>
                <h5 className="text-center mb-4">A-113 ABHISHEK COMPLEX II, ASHRVA ROAD, AHMEDABAD</h5>
                <hr />
                <h6 className="font-weight-bold mb-4">PACKING SLIP/DISPATCH DETAIL</h6>
                <Row>
                  <Col xs={6}>
                    <p className="mb-2"><strong>Party:</strong> {slipDetails.slip_party_name}</p>
                    <p className="mb-2"><strong>Add:</strong> {slipDetails.slip_address}</p>
                    <p className="mb-2"><strong>GST:</strong> {slipDetails.slip_gstin}</p>
                    <p className="mb-2"><strong>Transport:</strong> {slipDetails.slip_transport}</p>
                    <p><strong>Delivery To:</strong> {slipDetails.slip_deliveryto}</p>
                  </Col>
                  <Col xs={6} className="text-right">
                    <p className="mb-2"><strong>Slip No:</strong> {slipDetails.slip_no}</p>
                    <p className="mb-2"><strong>Date:</strong> {new Date(slipDetails.slip_date).toLocaleDateString()}</p>
                    <p className="mb-2"><strong>L/R No.:</strong> {slipDetails.slip_lrno}</p>
                    <p><strong>Tot. Bale:</strong> {slipDetails.slip_totalbale}</p>
                  </Col>
                </Row>
                <Table bordered className="mt-4">
                  <thead>
                    <tr>
                      <th>SRNO</th>
                      <th>QUALITY</th>
                      <th>SIZE</th>
                      <th>TOTAL PCS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slipDetails.slip_items.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.slip_item_quality}</td>
                        <td>{item.slip_item_size}</td>
                        <td>{item.slip_item_total_piece}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p className="font-weight-bold mt-3">Total PCS Count: {slipDetails.slip_total_pieces}</p>
                <p className="mt-4"><strong>Remarks:</strong> {slipDetails.remark}</p>
                <div className="print-footer mt-4">
                  MAHENDRA GARMENTS
                </div>
                <div className="text-center no-print mt-4">
                  <Button variant="secondary" onClick={() => window.print()}>
                    Print
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SlipDetails;
