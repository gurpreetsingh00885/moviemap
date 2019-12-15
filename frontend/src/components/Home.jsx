import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

class Home extends Component {
  state = {
    text: ""
  }

  search = evt => {
    this.props.history.push(`/search/${this.state.text}`, {key: this.state.text});
  }

  onTextChange = evt => {
    var text = document.getElementById('text').value;
    this.setState({ text  });
  }

  render() {
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' && this.state.text !== '') {
        this.search();
      }
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <Jumbotron>
          <h1>Movie Map</h1>
          <br/>
          <p>
            Wanna find the spots your favorite movie was shot at?
            You're in luck!
          </p>
        </Jumbotron>
        <br/>
        <br/>
        Lets get you started!
        <center style={{ margin: 20 }}>
          <InputGroup size="lg" className="mb-3" style={{ maxWidth: 600, marginTop: 30 }}>
              <FormControl
                placeholder="Enter Movie Name"
                aria-label="Word"
                aria-describedby="basic-addon2"
                id="text"
                onChange={this.onTextChange}
                onKeyDown={onKeyDown}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" disabled={this.state.text === ""} onClick={this.search}>Go</Button>
              </InputGroup.Append>
            </InputGroup>
        </center>
      </div>
    );
  }
}

export default Home;
