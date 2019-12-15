import React, { Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


class MovieDetail extends Component {
  state = { movie: null }

  componentDidMount() {
    axios.get(`/api/movie/${this.props.match.params.id}/`)
      .then((response) => {
        this.setState({searching: false, movie: response.data});
        response.data.locations.map((location, index) => {
          axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location.address}`)
          .then((result) => {
            if (result.data.length) {
              var movie = this.state.movie;
              movie.locations[index].lat = result.data[0].lat;
              movie.locations[index].lon = result.data[0].lon;
              this.setState({movie});
            }
          })
          .catch((error) => console.log(error));
          return 0;
        });
        return 0;
      })
      .catch((error) => {
        this.setState({searching: false})
        this.props.history.push('/404/')
      });
  }

  render() {
    const { movie } = this.state;
    if (!movie)
      return (
        <Spinner style={{position: 'absolute', left: 0, right: 0, margin: 'auto', top: 0, bottom: 0}} animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    return (
      <div style={{ textAlign: 'center', padding: 20, maxWidth: 640, margin: 'auto' }}>
        <h2>{movie.title}</h2>
        <span className="mb-2 text-muted"> {movie.release_year} </span>
        <hr/><br/>
        <div style={{ textAlign: 'justify' }}>
          <Container>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <b>Cast</b> <br/>
                {movie.actors.length >= 1 && <span>{movie.actors[0].name}</span>}
                {movie.actors.length >= 2 && <span>{movie.actors[0].name && ","} {movie.actors[1].name}</span>}
                {movie.actors.length >= 3 && <span>{movie.actors[1].name && ","} {movie.actors[2].name}</span>}
              </Col>
              <Col>
                <b>Distributor</b> <br/>
                {movie.distributor && movie.distributor.name}
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Director</b> <br/>
                {movie.director && movie.director.name}
              </Col>
              <Col>
                <b>Writer</b> <br/>
                {movie.writer && movie.writer.name}
              </Col>
            </Row>
          </Container>
          <br/>
          <hr/><br/>
          <b> Locations </b> ({movie.locations.length}) <br/><br/>
          <Accordion>
            {
              movie.locations.map((location, index) => 
                <Card key={index}>
                  <Accordion.Toggle style={{ cursor: 'pointer' }} as={Card.Header} eventKey={index}>
                    {location.address}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                )
            }
          </Accordion>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
