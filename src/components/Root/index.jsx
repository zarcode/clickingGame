import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { bindActionCreators } from 'redux';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { usersPropType } from '../../reducers/users';
import { currentUserPropType } from '../../reducers/currentUser';
import { initNewUser } from '../../actions/users';
import setCurrentUser from '../../actions/currentUser';
import styles from './Root.css';
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
    this.props.actions.setCurrentUser(username);
  }

  createNewUser(username) {
    this.props.actions.initNewUser(username);
    this.props.actions.setCurrentUser(username);
  }

  showChoosePlayer() {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={`${styles.choosePlayerDialog} react-confirm-alert-body`}>
          <button className={`${styles.close} close`} aria-label="Close" onClick={onClose}>
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
        <div className={styles.startBar}>
          {this.props.currentUser && (
            <div>
              <strong>Current Player:</strong>
              <span>{this.props.currentUser}</span>
            </div>
          )}
          <button onClick={this.showChoosePlayer}>Choose player</button>
        </div>
        <div className={styles.app}>
          <Board currentUser={this.props.users[this.props.currentUser]} />
          <Scores currentUser={this.props.users[this.props.currentUser]} />
        </div>
      </div>
    );
  }
}

Root.propTypes = {
  users: usersPropType.isRequired,
  currentUser: currentUserPropType.isRequired,
  actions: PropTypes.shape({
    setCurrentUser: PropTypes.func.isRequired,
    initNewUser: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setCurrentUser, initNewUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
