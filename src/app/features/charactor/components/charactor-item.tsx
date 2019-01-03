import * as React from 'react';

export namespace CharacterItem {
  export interface Props {
    updateCharactor: (id: number) => void;
    deleteCharactor: (id: number) => void;
    character: any;
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props> {

  
  handleDelete = () => {
    this.props.deleteCharactor(this.props.character.id);
  }

  handleUpdate = () => {
    this.props.updateCharactor(this.props.character.id);
  }
  
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
          <div className="btn-group">
            <button type="button" onClick={this.handleUpdate}  className="btn btn-default btn-sm btn-style-1">+1</button>
            <button type="button" onClick={this.handleDelete} className="btn btn-default btn-sm">削除</button>
          </div>
        </td>
      </tr>
    );
  }
}
