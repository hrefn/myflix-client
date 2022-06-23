import React from "react";
import './director-view.scss';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export class DirectorView extends React.Component {
  render () {
    const { director, onBackClick } = this.props

    return (
      <Container className="director-view">
        <Row>
          <Col className="label">Director: </Col>
          <Col className="value">{director.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Bio: </Col>
          <Col className="value">{director.Bio}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Birth: </Col>
          <Col className="value">{director.Birth}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Death: </Col>
          <Col className="value">{director.Death}</Col>
        </Row>
        <Button type="link" onClick={ () => onBackClick() }>Back</Button>
      </Container>
    )
  }
}