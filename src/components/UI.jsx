import React from 'react'
import InputElement from 'react-input-mask'
import classNames from 'classnames'

export class Input extends React.Component {

  state = {
    focus: this.props.defaultValue ? true : false,
    value: "",
    pageLoaded: false
  }

  componentWillReceiveProps(newProps){
    const focus = (this.state.focus || newProps.defaultValue) ? true : false;
    this.setState({focus});
    if(
      !this.state.pageLoaded &&
      newProps.type &&
      newProps.type === "password" &&
      newProps.defaultValue === "" &&
      this.props.defaultValue === ""
    ){
      this.setState({pageLoaded: true, focus: true});
    }
  }

  getInputClasses = () => {
    return classNames({
      [this.props.className]: true,
      'input-group__focus': this.state.focus,
      'input-group__error': (this.props.error)
    });
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }

  handleBlur = () => {
    if(!this.state.value && !this.props.defaultValue) {
      this.setState({ focus: false })
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    if(this.props.hasOwnProperty('handleChange')) {
      this.props.handleChange(event);
    }
  }

  render() {
    const maskChar = typeof this.props.maskChar === 'string' ? this.props.maskChar : '_';
    const type = this.props.type ? this.props.type : 'text';

    if(this.props.error) {
      var error = ( <span className="error"> { this.props.error } </span> );
    }

    return (
      <div className={ this.getInputClasses() } onFocus={ this.handleFocus } onBlur={ this.handleBlur }>
        <label htmlFor={ this.props.name }>{ this.props.label }</label>
        <InputElement type={ type }
             id={ this.props.name }
             name={ this.props.name }
             onChange={ this.handleChange }
             defaultValue={ this.props.defaultValue }
             mask={ this.props.mask }
             maskChar={ maskChar }/>
        { error }
      </div>
    )
  }
}

export class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {

    if(this.props.hasOwnProperty('onChange')) {
      this.props.onChange(event);
    }
    this.setState({ active: !this.state.active })
  }

  render() {
    const { name, label, value } = this.props;
    const checkboxClasses = classNames({
      "checkbox-group": true,
      "checkbox-group__checked": this.state.active
    });

    return (
      <div className={ checkboxClasses }>
        <input type="checkbox" id={ name } name={ name } value={ value } onChange={ this.handleChange }/>
        <label htmlFor={ name }>{ label }</label>
      </div>
    )
  }
}

export class PasswordStrengthIndicator extends React.Component {

  constructor(props) {
    super(props);

    this.getPasswordStrength = this.getPasswordStrength.bind(this);
  }

  getPasswordStrength() {
    const password = this.props.password;
    let passwordStrength;

    const passwordContainsDigits = new RegExp( /\d/ ).test( password );
    const passwordContainsLowercaseLatinLetter = new RegExp( /[a-z]/ ).test( password );
    const passwordContainsUppercaseLatinLetter = new RegExp( /[A-Z]/ ).test( password );
    const passwordContainsSpecialSymbols = new RegExp( /[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]/ ).test( password );
    const passwordHasProperLength = (password.length >= 8 && password.length <= 100);

    if (
      passwordContainsDigits &&
      passwordContainsLowercaseLatinLetter &&
      passwordContainsUppercaseLatinLetter &&
      passwordContainsSpecialSymbols &&
      passwordHasProperLength
    ) {
      passwordStrength = 'Strongest';
    } else if (
      passwordContainsDigits &&
      passwordContainsLowercaseLatinLetter &&
      passwordContainsUppercaseLatinLetter &&
      passwordHasProperLength
    ) {
      passwordStrength = 'Strong';
    } else {
      passwordStrength = 'Weak';
    }

    return passwordStrength;
  }

  render() {
    let classNames = "password-strength-indicator";
    const passwordStrength = this.getPasswordStrength();

    switch(passwordStrength) {
      case 'Strongest':
        classNames += ' password-strength-indicator_strongest';
        break;
      case 'Strong':
        classNames += ' password-strength-indicator_strong';
        break;
      case 'Weak':
      default:
        classNames += ' password-strength-indicator_weak';
        break;
    }

    return (
      <div className={classNames}>
        <div className="password-strength-indicator__text">
          {passwordStrength}
        </div>
        <div className="password-strength-indicator__items">
          <div className="password-strength-indicator__item"></div>
          <div className="password-strength-indicator__item"></div>
          <div className="password-strength-indicator__item"></div>
          <div className="password-strength-indicator__item"></div>
          <div className="password-strength-indicator__item"></div>
          <div className="password-strength-indicator__item"></div>
        </div>
      </div>
    );
  }

}