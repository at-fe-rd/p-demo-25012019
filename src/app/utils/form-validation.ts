export interface FormField {
  isValid: boolean;
  isTouched: boolean;
  value: any;
  rules?: any;
  errors?: any;
  onChange?: any;
  [key: string]: any;
}

export interface FormValidation {
  [key: string]: any;
}

export class FormValidation {
  form: any;

  constructor(form: any) {
    let fields: any = {};
    let isValid = true;
    for (let key in form) {
      fields[key] = {
        name: key,
        isValid: false,
        isTouched: false,
        value: form[key].value || undefined,
        rules: form[key].rules || {},
        errors: {},
        onChange: this._handleChange
      };
      if (!this._fieldValidate(fields[key], false)) {
        isValid = false;
      }
    }
    this.form = {
      data: {},
      isValid: isValid,
      isTouched: false,
      fields: fields,
      fieldChange: this._fieldChange
    };
    return this.form;
  }

  private _fieldValidate = (field: any, hasChanged: boolean = true) => {
    let rule: any;
    field.isTouched = hasChanged;
    field.isValid = true;
    field.errors = {};
    for (let key in field.rules) {
      rule = field.rules[key];
      if (!rule(field.value)) {
        field.isValid = false;
        field.errors[key] = true;
      }
    }
    if (hasChanged) {
      this._updateData();
    }
    return field.isValid;
  };

  private _handleChange = (value: any) => {
    this._fieldValidate(this, value);
  };

  private _updateData = () => {
    let data: any = {};
    let isValid = true;
    for (let key in this.form.fields) {
      data[key] = this.form.fields[key].value;
      if (!this.form.fields[key].isValid) {
        isValid = false;
      }
    }
    this.form.data = data;
    this.form.isValid = isValid;
  };

  private _fieldChange = (name: string, value: any) => {
    this.form.fields[name].value = value;
    this._fieldValidate(this.form.fields[name]);
  };

  validation() {
    return this.form;
  }
}
