import * as React from 'react';
import { CharactorModel } from 'app/models/CharactorModel';

export namespace CharactorForm {
  export interface Props {
    onSave: (obj: CharactorModel) => void;
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
        const regexp = /^\[a-zA-Z]{1, 10}$/;
        const checkingResult = regexp.exec(value);
        return checkingResult !== null;
      },
      age: (value: any) => {    
        const regexp = /^\D{1, 3}$/;
        const checkingResult = regexp.exec(value);
        return checkingResult !== null;
      },
      comment: (value: any) => { 
        return true;
      }
    }
  }

  register = (e: any) => {
    e.preventDefault();
    this.setState({ isProcessing: true });
    this.props.onSave(this.state.fields);
    setTimeout(() => {
      this.resetForm();
    }, 1000);
  }

  resetForm = () => {
    this.setState({
      isProcessing: false,
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
    this.setState({ fields: fields });
    this.handleValidation();
  }

  handleValidation = () => {
    let errors: any = {};
    for (let key in this.state.fields) {
      if (!this.validaters[key](this.state.fields[key])) {
        errors[key] = true;
      }
    }
    this.setState({ errors: errors });
  }

  render() {
    const {  } = this.props;
    return (
      <section className="contact-form">
        <h2 className="home-title">Register</h2>
        <form onSubmit={this.register}>
          <div className="row">
            <div className="form-group col-7">
              <label className="form-label required">名前</label>
              <input className="form-input" type="text" name="name" id="name" onChange={this.handleChange} value={this.state.fields['name']} />
            </div>
            <div className="form-group col-5">
              <label className="form-label required">年齢</label>
              <input className="form-input" type="text" name="age" id="age" onChange={this.handleChange} value={this.state.fields['age']} />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <label className="form-label">コメント</label>
              <textarea className="form-textarea" name="comment" id="comment" rows={5} onChange={this.handleChange} value={this.state.fields['comment']}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="group-button col-12">
              <button type="submit" className="btn btn-primary btn-style-1" disabled={this.state.isProcessing}>
                <i className="fa fa-spinner fa-spin" id="js-load"></i>
                登録
              </button>
              <button type="button" onClick={this.resetForm} className="btn btn-default btn-style-1"> 
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
