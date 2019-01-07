import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { Header, Footer, Alert } from 'app/components';
import { AlertActions } from 'app/components/shared/alert/alert.actions';
import { CharacterActions } from 'app/components/features/charactor/charactor.actions';
import { CharactorForm } from 'app/components/features/charactor/components/charactor-form';
import { CharactorList } from 'app/components/features/charactor/components/charactor-list';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    pageData: RootState.PageState;
    notification: RootState.NotificationState;
    actions: CharacterActions;
    alertActions: AlertActions;
  }
}

@connect(
  (state: any, ownProps): Pick<App.Props, any> => {
    return { pageData: state.pageData, notification: state.notification };
  },
  (dispatch: Dispatch): Pick<App.Props, any> => ({
    actions: bindActionCreators(omit(CharacterActions, 'Type'), dispatch),
    alertActions: bindActionCreators(omit(AlertActions, 'Type'), dispatch)
  })
)

export class App extends React.Component<App.Props> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { pageData, actions, alertActions, notification } = this.props;
    return (
      <div className="page-wrap">
        <Alert notification={notification} alerter={alertActions} />
        <Header />
        <div className="container">
          <CharactorForm onSave={actions.newCharactor} alerter={alertActions} />
          <CharactorList data={pageData}
                         onRefresh={actions.indexCharactor}
                         onDelete={actions.deleteCharactor}
                         onUpdate={actions.updateCharactor}
                         alert={alertActions} />
        </div>
        <Footer />
      </div>
    );
  }
}
