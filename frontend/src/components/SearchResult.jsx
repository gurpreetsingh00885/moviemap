import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MovieCard = (props) => {
  const openMovieDetail = (event) => {
    event.preventDefault();
    props.history.push(`/movie/${props.data.id}/`);
  };
  return (
    <Card style={{ marginBottom: 20 }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted" style={{ float: 'right' }}>{props.data.release_year}</Card.Subtitle>
        <Card.Title>{props.data.title}</Card.Title>
          <Container>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <b>Cast</b> <br/>
                {props.data.actors.length >= 1 && <span>{props.data.actors[0].name}</span>}
                {props.data.actors.length >= 2 && <span>{props.data.actors[0].name && ","} {props.data.actors[1].name}</span>}
                {props.data.actors.length >= 3 && <span>{props.data.actors[1].name && ","} {props.data.actors[2].name}</span>}
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Director</b> <br/>
                {props.data.director && props.data.director.name}
              </Col>
              <Col>
                <b>Writer</b> <br/>
                {props.data.writer && props.data.writer.name}
              </Col>
            </Row>
          </Container>
        <Card.Link style={{ float: 'right' }} onClick={openMovieDetail} href="">{props.data.locations.length} Locations</Card.Link>
      </Card.Body>
    </Card>
  );
}

class SearchResult extends Component {
  constructor(props) {
    super(props);
    var query = this.props.match.params.query;
    this.state = { text: query, searching: true, data: [] };
  }

  onTextChange = evt => {
    var text = document.getElementById('text').value;
    this.setState({ text  });
  }

  search = evt => {
    this.props.history.push(`/search/${this.state.text}`, {key: this.state.text});
  }

  componentDidMount() {
    axios.get(`/api/search/${this.state.text}/`)
      .then((response) => {
        this.setState({searching: false, data: response.data});
        console.log(response.data);
      })
      .catch((error) => {
        this.setState({searching: false})
        console.log(error);
      });
  }

  render() {

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' && this.state.text !== '') {
        this.search();
      }
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div style = {{ padding: 20, margin: 'auto', display: 'inline-block', maxWidth: 640, width: '100%', textAlign: 'justify'}}>
          <h1 style={{ textAlign: 'center' }}> MovieMap </h1>
          <InputGroup size="lg" className="mb-3" style={{ marginTop: 30, maxWidth: 600 }}>
            <FormControl
              placeholder="Enter Movie Name"
              aria-describedby="basic-addon2"
              id="text"
              onChange={this.onTextChange}
              onKeyDown={onKeyDown}
              value={this.state.text}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" disabled={this.state.text===""} onClick={this.search}>Go</Button>
            </InputGroup.Append>
          </InputGroup>
          <div style={{ background: '', height: '100%', width: '100%', maxWidth: 600, marginTop: 40}}>
            {
              this.state.searching &&
              <Spinner style={{position: 'absolute', left: 0, right: 0, margin: 'auto', top: 0, bottom: 0}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
            { !this.state.searching &&
              <div>
                <b>Results</b><br/><br/>
                <ListGroup>
                  { this.state.data.length === 0 &&
                    <div>
                      <h4> Nothing Found </h4>
                    </div>
                  }
                  {
                    this.state.data.map(
                      (movieObj, index) => <MovieCard data={movieObj} key={index} history={this.props.history}/>
                    )
                  }
                </ListGroup>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
