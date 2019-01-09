import * as React from 'react';

export namespace ConfirmDialog {

  export interface Props {
    message: string;
    sayYes?: any;
    sayNo?: any;
  }

}

export class ConfirmDialog extends React.Component<ConfirmDialog.Props> {

  constructor(props: ConfirmDialog.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { message, sayNo, sayYes } = this.props;
    return (
      <div className="popover">
        <h3 className="popover-title">Confirmation</h3>
        <div className="popover-content">
          { message }
        </div>
        <div className="popover-footer">
          <button onClick={ sayYes } className="btn btn-outline btn-danger btn-sm">OK</button>
          <button onClick={ sayNo } className="btn btn-outline btn-success btn-sm">Cancel</button>
        </div>
      </div>
    );
  }

}
