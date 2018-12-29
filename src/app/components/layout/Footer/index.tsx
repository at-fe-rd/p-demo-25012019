import * as React from 'react';

export namespace Footer {
  export interface Props {
    //
  }
}

export class Footer extends React.Component<Footer.Props> {
  render() {
    return (
      <footer className="footer">
        <p>© Asian Tech 2018 All Rights Reserved</p>
      </footer>
    );
  }
}
