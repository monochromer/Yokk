import React from 'react'

class Layout extends React.Component {
    render() {
        return (
            <div>
                <h1>This is layout</h1>
                { this.props.children }
            </div>
        )
    }
}

export default Layout