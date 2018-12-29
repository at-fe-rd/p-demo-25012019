import * as React from 'react';

export namespace CharacterItem {
  export interface Props {
    //
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props> {
  
  render() {
    const {  } = this.props;
    return (
      <tr>
        <td className="col-4 no-wrap">
          <span>Character name</span>
          <span> (30)</span>
        </td>
        <td className="col-7 comment">
          <p>Comment</p>
          <p>Comment</p>
        </td>
        <td className="col-1 no-wrap">
          <button type="button" className="btn btn-default btn-sm">+1</button>
          <button type="button" className="btn btn-default btn-sm">削除</button>
        </td>
      </tr>
    );
  }
}
