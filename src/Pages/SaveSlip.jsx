import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; // Import AuthContext

const SaveSlip = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Use useAuth hook to check if user is logged in

  // State for table data and form values
  const [tableData, setTableData] = useState([{ srNo: 1, quality: '', size: '', totalPcs: '' }]);
  const [formValues, setFormValues] = useState({
    slipNo: '',
    partyName: '',
    address: '',
    date: '',
    gstNo: '',
    transport: '',
    lrNo: '',
    deliverTo: '',
    totalBale: '',
    remark: ''
  });

  useEffect(() => {
    const fetchSlipCount = async () => {
      try {
        const response = await fetch('https://slip-project-backend.onrender.com/api/auth/slip/count-slip');
        const data = await response.json();
        if (response.ok) {
          setFormValues(prevState => ({ ...prevState, slipNo: (data.count + 1001).toString() }));
        } else {
          console.error('Failed to fetch slip count:', data.message);
        }
      } catch (error) {
        console.error('Error fetching slip count:', error);
      }
    };

    fetchSlipCount();
  }, []);

  // Handle input change in table rows
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTable = [...tableData];
    updatedTable[index][name] = name === 'quality' || name === 'size' ? value.toUpperCase() : value;
    setTableData(updatedTable);
  };

  // Add new item row to the table
  const addItemToTable = () => {
    const newItem = { srNo: tableData.length + 1, quality: '', size: '', totalPcs: '' };
    setTableData([...tableData, newItem]);
  };

  // Remove item row from the table
  const removeItemFromTable = (index) => {
    const updatedTableData = tableData.filter((item, i) => i !== index);
    setTableData(updatedTableData);
  };

  // Calculate total pieces from table data
  const calculateTotalPieces = () => {
    return tableData.reduce((total, item) => total + parseInt(item.totalPcs || 0, 10), 0);
  };

  // Handle change in form fields
  const handlePartyDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value.toUpperCase() });
  };

  // Handle form submission to save slip
  const handleSubmit = async () => {
    const slipData = {
      slip_party_name: formValues.partyName,
      slip_address: formValues.address,
      slip_date: formValues.date,
      slip_gstin: formValues.gstNo,
      slip_transport: formValues.transport,
      slip_lrno: formValues.lrNo,
      slip_deliveryto: formValues.deliverTo,
      slip_totalbale: formValues.totalBale,
      slip_items: tableData.map(item => ({
        slip_item_quality: item.quality,
        slip_item_size: item.size,
        slip_item_total_piece: parseInt(item.totalPcs || 0, 10)
      })),
      slip_total_pieces: calculateTotalPieces(),
      remark: formValues.remark
    };

    try {
      const response = await fetch(`https://slip-project-backend.onrender.com/api/auth/slip/save-slip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(slipData)
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to save slip:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="shadow p-4 mb-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h1 className="text-center mb-4">MAHENDRA GARMENTS</h1>
            <h4 className="text-center mb-4">Enter details for Adding Slip Details</h4>
            <Form>
              <Form.Group controlId="slipNo">
                <Form.Label>Slip No</Form.Label>
                <Form.Control
                  type="text"
                  name="slipNo"
                  value={formValues.slipNo}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="partyName">
                <Form.Label>Party Name</Form.Label>
                <Form.Control
                  type="text"
                  name="partyName"
                  value={formValues.partyName}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="gstNo">
                <Form.Label>GST No</Form.Label>
                <Form.Control
                  type="text"
                  name="gstNo"
                  value={formValues.gstNo}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="transport">
                <Form.Label>Transport</Form.Label>
                <Form.Control
                  type="text"
                  name="transport"
                  value={formValues.transport}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="lrNo">
                <Form.Label>L/R No</Form.Label>
                <Form.Control
                  type="text"
                  name="lrNo"
                  value={formValues.lrNo}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="deliverTo">
                <Form.Label>Deliver To</Form.Label>
                <Form.Control
                  type="text"
                  name="deliverTo"
                  value={formValues.deliverTo}
                  onChange={handlePartyDetailsChange}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
              <Form.Group controlId="totalBale">
                <Form.Label>Total Bale</Form.Label>
                <Form.Control
                  type="text"
                  name="totalBale"
                  value={formValues.totalBale}
                  onChange={(e) => setFormValues({ ...formValues, totalBale: e.target.value })}
                  style={{ border: '1px solid #ced4da' }}
                />
              </Form.Group>
            </Form>
          </div>

          <Table bordered className="mt-4">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Quality</th>
                <th>Size</th>
                <th>Total Pcs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.srNo}</td>
                  <td>
                    <Form.Control
                      type="text"
                      name="quality"
                      value={item.quality}
                      onChange={(e) => handleInputChange(e, index)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="size"
                      value={item.size}
                      onChange={(e) => handleInputChange(e, index)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="totalPcs"
                      value={item.totalPcs}
                      onChange={(e) => handleInputChange(e, index)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeItemFromTable(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="text-right">
                  <Button variant="secondary" size="sm" onClick={addItemToTable}>
                    Add Item
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="text-right">Total Pieces:</td>
                <td>{calculateTotalPieces()}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>

          {/* Remarks */}
          <Form.Group controlId="remarks" className="mt-4">
            <Form.Label>Remarks</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="remark"
              value={formValues.remark}
              onChange={handlePartyDetailsChange}
              style={{ border: '1px solid #ced4da' }} 
            />
          </Form.Group>

          {/* Generate button */}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleSubmit}>
              SAVE AND GENERATE SLIP
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SaveSlip;
