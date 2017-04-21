import React from 'react'
import store from '../../store.js'
import { connect } from 'react-redux'

var Alert = React.createClass({
    handleClose: function() {
        store.dispatch({ type: "ALERT_CLOSE" });
    },

    render: function() {
        return (
            <div className={"alert alert-" + this.props.class + " alert-dismissible " + ( this.props.visible
                ? ""
                : "hide" )} role="alert">
                <button type="button" className="close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
            </div>
        )
    }
})

var getProps = function( store ) {
    return { visible: store.alerts.visible, text: store.alerts.text, class: store.alerts.class }
}

export default connect( getProps )( Alert )
