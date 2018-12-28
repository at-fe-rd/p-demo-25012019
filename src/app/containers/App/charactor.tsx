import * as React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
// import { omit } from 'app/utils';
import { Header, Footer } from 'app/components/layout';
import { CharactorList, } from 'app/features/charactor/components/charactor-list';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    //
  }
}

// @connect(
//   (state: RootState, ownProps): Pick<App.Props, 'todos' | 'filter'> => {
//     const hash = ownProps.location && ownProps.location.hash.replace('#', '');
//     const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
//     return { todos: state.todos, filter };
//   },
//   (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
//     actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
//   })
// )
export class App extends React.Component<App.Props> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header />
        <CharactorList />
        <Footer />
      </div>
    );
  }
}
