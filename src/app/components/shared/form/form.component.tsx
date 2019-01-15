import * as React from 'react';

export namespace Form {

  export interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  }

}

export class Form extends React.Component<Form.Props> {

  constructor(props: Form.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }

}
