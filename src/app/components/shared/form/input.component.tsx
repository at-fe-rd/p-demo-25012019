import * as React from 'react';

export interface ControlStatus {
  name: string;
  isTouched: boolean;
  isValid: boolean;
  errors?: {
    required?: boolean,
    pattern?: boolean,
    min?: boolean,
    max?: boolean
  }
}

export class Field {
  value: string;
  error: any;
  isTouched: boolean;
  isValid: boolean;

  constructor() {
    this.value = '';
    this.error = null;
    this.isTouched = false;
    this.isValid = false;
  }

  reset = () => {
    this.value = '';
    this.error = null;
    this.isTouched = false;
    this.isValid = false;
  }
}

export namespace Input {

  export interface Props {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidate?: (event: ControlStatus) => void;
    className?: string;
    name: string;
    value?: string;
    type?: string;
    validators?: {
      required?: boolean,
      pattern?: RegExp,
      min?: number,
      max?: number
    }
  }

  export interface State {
    isTouched: boolean;
    isValid: boolean;
    errors: {
      required?: boolean,
      pattern?: boolean,
      min?: boolean,
      max?: boolean
    }
  }

}

export class Input extends React.Component<Input.Props, Input.State> {
  constructor(props: Input.Props, context?: any) {
    super(props, context);
    this.state = {
      isTouched: false,
      isValid: true,
      errors: {}
    }
  }

  componentWillUnmount = () => {
    this.setState({isTouched: false});
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    this.validate(e);
  }

  triggerOnValidate = () => {
    if (this.props.onValidate) {
      this.props.onValidate({
        name: this.props.name,
        isTouched: this.state.isTouched,
        isValid: this.state.isValid,
        errors: {
          required: this.state.errors.required,
          pattern: this.state.errors.pattern
        }
      })
    }
  }

  onFocus = () => {
    this.setState({isTouched: true});
  }

  validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.validators) {
      this.setState({ isValid: true }, this.triggerOnValidate);
      return;
    }

    const errors = {...this.state.errors}
    let isValid = true;

    // Validate required
    if (this.props.validators.required && this.isBlank(e.target.value)) {
      errors.required = true;
      isValid = false;
    } else {
      errors.required = false
    }

    // Validate pattern
    if (this.props.validators.pattern && e.target.value && !this.props.validators.pattern.test(e.target.value)) {
      errors.pattern = true;
      isValid = false;      
    } else {
      errors.pattern = false;
    }

    // immediately setState and return if value is blank
    if (this.isBlank(e.target.value)) {
      this.setState({
        isValid,
        errors
      }, this.triggerOnValidate);
      return;
    }

    // Validate min
    if (this.props.validators.min && e.target.value.length < this.props.validators.min) {
      errors.min = true;
      isValid = false;
    } else {
      errors.min = false;
    }

    // Validate max
    if (this.props.validators.max && e.target.value.length > this.props.validators.max) {
      errors.max = true;
      isValid = false;
    } else {
      errors.max = false;
    }

    this.setState({
      isValid,
      errors
    }, this.triggerOnValidate);
  }

  isBlank = (value: any): boolean => {
    return value === undefined || value === null || value === '';
  }

  render() {
    return (
      <input
        className={this.props.className}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        onChange={this.onChange}
        onFocus={this.onFocus}
      />
    );
  }

}
