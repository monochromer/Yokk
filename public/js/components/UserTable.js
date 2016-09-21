import React from 'react'

var UsersTable = React.createClass({
  render: function() {
    return (
        <table>
            <thead>
                <tr>
                    <th width="200">Name</th>
                    <th>Position</th>
                    <th width="150">Joined on</th>
                    <th width="150">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Олег Жермаль</td>
                    <td>Javascript Developer</td>
                    <td>Sep 20 2016</td>
                    <td>
                        <button>Remove</button>
                        <button>Edit</button>
                    </td>
                </tr>
                <tr>
                    <td>Максим Буранбаев</td>
                    <td>Javascript Developer</td>
                    <td>Sep 20 2016</td>
                    <td>
                        <button>Remove</button>
                        <button>Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }
});

exports default UsersTable;