import * as React from 'react';

export namespace CharactorForm {
  export interface Props {
    //
  }
}

export class CharactorForm extends React.Component<CharactorForm.Props> {
  
  render() {
    const {  } = this.props;
    return (
      <section className="contact-form">
        <h2 className="home-title">Register</h2>
        <form method="POST">
          <div className="row">
            <div className="form-group col-7">
              <label className="form-label required">名前</label>
              <input className="form-input" type="text" name="name" id="name" />
            </div>
            <div className="form-group col-5">
              <label className="form-label required">年齢</label>
              <input className="form-input" type="text" name="age" id="age" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <label className="form-label">コメント</label>
              <textarea className="form-textarea" name="comment" id="comment" rows={5}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="group-button col-12">
              <button type="button" className="btn btn-default btn-style-1">登録</button>
              <button id="js-btn-submit" type="button" className="btn btn-primary btn-style-1">
                {/* <i className="fa fa-spinner fa-spin" id="js-load" style="display: none"></i>  */}
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
