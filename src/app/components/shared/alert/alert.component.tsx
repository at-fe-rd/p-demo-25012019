import * as React from 'react';
// import { Link } from 'react-router';

export namespace Alert {
  export interface Props {
    alerter: any;
    notification: any;
  }
  export interface State {
    isOpen: boolean;
  }
}

export interface Alert {
  isOpen: boolean;
  type: string;
  msg: string;
  obj?: any;
  icon?: any;
}

export class Alert extends React.Component<Alert.Props, Alert.State> {

  private timer: any;

  constructor(props: Alert.Props, context?: any) {
    super(props, context);
    this.state = {
      isOpen: false
    };
  }

  hideMe = () => {
    this.setState({
      isOpen: false
    });
    clearTimeout(this.timer);
  }

  showMe = () => {
    clearTimeout(this.timer);
    this.setState(
      {
        isOpen: true
      },
      this.autoHide
    );
  }

  autoHide() {
    this.timer = setTimeout(() => {
      this.hideMe();
    }, 3000);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.notification.isOpen) {
      this.showMe();
    } else {
      this.hideMe();
    }
  }

  render() {
    const { type, msg } = this.props.notification;
    return (
      <div className={`alert alert-${type} ${this.state.isOpen ? 'fade-in' : 'fade-out'}`}>
        <div className="alert-icon">
          <i className="fa fa-check" aria-hidden="true"></i>
        </div>
        <div className="alert-content">
          {msg}
        </div>
        {/* <div className="alert-close">
          <i className="fa fa-times"></i>
        </div> */}
      </div>
    );
  }
}
