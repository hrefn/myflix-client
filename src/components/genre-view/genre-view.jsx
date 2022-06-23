import React from "react";

import { Col, Container, Row, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

  render () {
    const { genre, onBackClick } = this.props

    return (
      <Container className="genre-view">
      <Row>
        <Col className="label">Genre: </Col>
        <Col className="value">{genre.Name}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Description: </Col>
        <Col className="value">{genre.Description}</Col>
      </Row>
      <Button type="link" onClick={ () => onBackClick() }>Back</Button>
    </Container>
    )
  }
}