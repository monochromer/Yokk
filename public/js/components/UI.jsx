import React from 'react'
import InputElement from 'react-input-mask'
import classNames from 'classnames'

export class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: this.props.defaultValue ? true : false,
            value: ""
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getInputClasses = this.getInputClasses.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getInputClasses() {
        return classNames({
            [this.props.className]: true,
            'input-group__focus': this.state.focus,
            'input-group__error': (this.props.error)
        });
    }

    handleFocus() {
        this.setState({ focus: true })
    }

    handleBlur() {
        if(!this.state.value && !this.props.defaultValue) {
            this.setState({ focus: false })
        }
    }

    handleChange(event) {
        this.state.value = event.target.value;
        if(this.props.hasOwnProperty('handleChange')) {
            this.props.handleChange(event);
        }
    }

    render() {

        if(this.props.error) {
            var error = ( <span className="error"> { this.props.error } </span> );
        }

        const type = this.props.type ? this.props.type : "text";

        return (
            <div className={ this.getInputClasses() } onFocus={ this.handleFocus } onBlur={ this.handleBlur }>
                <label htmlFor={ this.props.name }>{ this.props.label }</label>
                <InputElement type={ type }
                       id={ this.props.name }
                       name={ this.props.name }
                       onChange={ this.handleChange }
                       defaultValue={ this.props.defaultValue }
                       mask={ this.props.mask }/>
                { this.state.focus ? null : error }
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
