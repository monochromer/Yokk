import React from 'react'
import store from '../../store'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import { validateString } from '../../utils/validators'
import { createCompany } from '../../actions/companies'

class NewCompanyModal extends React.Component {

    constructor(props) {
        super(props);

        this.initState = this.initState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.initState();
    }

    initState() {
        this.setState({
            companyName: {
                value: '',
                error: '',
                valid: false
            }
        });
    }

    handleClose() {
        store.dispatch({ type: 'MODAL_NEW_COMPANY_CLOSE' });
        this.initState();
    }

    handleChange(value) {
        const valid = validateString(value)
        this.setState({
            companyName: {
                value: value,
                valid: valid,
                error: valid ? '' : 'Company name is required.'
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { companyName } = this.state;
        this.handleChange(companyName.value);
        if (!companyName.valid) return;

        this.handleClose()
        store.dispatch(createCompany(companyName.value));
    }

    render() {
        const modalClasses = classNames({
            modal: true,
            hide: !this.props.status
        });

        return (
            <div className={ modalClasses }>
                <div className="modal_close" onClick={ this.handleClose }></div>
                <div className="container">
                    <div className="row center-md vertical-center modal_row">
                        <div className="col-md-6">
                            <div className="row text-center">
                                <div className="col-md-12 text-center">
                                    <h2 className="heading heading__white">New company</h2>
                                </div>
                            </div>
                            <form onSubmit={ this.handleSubmit }>
                                <div className="row marginTop">
                                    <div className="col-md-12">
                                        <Input handleChange={ event => this.handleChange(event.target.value) }
                                                defaultValue={ this.state.companyName.value }
                                                error={ this.state.companyName.error }
                                                className="input-group input-group__grey-white"
                                                name="name"
                                                label="Name"/>
                                    </div>
                                </div>
                                <div className="row marginTop">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn__blue btn__lg linkService_btn">Create</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        status: store.modals.newCompany.visible
    }
}

export default connect(mapStateToProps)(NewCompanyModal)
