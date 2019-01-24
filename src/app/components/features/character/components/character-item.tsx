import * as React from 'react';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/CharacterModel';
import { ConfirmDialog } from '../../../shared/dialog/dialog.component';

export namespace CharacterItem {
  // Character Item property definitions
  export interface Props {
    updateCharacter: (character: CharacterModel) => void; //
    deleteCharacter: (id: number) => void; //
    order: number; // to show item order at the first column
    character: any; // information of a specific character
    alert: any; // alert object
    selectCharacter: any; // set selected item
    isVisible: boolean; // use to control the dialog confirm
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props> {
  constructor(props: CharacterItem.Props) {
    super(props);
  }

  showPopover = () => {
    // set selected item is current character
    this.props.selectCharacter(this.props.character.id);
  };

  hidePopover = () => {
    // unset selected item
    this.props.selectCharacter(null);
  };

  handleDelete = () => {
    this.onDelete();
  };

  handleUpdate = () => {
    this.onUpdate();
  };

  /**
   * Delete character
   * Call api to delete character
   */
  onDelete() {
    API.delete(`/characters/${this.props.character.id}`)
      .then((res: any) => {
        // call action deleteCharacter to update state of character list
        this.props.deleteCharacter(this.props.character.id);
        // display message after delete sucessfully
        this.props.alert.show({
          type: 'warning',
          msg: `${this.props.character.name}を削除しますした。`
        });
      })
      .catch((err: any) => {
        // display error message in case failed to delete
        this.props.alert.show({
          type: 'danger',
          msg: `${this.props.character.name}は削除できません。`,
          timeout: 10000
        });
      });
  }

  /**
   * Update character
   * Call api to update character
   */
  onUpdate = () => {
    API.patch(`/characters/${this.props.character.id}`, this.props.character)
      .then((res: any) => {
        // call action updateCharacter to update state of character list
        this.props.updateCharacter(res.data);
        // display message after update sucessfully
        this.props.alert.show({
          type: 'success',
          msg: `${res.data.name}の年齢は${res.data.age}を上げました。`
        });
      })
      .catch((err: any) => {
        // display error message in case failed to update
        this.props.alert.show({
          type: 'danger',
          msg: '更新が失敗しました。後でもう一度やり直してください。',
          timeout: 10000
        });
      });
  };

  render() {
    const { character, isVisible, order } = this.props;
    return (
      <tr>
        <td className="col-1 no-wrap">{order}</td>
        <td className="col-3 no-wrap">
          <span>{character.name}</span>
          <span> ({character.age})</span>
        </td>
        <td className="col-7 comment">{character.comment}</td>
        <td className="col-1 no-wrap">
          <div className="btn-group">
            <button
              disabled={+character.age === 999}
              type="button"
              onClick={this.handleUpdate}
              className="btn btn-outline btn-primary btn-xs"
            >
              +1
            </button>
            <div className="popup-button-container">
              <button
                type="button"
                onClick={this.showPopover}
                className="btn btn-outline btn-danger btn-xs"
              >
                削除
              </button>
              {isVisible ? (
                <ConfirmDialog
                  message={`${this.props.character.name}を削除しますか？`}
                  sayNo={this.hidePopover}
                  sayYes={this.handleDelete}
                />
              ) : null}
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
