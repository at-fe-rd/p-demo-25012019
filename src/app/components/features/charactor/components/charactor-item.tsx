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
    selectCharactor: any;
    isVisible: boolean;
  }
}

export class CharacterItem extends React.Component<CharacterItem.Props> {
  constructor(props: CharacterItem.Props) {
    super(props);
  }

  showPopover = () => {
    this.props.selectCharactor(this.props.character.id);
  }
  hidePopover = () => {
    this.props.selectCharactor(0);
  }

  handleDelete = () => {
    this.onDelete();
  }

  handleUpdate = () => {
    this.onUpdate();
  }

  onDelete() {
    API.delete(`/characters/${this.props.character.id}`).then((res: any) => {
      this.props.deleteCharactor(this.props.character.id);
      this.props.alert.show({
        type: 'warning',
        msg: `${this.props.character.name}を削除しますした。`
      });
    }).catch((err: any) => {
      this.props.alert.show({
        type: 'danger',
        msg: `${this.props.character.name}は削除できません。`,
        timeout: 10000
      });
    });
  }

  onUpdate = () => {
    API.patch(`/characters/${this.props.character.id}`, this.props.character).then((res: any) => {
      this.props.updateCharactor(res.data);
      this.props.alert.show({
        type: 'success',
        msg: `${res.data.name}の年齢は${res.data.age}を上げました。`
      });
    }).catch((err: any) => {
      this.props.alert.show({
        type: 'danger',
        msg: '更新が失敗しました。後でもう一度やり直してください。',
        timeout: 10000
      });
    });
  }

  render() {
    const { character, isVisible } = this.props;
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
              {
                isVisible ?
                  <ConfirmDialog message={`${this.props.character.name}を削除しますか？`}
                    sayNo={this.hidePopover}
                    sayYes={this.handleDelete}/>
                  : null
              }
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
