import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './../../actions/userActions';

class Users extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch(actions.fetchUsers());
  }

  render() {
    const { isFetching, users } = this.props;

    return (
      <section>
        { isFetching ? 'Loading' : `There are ${users.length} users.` }
      </section>
    );
  }
}

Users.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
};

Users.defaultProps = {
  dispatch: () => { },
  users: [],
};

export default connect(({ users }) => ({
  users: users.items,
  isFetching: users.isFetching,
}))(Users);
