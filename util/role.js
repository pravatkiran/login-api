const role = require('user-groups-roles');

module.exports = () => {
    // roles 
    role.createNewRole('admin');
    role.createNewRole('user');

    // privileges 
    role.createNewPrivileges()
}