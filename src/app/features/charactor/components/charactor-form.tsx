import * as React from 'react';
import { CharacterModel } from 'app/models/CharacterModel';
import { API } from 'app/utils/api';

export namespace CharactorForm {
  export interface Props {
    onSave: (obj: CharacterModel) => void;
  }
  export interface State {
    fields: any;
    errors?: any;
    isProcessing: boolean;
    isFormValid: boolean;
  }
}

export class CharactorForm extends React.Component<CharactorForm.Props, CharactorForm.State> {
  
  validaters: any;

  constructor(props: CharactorForm.Props) {
    super(props);
    this.state = {
      fields: {
        name: '',
        age: '',
        comment: ''
      },
      errors: {},
      isProcessing: false,
      isFormValid: false
    };
    this.validaters = {
      name: (value: any) => {    
        const regexp = /^.{1,10}$/;
        return regexp.test(value);
      },
      age: (value: any) => {    
        const regexp = /^\d{1,3}$/;
        return regexp.test(value);
      },
      comment: (value: any) => { 
        return true;
      }
    }
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ isProcessing: true });
    this.register(this.state.fields);
    setTimeout(() => {
      this.resetForm();
    }, 1000);
  }

  register = (data: CharacterModel) => {
    API.post('/users', data).then((res: any) => {
      this.props.onSave(res.data);
    });
  }

  resetForm = () => {
    this.setState({
      isProcessing: false,
      isFormValid: false,
      fields: {
        name: '',
        age: '',
        comment: ''
      },
      errors: {} 
    });
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    let fields = {...this.state.fields};
    fields[name] = value;
    // call validation after state changed
    this.setState(
      { fields: fields },
      this.handleValidation
    );
  }

  handleValidation = () => {
    let errors: any = {};
    let isFormValid: boolean = true;
    for (let key in this.state.fields) {
      if (!this.validaters[key](this.state.fields[key])) {
        errors[key] = true;
        isFormValid = false;
      }
    }
    this.setState({
      isFormValid: isFormValid,
      errors: errors
    });
  }

  render() {
    const {  } = this.props;
    return (
      <section className="contact-form">
        <h2 className="home-title">登録</h2>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="form-group col-7">
              <label className="form-label required">名前</label>
              <input className={`form-input ${ this.state.errors['name'] ? 'invalid' : '' }`}
                     name="name"
                     value={this.state.fields['name']}
                     onChange={this.handleChange} />
              <span className="error-msg">名前には1文字以上10文字以下入力してください。</span>
            </div>
            <div className="form-group col-5">
              <label className="form-label required">年齢</label>
              <input className={`form-input ${ this.state.errors['age'] ? 'invalid' : '' }`}
                     name="age"
                     value={this.state.fields['age']}
                     onChange={this.handleChange} />
              <span className="error-msg">年齢には3桁以下の数字で入力してください。</span>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <label className="form-label">コメント</label>
              <textarea className={`form-input ${ this.state.errors['comment'] ? 'invalid' : '' }`}
                        rows={5} 
                        name="comment"
                        value={this.state.fields['comment']}
                        onChange={this.handleChange}
                        onBlur={this.handleChange}>
              </textarea>
              <span className="error-msg">This field is required</span>
            </div>
          </div>
          <div className="row">
            <div className="btn-group col-12">
              <button type="submit" className={`btn btn-primary btn-style-1 btn-animated ${this.state.isProcessing ? 'show' : 'hide'}`} disabled={this.state.isProcessing || !this.state.isFormValid}>
                <i className="fa fa-spinner fa-spin animated-icon"></i>
                <span className="animated-label">登録</span>
              </button>
              <button type="button" onClick={this.resetForm} className="btn btn-default btn-style-1" disabled={this.state.isProcessing}> 
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
