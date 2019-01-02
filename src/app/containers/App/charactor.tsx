import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { Header, Footer } from 'app/components';
import { CharactorActions } from 'app/features/charactor/charactor.actions';
import { CharactorForm } from 'app/features/charactor/components/charactor-form';
import { CharactorList } from 'app/features/charactor/components/charactor-list';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    pageData: RootState;
    actions: CharactorActions;
  }
}

@connect(
  (state: any, ownProps): Pick<App.Props, 'pageData'> => {
    return { pageData: state.pageData };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(CharactorActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { pageData, actions } = this.props;
    return (
      <div className="page-wrap">
        <Header />
        <div className="container">
          <CharactorForm onSave={actions.newCharactor} />
          <CharactorList data={pageData} onDelete={actions.deleteCharactor} onUpdate={actions.updateCharactor} />
        </div>
        <Footer />
      </div>
    );
  }
}
