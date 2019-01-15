import * as React from 'react';
import { CharacterModel } from 'app/models/CharacterModel';
import { API } from 'app/utils/api';
import { Form, Input, ControlStatus, Field } from 'app/components';

export namespace CharactorForm {
  export interface Props {
    onSave: (obj: CharacterModel) => void;
    alerter: any;
  }
  export interface State {
    fields: { [key: string]: Field };
    isProcessing: boolean;
    isFormValid: boolean;
  }
}

export class CharactorForm extends React.Component<CharactorForm.Props, CharactorForm.State> {

  validatePattern = {
    name: /^.{1,10}$/,
    age: /^\d{1,3}$/
  };

  constructor(props: CharactorForm.Props) {
    super(props);
    this.state = {
      fields: {
        name: new Field(),
        age: new Field(),
        comment: new Field()
      },
      isProcessing: false,
      isFormValid: false
    };
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ isProcessing: true });
    this.register({
      name: this.state.fields.name.value,
      age: parseInt(this.state.fields.age.value),
      comment: this.state.fields.comment.value,
    });
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
    const fields = {...this.state.fields};
    fields.name.reset();
    fields.age.reset();
    fields.comment.reset();
    this.setState({
      isProcessing: false,
      isFormValid: false,
      fields
    });
  }

  onValidate = (e: ControlStatus) => {
    const fields = {...this.state.fields};
    fields[e.name].error = e.errors;
    fields[e.name].isValid = e.isValid;
    fields[e.name].isTouched = e.isTouched;

    let isFormValid = true;
    for (let key in fields) {
      if (fields[key].isTouched && !fields[key].isValid) {
        isFormValid = false;
      }
    }
    this.setState({
      isFormValid: isFormValid,
      fields
    });
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    let fields = {...this.state.fields};
    fields[name].value = value;
    this.setState(
      { fields: fields }
    );
  }

  render() {
    const {  } = this.props;
    const { fields } = this.state;
    return (
      <section className="contact-form">
        <h2 className="home-title">登録</h2>
        <Form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="form-group col-7">
              <label className="form-label required">名前</label>
              <Input
                className={`form-input ${ fields.name.isTouched && !fields.name.isValid ? 'invalid' : '' }`}
                name="name"
                value={fields.name.value}
                onChange={this.handleChange}
                validators={{
                  required: true,
                  pattern: this.validatePattern.name
                }}
                onValidate={this.onValidate}
              />
              <span className="error-msg">名前には1文字以上10文字以下入力してください。</span>
            </div>
            <div className="form-group col-5">
              <label className="form-label required">年齢</label>
              <Input
                className={`form-input ${ fields.age.isTouched && !fields.age.isValid ? 'invalid' : '' }`}
                name="age"
                value={fields.age.value}
                onChange={this.handleChange}
                validators={{
                  required: true,
                  pattern: this.validatePattern.age
                }}
                onValidate={this.onValidate}
              />
              <span className="error-msg">年齢には3桁以下の数字で入力してください。</span>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <label className="form-label">コメント</label>
              <textarea className={`form-input ${ fields.comment.isTouched && !fields.comment.isValid ? 'invalid' : '' }`}
                        rows={5}
                        name="comment"
                        value={fields.comment.value}
                        onChange={this.handleChange}
                        onBlur={this.handleChange}>
              </textarea>
              <span className="error-msg">This field is required</span>
            </div>
          </div>
          <div className="row">
            <div className="btn-group col-12">
              <button type="submit" className={`btn btn-primary btn-animated ${this.state.isProcessing ? 'show' : 'hide'}`} disabled={this.state.isProcessing || !this.state.isFormValid}>
                <span className="animated-icon">
                  <i className="fa fa-spinner fa-spin"></i>
                </span>
                <span className="animated-label">登録</span>
              </button>
              <button type="button" onClick={this.resetForm} className="btn btn-outline btn-success" disabled={this.state.isProcessing || !this.state.isFormValid}>
                キャンセル
              </button>
            </div>
          </div>
        </Form>
      </section>
    );
  }
}
