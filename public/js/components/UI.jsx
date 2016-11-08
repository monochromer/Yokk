import React from 'react'
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
        let classes = classNames({
            [this.props.className]: true,
            'input-group__focus': this.state.focus
        });
        return classes;
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
        this.props.handleChange(event);
    }

    render() {
        return (
            <div className={ this.getInputClasses() } onFocus={ this.handleFocus } onBlur={ this.handleBlur }>
                <label htmlFor={ this.props.name }>{ this.props.label }</label>
                <input type="text"
                       id={ this.props.name }
                       name={ this.props.name }
                       onChange={ this.handleChange }
                       defaultValue={ this.props.defaultValue }/>
            </div>
        )
    }
}
