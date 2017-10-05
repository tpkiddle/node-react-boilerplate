'use strict';

const React = require('react');
const Basic = require('./layouts/Basic');

class Home extends React.Component {
  render() {
    return (
      <Basic title="Home" messages={this.props.messages} user={this.props.user} path={this.props.path}>
        <div className="home-grid clearfix">
          <h1>Node React JS boilerplate</h1>
        </div>
      </Basic>
    );
  }
}

Home.propTypes = {
  messages: React.PropTypes.array,
  user: React.PropTypes.object,
  path: React.PropTypes.string.isRequired
};

module.exports = Home;