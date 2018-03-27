import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { userPropType } from '../../reducers/users';
import './Root.css';
import Board from '../Board';
import Scores from '../Scores';

class Root extends Component {
  constructor(props) {
    super(props);

    this.chooseUser = this.chooseUser.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.showChoosePlayer = this.showChoosePlayer.bind(this);
  }

  chooseUser(username) {
    this.props.setCurrentUser(username);
  }

  createNewUser(username) {
    this.props.initNewUser(username);
    this.props.setCurrentUser(username);
  }

  showChoosePlayer() {
    confirmAlert({
      customUI: ({ onClose }) =>
        (
          <div className="react-confirm-alert-body choose-player-dialog">
            <button
              className="close"
              aria-label="Close"
              onClick={onClose}
            >
              X
            </button>
            <div className="field-set">
              <strong>Click to choose player</strong>
              <ul>
                {Object.keys(this.props.users).map(username => (
                  <li key={username}>
                    <button
                      onClick={() => {
                        this.chooseUser(username);
                        setTimeout(() => {
                          onClose();
                        }, 300);
                      }}
                    >
                      {username}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="field-set">
              <label htmlFor="player">
                <strong>Or create new</strong>
                <div>
                  <input
                    type="text"
                    name="player"
                    ref={(input) => {
                      this.newPlayer = input;
                    }}
                  />
                  <button
                    onClick={() => {
                      const username = this.newPlayer.value;
                      if (!username) return false;

                      this.createNewUser(username);
                      setTimeout(() => {
                        onClose();
                      }, 300);

                      return true;
                    }}
                  >
                    Choose
                  </button>
                </div>
              </label>
            </div>
          </div>
        ),
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="startBar">
          {this.props.currentUser && (
            <div>
              <strong>Current Player:</strong>
              <span>{this.props.currentUser}</span>
            </div>
          )}
          <button onClick={this.showChoosePlayer}>Choose player</button>
        </div>
        <div className="app">
          <Board currentUser={this.props.users[this.props.currentUser]} />
          <Scores currentUser={this.props.users[this.props.currentUser]} />
        </div>
      </div>
    );
  }
}

Root.propTypes = {
  users: PropTypes.objectOf(userPropType).isRequired,
  currentUser: PropTypes.string.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  initNewUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: username => dispatch({ type: 'SET_CURRENT_USER', username }),
  initNewUser: username => dispatch({ type: 'INIT_NEW_USER', username }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
