import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; // Import AuthContext

const SlipHistory = () => {
  const [slipData, setSlipData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Use useAuth hook to check if user is logged in

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/slip/view-slip-data')
      .then((response) => response.json())
      .then((data) => {
        setSlipData(data);
        setSortedData(data);
      })
      .catch((error) => console.error('Error fetching slip data:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sorted = [...sortedData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.slip_date) - new Date(b.slip_date);
      }
      return new Date(b.slip_date) - new Date(a.slip_date);
    });
    setSortedData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    const filteredData = slipData.filter((slip) =>
      slip.slip_no.includes(searchTerm)
    );
    setSortedData(filteredData);
  }, [searchTerm, slipData]);

  const handleGetDetails = (slipNo) => {
    const newWindow = window.open('', '_blank');
    fetch(`http://localhost:3000/api/auth/slip/view-slip/${slipNo}`)
      .then((response) => response.json())
      .then((slipDetails) => {
        if (slipDetails) {
          const html = `
            <html>
              <head>
                <title>Slip Details</title>
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                />
                <style>
                  /* Custom styles for printing */
                  @media print {
                    body * {
                      visibility: hidden;
                    }
                    
                    .printable-content, .printable-content * {
                      visibility: visible;
                    }
                    
                    .printable-content {
                      padding: 1rem;
                      width: 100%;
                      position: relative; /* Ensure relative positioning */
                    }
  
                    .printable-content .row {
                      display: flex;
                      justify-content: space-between;
                    }
  
                    .printable-content .col {
                      flex: 0 0 48%;
                      max-width: 48%;
                    }
  
                    .printable-content h1, .printable-content h5, .printable-content h6 {
                      text-align: center;
                      margin: 0;
                      padding: 0;
                    }
  
                    .printable-content p, .printable-content .table {
                      margin-bottom: 0.5rem;
                    }
  
                    .no-print {
                      display: none;
                    }
  
                    .print-footer {
                      position: absolute;
                      bottom: 0;
                      right: 1rem; /* Adjust right position as needed */
                      text-align: right;
                    }
  
                    @page {
                      margin: 1in; /* Adjust the margin size as needed */
                    }
                  }
                </style>
              </head>
              <body>
                <div class="container py-4">
                  <div class="shadow p-4 mb-4 rounded" style="background-color: #f8f9fa;">
                    <div class="printable-content mt-4">
                      <h1 class="text-center mb-4">MAHENDRA GARMENTS</h1>
                      <h5 class="text-center mb-4">A-113 ABHISHEK COMPLEX II, ASHRVA ROAD, AHMEDABAD</h5>
                      <hr />
                      <h6 class="font-weight-bold mb-4">PACKING SLIP/DISPATCH DETAIL</h6>
                      <div class="row">
                        <div class="col">
                          <p class="mb-2"><strong>Party:</strong> ${slipDetails.slip_party_name}</p>
                          <p class="mb-2"><strong>Add:</strong> ${slipDetails.slip_address}</p>
                          <p class="mb-2"><strong>GST:</strong> ${slipDetails.slip_gstin}</p>
                          <p class="mb-2"><strong>Transport:</strong> ${slipDetails.slip_transport}</p>
                          <p><strong>Delivery To:</strong> ${slipDetails.slip_deliveryto}</p>
                        </div>
                        <div class="col">
                          <p class="mb-2"><strong>Slip No:</strong> ${slipDetails.slip_no}</p>
                          <p class="mb-2"><strong>Date:</strong> ${new Date(slipDetails.slip_date).toLocaleDateString()}</p>
                          <p class="mb-2"><strong>L/R No.:</strong> ${slipDetails.slip_lrno}</p>
                          <p><strong>Tot. Bale:</strong> ${slipDetails.slip_totalbale}</p>
                        </div>
                      </div>
                      <table class="table table-bordered mt-4">
                        <thead>
                          <tr>
                            <th>SRNO</th>
                            <th>QUALITY</th>
                            <th>SIZE</th>
                            <th>TOTAL PCS</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${slipDetails.slip_items.map((item, index) => `
                            <tr>
                              <td>${index + 1}</td>
                              <td>${item.slip_item_quality}</td>
                              <td>${item.slip_item_size}</td>
                              <td>${item.slip_item_total_piece}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                      <p class="font-weight-bold mt-3">Total PCS Count: ${slipDetails.slip_total_pieces}</p>
                      <p class="mt-4"><strong>Remarks:</strong> ${slipDetails.remark}</p>
                      <div class="print-footer mt-4">
                        MAHENDRA GARMENTS
                      </div>
                      <div class="text-center no-print mt-4">
                        <button class="btn btn-secondary" onclick="window.print()">Print</button>
                      </div>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `;
          newWindow.document.write(html);
          newWindow.document.close();
        } else {
          newWindow.close();
          alert('Failed to fetch slip details');
        }
      })
      .catch((error) => {
        console.error('Error fetching slip details:', error);
        newWindow.close();
        alert('Failed to fetch slip details');
      });
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
    )
  }
    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12}>
            <h1 className="text-center mb-4">SLIP HISTORY</h1>
            <Form.Control
              type="text"
              placeholder="Search by Slip No"
              value={searchTerm}
              onChange={handleSearch}
              className="mb-4"
            />
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Slip No</th>
                  <th>
                    Date{' '}
                    <Button variant="link" onClick={handleSort}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                  </th>
                  <th>Party Name</th>
                  <th>Transport</th>
                  <th>LR No</th>
                  <th>Qualities</th>
                  <th>Total Piece Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((slip) => (
                  <tr key={slip._id}>
                    <td>{slip.slip_no}</td>
                    <td>{new Date(slip.slip_date).toLocaleDateString()}</td>
                    <td>{slip.slip_party_name}</td>
                    <td>{slip.slip_transport}</td>
                    <td>{slip.slip_lrno}</td>
                    <td>
                      {slip.slip_items
                        .map((item) => item.slip_item_quality)
                        .join(', ')}
                    </td>
                    <td>{slip.slip_total_pieces}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleGetDetails(slip.slip_no)}
                      >
                        Get Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

export default SlipHistory;
