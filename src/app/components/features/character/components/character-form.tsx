import * as React from 'react';
import { CharacterModel } from 'app/models/CharacterModel';
import { API } from 'app/utils/api';
import { FormValidation } from 'app/utils/form-validation';

export namespace CharacterForm {
  export interface Props {
    onSave: (obj: CharacterModel) => void;
    alerter: any;
  }
  export interface State {
    isProcessing: boolean;
    form: FormValidation;
  }
}

export class CharacterForm extends React.Component<CharacterForm.Props, CharacterForm.State> {

  constructor(props: CharacterForm.Props) {
    super(props);
    this.state = {
      isProcessing: false,
      form: this.initForm()
    };
  }

  initForm = () => {
    return new FormValidation(
      {
        name: {
          value: '',
          rules: {
            character: (value: any) => {
              const regexp = /^.{1,10}$/;
              return regexp.test(value);
            },
            required: (value: any) => {
              if (value) {
                return value.trim() !== '';
              } else {
                return false;
              }
            }
          }
        },
        age: {
          value: '',
          rules: {
            age: (value: any) => {
              const regexp = /^\d{1,3}$/;
              return regexp.test(value);
            },
            number: (value: any) => {
              return +value > 0;
            },
          }
        },
        comment: {
          value: ''
        }
      }
    );
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ isProcessing: true });
    this.register(this.state.form.data);
  }

  register = (data: CharacterModel) => {
    API.post('/characters', data).then((res: any) => {
      this.props.onSave(res.data);
      this.props.alerter.show({
        type: 'success',
        msg: `${res.data.name}を追加しました。`
      });
      this.resetForm();
    }).catch((err: any) => {
      this.props.alerter.show({
        type: 'danger',
        msg: '登録が失敗しました。後でもう一度やり直してください。',
        timeout: 10000
      });
      this.setState({
        isProcessing: false
      });
    });
  }

  resetForm = () => {
    this.setState({
      isProcessing: false,
      form: this.initForm()
    });
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.state.form.fieldChange(name, value);
  }

  formChange = (e: any) => {
    this.setState({
      form: this.state.form
    });
  }

  render() {
    const {  } = this.props;
    return (
      <section className="contact-form">
        <h2 className="home-title">登録</h2>
        <form onSubmit={this.onSubmit} onChange={this.formChange}>
          <div className="row">
            <div className="form-group col-7">
              <label className="form-label required">名前</label>
              <input className={`form-input ${ !this.state.form.fields['name'].isValid && this.state.form.fields['name'].isTouched ? 'invalid' : '' }`}
                     name="name"
                     value={this.state.form.fields['name'].value || ''}
                     onChange={this.handleChange} />
              <span className="error-msg">名前には1文字以上10文字以下入力してください。</span>
            </div>
            <div className="form-group col-5">
              <label className="form-label required">年齢</label>
              <input className={`form-input ${ !this.state.form.fields['age'].isValid && this.state.form.fields['age'].isTouched ? 'invalid' : '' }`}
                     name="age"
                     value={this.state.form.fields['age'].value || ''}
                     onChange={this.handleChange} />
              {
                this.state.form.fields['age'].errors['age'] ? (
                  <span className="error-msg">年齢には3桁以下の数字で入力してください。</span>
                ) : (
                  <span className="error-msg">年齢には1以上の数字を入力してくさい。</span>
                )
              }
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <label className="form-label">コメント</label>
              <textarea className={`form-input ${ !this.state.form.fields['comment'].isValid && this.state.form.fields['comment'].isTouched ? 'invalid' : '' }`}
                        rows={5}
                        name="comment"
                        value={this.state.form.fields['comment'].value || ''}
                        onChange={this.handleChange}>
              </textarea>
              <span className="error-msg">This field is required</span>
            </div>
          </div>
          <div className="row">
            <div className="btn-group col-12">
              <button type="submit" className={`btn btn-primary btn-animated ${this.state.isProcessing ? 'show' : 'hide'}`} disabled={this.state.isProcessing || !this.state.form.isValid}>
                <span className="animated-icon">
                  <i className="fa fa-spinner fa-spin"></i>
                </span>
                <span className="animated-label">登録</span>
              </button>
              <button type="button" onClick={this.resetForm} className="btn btn-outline btn-default" disabled={this.state.isProcessing}>
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
