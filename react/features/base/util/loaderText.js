import React, { Component } from 'react';
import { Text } from 'react-native';

export default class LoaderText extends Component {
  state = {
    timer: null,
    counter: 0
  };

  constructor(props){
      super(props);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer: timer});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick =() => {
    this.setState({
      counter: this.state.counter + 1
    });
  }


  render() {
    return <Text style={this.props.textStyle}>
        {this.props.content + "...".substr(0, this.state.counter % 3 + 1)}
    </Text>
  }
}

