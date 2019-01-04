import * as React from 'react';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/CharacterModel';

export namespace CharacterItem {
  export interface Props {
    updateCharactor: (character: CharacterModel) => void;
    deleteCharactor: (id: number) => void;
    character: any;
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props> {

  handleDelete = () => {
    this.onDelete();
  }

  handleUpdate = () => {
    this.onUpdate();
  }

  onDelete() {
    API.delete(`/users/${this.props.character.id}`).then((res: any) => {
      this.props.deleteCharactor(this.props.character.id);
    });
  }

  onUpdate = () => {
    API.patch(`/users/${this.props.character.id}`, this.props.character).then((res: any) => {
      this.props.updateCharactor(this.props.character);
    });
  }

  render() {
    const { character } = this.props;
    return (
      <tr>
        <td className="col-3 no-wrap">
          <span>{character.name}</span>
          <span> ({character.age})</span>
        </td>
        <td className="col-8 comment">
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
