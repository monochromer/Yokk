import React from 'react'
import moment from 'moment'
import store from '../../store'
import { deleteTimeEntry, updateTimeEntry } from '../../actions/timeEntries.js'
import { durationBeatify, refsToObject } from '../../helpers'
import { Input } from '../UI.jsx'


class TimeEntryRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            fields: {}
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleDelete() {
        store.dispatch(deleteTimeEntry(this.props.timeEntry._id));
    }

    handleEdit() {
        this.setState({ editing: true });
    }

    handleCancel() {
        this.setState({ editing: false });
    }

    handleSave(event) {
        event.preventDefault();
        let editedTimeEntry = Object.assign({}, this.props.timeEntry, this.state.fields);
        editedTimeEntry.duration = moment.duration(editedTimeEntry.duration).asMinutes() || this.props.timeEntry.duration;
        store.dispatch(updateTimeEntry(editedTimeEntry));
        this.setState({ editing: false });
    }

    handleChange(event) {
        this.state = {
            fields: {
                [event.target.name]: event.target.value
            }
        }
    }

    render() {

        let { entrySource, description, duration, number } = this.props.timeEntry;
        duration = durationBeatify(duration, 'short');

        if (entrySource == "redmine") {
            let link = `http://redmine.soshace.com/issues/number${number}`;

            description = (
                <span>
                    <a href={ link }>issue { number }</a> &nbsp;
                    { description }
                </span>
            )
        } else {
            if(this.state.editing) {
                description = (
                    <Input handleChange={ this.handleChange }
                           defaultValue={ description }
                           name="description"
                           label=""
                           className="input-group input-group__grey"/>
                );

                duration = (
                    <Input handleChange={ this.handleChange }
                           defaultValue={ duration }
                           name="duration"
                           label=""
                           className="input-group input-group__grey"/>
                )
            }
        }

        let buttons = (
            <div>
                <button type="button" className="btn btn__icon btn__edit" onClick={ this.handleEdit }></button>
                <button type="button" className="btn btn__icon btn__delete" onClick={ this.handleDelete }></button>
            </div>
        );

        let buttonsEditing = (
            <div>
                <button type="button" className="btn btn__icon btn__save" onClick={ this.handleSave }></button>
                <button type="button" className="btn btn__icon btn__cancel" onClick={ this.handleCancel }></button>
            </div>
        );

        let buttonsBlock = "";
        if (entrySource != "redmine") {
            buttonsBlock = this.state.editing ? buttonsEditing : buttons;
        }

        const sourceIcon = entrySource == "redmine" ? (<img src="/img/redmine-active.svg" width="40px"/>) : '';
        return (
            <div className="row entry-row vertical-center">
                <div className="col-md-1 text-center">{ sourceIcon }</div>
                <div className="col-md-9 entry-row_description">{ description }</div>
                <div className="col-md-1">{ duration }</div>
                <div className="col-md-1"> { buttonsBlock } </div>
            </div>
        )
    }
}

export default TimeEntryRow
