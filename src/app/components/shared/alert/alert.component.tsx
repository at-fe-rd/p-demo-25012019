import * as React from 'react';
// import { Link } from 'react-router';

export namespace Alert {
  export interface Props {
    notification: Alert;
  }
  export interface State {
    isShow: boolean;
  }
}

export interface Alert {
  type: string;
  msg: string;
  obj?: any;
  icon?: any;
}

export class Alert extends React.Component<Alert.Props, Alert.State> {

  constructor(props: Alert.Props, context?: any) {
    super(props, context);
    this.state = {
      isShow: false
    };
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(12);
  }

  render() {
    const { type, msg, obj, icon } = this.props.notification;
    console.log(type, msg, obj, icon);
    return (
      <div className={`alert alert-${type} ${this.state.isShow ? 'show' : ''}`}>
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
