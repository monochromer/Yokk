import React from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'

var UsersTable = React.createClass({
  render: function() {
    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <h2>Team</h2>  
                </div> 
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Position</th>
                                <th>Joined on</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oleg</td>
                                <td>Developer</td>
                                <td>19.09.2016</td>
                                <td>some actions...</td>
                            </tr>
                            <tr>
                                <td>Max</td>
                                <td>Developer</td>
                                <td>19.09.2016</td>
                                <td>some actions...</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>    
            </div>
        </div>        
    );
  }
});

export default UsersTable