import * as React from 'react';
import { CharacterItem } from './charactor-item';

export namespace CharactorList {
  export interface Props {
    data: any;
  }
}

export class CharactorList extends React.Component<CharactorList.Props> {
  
  render() {
    const { data } = this.props;
    return (
      <section className="list-users">
        <h2 className="home-title">Characters</h2>
        <table className="table table-striped table-vm">
          <thead>
            <tr>
              <th className="col-4 no-wrap">
                <span>名前</span>
                <span> (年齢)</span>
              </th>
              <th className="col-7 comment">コメント</th>
              <th className="col-1 no-wrap">アクション</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <CharacterItem key={item.id} character={item} />
            ))}
          </tbody>
        </table>
        <div className="view-more center-text">
          <button type="button" className="btn btn-primary btn-style-1 btn-medium">さらに表示</button>
        </div>
      </section>
    );
  }
}
