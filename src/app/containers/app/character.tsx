import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { Header, Footer, Alert } from 'app/components';
import { AlertActions } from 'app/components/shared/alert/alert.actions';
import { CharacterActions } from 'app/components/features/character/character.actions';
import { CharacterForm } from 'app/components/features/character/components/character-form';
import { CharacterList } from 'app/components/features/character/components/character-list';

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
          <CharacterForm onSave={actions.newCharacter} alerter={alertActions} />
          <CharacterList data={pageData}
                         onRefresh={actions.indexCharacter}
                         onDelete={actions.deleteCharacter}
                         onUpdate={actions.updateCharacter}
                         alert={alertActions} />
        </div>
        <Footer />
      </div>
    );
  }
}
