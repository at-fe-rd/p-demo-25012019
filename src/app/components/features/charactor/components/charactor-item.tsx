import * as React from 'react';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/CharacterModel';
import { ConfirmDialog } from '../../../shared/dialog/dialog.component'
export namespace CharacterItem {
  export interface Props {
    updateCharactor: (character: CharacterModel) => void;
    deleteCharactor: (id: number) => void;
    character: any;
    alert: any;
  }
  export interface State {
    isSelected: string;
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props, CharacterItem.State> {
  constructor(props: CharacterItem.Props) {
    super(props);
    this.state = {
      isSelected: '',
    };
  }

  showPopover = () => {
    this.setState({
      isSelected: this.props.character.id
    })
  }
  hidePopover = () => {
    this.setState({
      isSelected: ''
    })
  }

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
            <button disabled={+character.age === 999} type="button" onClick={this.handleUpdate}  className="btn btn-outline btn-success btn-sm">+1</button>
            <div className="popup-button-container">
              <button type="button" onClick={this.showPopover} className="btn btn-outline btn-danger btn-sm">削除</button>
              { this.state.isSelected === character.id?
                <ConfirmDialog message="Do you want to delete ?"
                              sayNo={this.hidePopover}
                              sayYes={this.handleDelete} />
                : null
              }
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
