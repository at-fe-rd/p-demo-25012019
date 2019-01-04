import * as React from 'react';
import { CharacterItem } from './charactor-item';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/CharacterModel';

export namespace CharactorList {
  export interface Props {
    onRefresh: (data: any) => void;
    onUpdate: (character: CharacterModel) => void;
    onDelete: (id: number) => void;
    data: any;
  }
}

export class CharactorList extends React.Component<CharactorList.Props> {

  componentDidMount() {
    this.fetchData();
  }

  loadMore = () => {
    this.fetchData();
  }

  fetchData = () => {
    API.get('/users').then((res: any) => {
      this.props.onRefresh(res.data);
    });
  }

  render() {
    const { onDelete, onUpdate, data } = this.props;
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
                deleteCharactor={onDelete} />
            ))}
          </tbody>
        </table>
        <div className="view-more center-text">
          <button onClick={this.loadMore} className="btn btn-primary">さらに表示</button>
        </div>
      </section>
    );
  }
}
