import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const token = window.localStorage.getItem('token');
    this.state = {
      lights: [],
      token: token ? token : '',
    };
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="token">Access Token:</label>
        <input
          id="token"
          type="text"
          value={this.state.token}
          onChange={e => this.onChangeToken(e.target.value)}
        />
        <button onClick={this.listlights.bind(this)}>Go</button>
        {this.state.lights.map(light => (
          <p key="{light.id}" onClick={() => this.toggleLight(light.id)}>
            {light.label}
          </p>
        ))}
      </div>
    );
  }

  onChangeToken(token) {
    window.localStorage.setItem('token', token);
    this.setState({token});
  }

  getHeaders() {
    return {
      Authorization: 'Bearer ' + this.state.token,
    };
  }

  async listlights(e) {
    const lights = await fetch('https://api.lifx.com/v1/lights/all', {
      method: 'get',
      headers: this.getHeaders(),
    }).then(function(res) {
      return res.json();
    });

    this.setState({lights});
  }

  toggleLight(id) {
    fetch('https://api.lifx.com/v1/lights/' + id + '/toggle', {
      method: 'post',
      headers: this.getHeaders(),
    });
  }
}

export default App;
