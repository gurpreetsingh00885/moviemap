import React, { Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'
import { Map, Marker, TileLayer } from 'react-leaflet';

class MovieDetail extends Component {
  state = { movie: null }

  componentDidMount = () => {
    axios.get(`/api/movie/${this.props.match.params.id}/`)
      .then((response) => {
        response.data.locations.map((location, index) => {
          axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location.address}`)
          .then((result) => {
            var movie = this.state.movie;
            if (result.data.length) {
              movie.locations[index].lat = result.data[0].lat;
              movie.locations[index].lon = result.data[0].lon;
            }
            this.setState({movie});
          })
          .catch((error) => console.log(error));
          return 0;
        });
        this.setState({searching: false, movie: response.data});
        return 0;
      })
      .catch((error) => {
        this.setState({searching: false})
        this.props.history.push('/404/')
      });
  }

  render() {
    const { movie } = this.state;
    const updateMapSize = (index) => {
      setTimeout(() => 
        this.refs[`map${index}`].leafletElement.invalidateSize()
        , 200)
    }
    const openGoogleMaps = (lat, lng) => {
      window.open(`http://maps.google.com/maps?q=${lat},${lng}`)
    }

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
        <div style={{ textAlign: 'initial' }}>
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

                  <Accordion.Toggle style={{ cursor: 'pointer' }} as={Card.Header} eventKey={index} onClick={() => updateMapSize(index)}>
                    {location.address}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body style={{ padding: 0, height: '300px'}}>
                      <Map style={{ zIndex: '0', height: '100%', width: '100%', margin: 0 }} center={[location.lat || 10, location.lon || 10]} zoom={13} ref={`map${index}`}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker position={[location.lat || 10, location.lon || 10]}>
                        </Marker>
                      </Map>
                      <Button style={{ zIndex: '1', position: 'absolute', bottom: 5, right: 5}} onClick={() => openGoogleMaps(location.lat || 10, location.lon || 10)}>Navigate</Button>
                      {
                        location.lat === undefined &&
                          <div style={{ width: '100%', height: '100%', background: 'black', zIndex: '2', position: 'absolute', opacity: 0.6, top: 49, left: 0, textAlign: 'center', lineHeight: '300px'}} >
                            <span style={{ color: 'gray' }}>
                            Unable to load address
                            </span>
                          </div>
                      }
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
