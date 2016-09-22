import React from 'react'
import store from '../store.js'

import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import UserRow from './UserRow.jsx'

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
                        {
                            store.getState().users.map( function(user) {
                                return <UserRow fullname={ user.fullname } joinedOn={ user.joinedOn } position={ user.position } key={ user.id } />
                            })
                        }
                        </tbody>
                    </Table>
                </div>    
            </div>
        </div>        
    );
  }
});

export default UsersTable