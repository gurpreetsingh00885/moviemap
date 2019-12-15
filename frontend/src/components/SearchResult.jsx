import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

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
    console.log("PRESS");
    this.props.history.push(`/search/${this.state.text}`, {key: this.state.text});
  }

  componentDidMount() {
    axios.post('/api/search/', {
        query: this.state.text
      })
      .then((response) => {
        this.setState({searching: false, data: []});
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
      <div>
        <div style = {{ padding: 20, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', overflow: 'auto'}}>
          <h1> MovieMap </h1>
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
                      (paragraph, index) => (
                        <ListGroup.Item style={{textOverflow: 'ellipsis'}} key={index}>
                          <b> Document {index+1} </b><br/>
                          {paragraph}
                        </ListGroup.Item>
                      )
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
