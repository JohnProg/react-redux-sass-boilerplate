import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Layout = props => (
  <section>
    {props.children}
  </section>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect()(Layout);
