import * as React from 'react';
import { CharacterItem } from './charactor-item';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/CharacterModel';

export namespace CharactorList {
  export interface Props {
    onRefresh: (data: any) => void;
    onUpdate: (character: CharacterModel) => void;
    onDelete: (id: number) => void;
    alert: any;
    data: any;
  }

  export interface State {
    isLoading?: boolean;
    canLoadmore: boolean;
    selectedItem: number | undefined;
  }
}

export class CharactorList extends React.Component<CharactorList.Props, CharactorList.State> {

  constructor(props: CharactorList.Props, state: CharactorList.State) {
    super(props, state);
    this.state = {
      canLoadmore: true,
      selectedItem: undefined,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  loadMore = () => {
    this.setState({
      isLoading: true
    });
    this.fetchData();
  }

  fetchData = () => {
    API.get(`/users?offset=${this.props.data.length}`).then((res: any) => {
      this.props.onRefresh(res.data);
      if (res.data && res.data.length < 10) {
        this.setState({
          canLoadmore: false
        });
      };
      this.setState({
        isLoading: false
      });
    }).catch((err: any) => {
      this.props.alert.show({
        type: 'danger',
        msg: 'データ接続が失敗しました。後でもう一度やり直してください。',
        timeout: 10000
      });
      this.setState({
        isLoading: false
      });
    });
  }

  onSelect = (id: number) => {
    this.setState({
      selectedItem: id
    })
  }

  render() {
    const { onDelete, onUpdate, data, alert } = this.props;
    const { selectedItem, canLoadmore} = this.state;
    return (
      <section className="list-users">
        <h2 className="home-title">キャラクター</h2>
        <table className="table table-striped table-vm">
          <thead>
            <tr>
              <th className="col-3 no-wrap">
                <span>名前</span>
                <span> (年齢)</span>
              </th>
              <th className="col-8 comment">コメント</th>
              <th className="col-1 no-wrap">アクション</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <CharacterItem
                key={item.id}
                character={item}
                updateCharactor={onUpdate}
                deleteCharactor={onDelete}
                selectCharactor={this.onSelect}
                isVisible={selectedItem === item.id}
                alert={alert}/>
            ))}
          </tbody>
        </table>
        <div className="view-more center-text">
          <button disabled={!canLoadmore} onClick={this.loadMore} className={`btn btn-outline btn-animated ${this.state.isLoading ? 'show' : 'hide'}`}>
            <span className="animated-icon">
              <i className="fa fa-spinner fa-spin"></i>
            </span>
            <span className="animated-label">さらに表示</span>
          </button>
        </div>
      </section>
    );
  }
}
