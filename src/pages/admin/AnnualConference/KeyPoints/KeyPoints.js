import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const KeyPoints = ({ keyEventsList }) => {

  return (
    <div className="widget-header">
      <div className="row">
        <h4 className='annualTitles'>Key Events</h4><br />
        {/* {Object.keys(keyEventsList).length > 0
          && keyEventsList.data.length > 0
          && keyEventsList.data.map((item, index) => {
            return (
              <div key={`k${index}`} className="col-xl-6 col-md-12 col-sm-12 col-12 mb-3 ">
                  <div className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-2" style={{ color: "#3b3f5c" }}>{item?.title}</h5>
                    </div>
                    <p className="mb-1">
                      <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                    </p>
                  </div>
              </div>
            )
          })
        } */}
        <Row xs={1} md={2} className="mt-3">
          {Object.keys(keyEventsList).length > 0
            && keyEventsList.data.length > 0
            && keyEventsList.data.map((item, index) => (
              <Col key={index} className='mb-4'>
                <Card>
                  <Card.Body>
                    <Card.Title>{item?.title}</Card.Title>
                    <Card.Text style={{height:"85px"}}>
                      <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  )
}

export default KeyPoints