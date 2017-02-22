import React from 'react'
import moment from 'moment'
import store from '../../store'
import { deleteTimeEntry, updateTimeEntry } from '../../actions/timeEntries.js'
import { validateString, validateDuration } from '../../utils/validators'
import { durationBeatify, refsToObject } from '../../helpers'
import { Input } from '../UI.jsx'


class TimeEntryRow extends React.Component {
    constructor(props) {
        super(props);

        this.initState = this.initState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.initState(this.props);
    }

    initState(props) {
        this.setState({
            editing: false,
            fields: {
                description: {
                    value: props.timeEntry.description,
                    displayValue: props.timeEntry.description,
                    valid: true,
                    error: ''
                },
                duration: {
                    value: props.timeEntry.duration,
                    displayValue: durationBeatify(props.timeEntry.duration, 'short'),
                    valid: true,
                    error: ''
                }
            }
        });
    }

    handleDelete() {
        store.dispatch(deleteTimeEntry(this.props.timeEntry._id));
    }

    handleEdit() {
        this.setState({ editing: true });
    }

    handleCancel() {
        this.initState(this.props);
        this.setState({ editing: false });
    }

    handleSave(event) {
        event.preventDefault();
        let { description, duration } = this.state.fields;
        if (!description.valid || !duration.valid) return;

        let editedTimeEntry = Object.assign({}, this.props.timeEntry, {
            description: description.value,
            duration: duration.value
        });

        store.dispatch(updateTimeEntry(editedTimeEntry));
        this.setState({ editing: false });
    }

    handleChange(name, displayValue) {
        let valid, error, value;
        let fields = this.state.fields;

        switch(name) {
            case 'description':
                value = displayValue;
                valid = validateString(value);
                error = valid ? '' : 'Description is required.';
                break;
            case 'duration':
                value = moment.duration(displayValue).asMinutes();
                valid = validateDuration(displayValue);
                error = valid ? '' : 'Invalid duration.';
                break;
        }

        fields[name] = { value, valid, error, displayValue };
        this.setState({fields});
    }

    render() {
        let { entrySource, number } = this.props.timeEntry;
        let description = this.state.fields.description.displayValue;
        let duration = this.state.fields.duration.displayValue;
        let buttonsBlock = '';
        let sourceIcon = '';
        const buttons = (
            <div>
                <button type="button" className="btn btn__icon btn__edit" onClick={ this.handleEdit }></button>
                <button type="button" className="btn btn__icon btn__delete" onClick={ this.handleDelete }></button>
            </div>
        );
        const buttonsEditing = (
            <div>
                <button type="button" className="btn btn__icon btn__save" onClick={ this.handleSave }></button>
                <button type="button" className="btn btn__icon btn__cancel" onClick={ this.handleCancel }></button>
            </div>
        );

        if (entrySource !== 'redmine') {
            buttonsBlock = this.state.editing ? buttonsEditing : buttons;
            sourceIcon = (<img src="/img/redmine-active.svg" width="40px"/>);
        }


        if (entrySource === 'redmine') {
            let link = `http://redmine.soshace.com/issues/number${number}`;
            description = (<span><a href={ link }>issue { number }</a> &nbsp;{ description }</span>);
        } else if (this.state.editing) {
            description = (
                <Input handleChange={ event => this.handleChange('description', event.target.value) }
                       defaultValue={ this.state.fields.description.displayValue }
                       error={ this.state.fields.description.error }
                       name="description"
                       label=""
                       className="input-group input-group__grey"/>
            );

            duration = (
                <Input handleChange={ event => this.handleChange('duration', event.target.value) }
                       defaultValue={ this.state.fields.duration.displayValue }
                       error={ this.state.fields.duration.error }
                       name="duration"
                       label=""
                       mask="99:99"
                       className="input-group input-group__grey"/>
            );
        }
        return (
            <div className="row entry-row vertical-center">
                <div className="col-md-1 text-center">{ sourceIcon }</div>
                <div className="col-md-9 entry-row_description" onClick={ this.handleEdit }>{ description }</div>
                <div className="col-md-1" onClick={ this.handleEdit }>{ duration }</div>
                <div className="col-md-1"> { buttonsBlock } </div>
            </div>
        );
    }
}

export default TimeEntryRow
