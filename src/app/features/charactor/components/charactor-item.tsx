import * as React from 'react';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/CharacterModel';

export namespace CharacterItem {
  export interface Props {
    updateCharactor: (character: CharacterModel) => void;
    deleteCharactor: (id: number) => void;
    character: any;
    alert: any;
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
      this.props.alert.show({
        type: 'warning',
        msg: `Charactor ${this.props.character.name} was deleted.`
      });
    }).catch((err: any) => {
      this.props.alert.show({
        type: 'danger',
        msg: 'Failed to delete!',
        timeout: 10000
      });
    });
  }

  onUpdate = () => {
    API.patch(`/users/${this.props.character.id}`, this.props.character).then((res: any) => {
      this.props.updateCharactor(res.data);
      this.props.alert.show({
        type: 'success',
        msg: `${res.data.name}'s age was increase to ${res.data.age}.`
      });
    }).catch((err: any) => {
      this.props.alert.show({
        type: 'danger',
        msg: 'Failed to update!',
        timeout: 10000
      });
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
            <button type="button" onClick={this.handleUpdate}  className="btn btn-outline btn-success btn-sm">+1</button>
            <button type="button" onClick={this.handleDelete} className="btn btn-outline btn-danger btn-sm">削除</button>
          </div>
        </td>
      </tr>
    );
  }
}
