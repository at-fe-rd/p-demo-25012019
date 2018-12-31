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
    }
  }

  register = (e: any) => {
    e.preventDefault();
    this.setState({ isProcessing: true });
    this.props.onSave(this.state.fields);
    setTimeout(() => {
      this.setState({ isProcessing: false, fields: {}, errors: {} });
    }, 1000);
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    let fields = {...this.state.fields};
    fields[name] = value;
    this.setState({ fields: fields });
  }

  handleValidation = () => {
    //
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
              <button type="button" className="btn btn-default btn-style-1">登録</button>
              <button id="js-btn-submit" type="submit" className="btn btn-primary btn-style-1" disabled={this.state.isProcessing}>
                <i className="fa fa-spinner fa-spin" id="js-load"></i> 
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
