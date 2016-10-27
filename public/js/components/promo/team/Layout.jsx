import React from 'react'

class Layout extends React.Component {
    render() {
        return (
            <div className="steps-container">
                <header className="steps-container__header">
                    <div className="container">
                        <div className="row bottom-xs">
                            <div className="col-md-3 col-sm-6 col-xs-6">
                                <a href="/" className="blue-active-logo">Eye&nbsp;of&nbsp;Providence</a>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6 text-center hide-sm hide-xs">
                                <span className="steps-counter">step 1 of 5</span>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6 text-right hide-md hide-lg">
                                <span className="steps-counter">step 1 of 5</span>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="steps-container__section">
                    { this.props.children }
                </section>
                <footer className="steps-container__footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                <a href="http://soshace.com" target="_blank">
                                    <img src="/img/logo.png" alt="soshace" title="soshace" height="36px"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}

export default Layout