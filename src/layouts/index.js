import React, { Component } from 'react';
import Link from 'gatsby-link';

class Template extends Component {
  render() {
    return (
      <div>
        <h1>
          <Link to={'/'}>Gatsby Starter Blog</Link>
        </h1>
        {this.props.children()}
      </div>
    );
  }
}

export default Template;
