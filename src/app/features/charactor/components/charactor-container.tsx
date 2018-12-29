import * as React from 'react';
import { CharactorForm } from './charactor-form';
import { CharactorList } from './charactor-list';

export namespace CharactorContainer {
  export interface Props {
    //
  }
}

export class CharactorContainer extends React.Component<CharactorContainer.Props> {
  
  render() {
    const {  } = this.props;
    return (
      <div className="container">
        <CharactorForm />
        <CharactorList />
      </div>
    );
  }
}
