import * as React from 'react';

export namespace CharacterItem {
  export interface Props {
    character: any;
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props> {
  
  render() {
    const { character } = this.props;
    return (
      <tr>
        <td className="col-4 no-wrap">
          <span>{character.name}</span>
          <span> ({character.age})</span>
        </td>
        <td className="col-7 comment">
          {character.comment}
        </td>
        <td className="col-1 no-wrap">
          <button type="button" className="btn btn-default btn-sm">+1</button>
          <button type="button" className="btn btn-default btn-sm">削除</button>
        </td>
      </tr>
    );
  }
}
