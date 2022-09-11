const { AccessControl } = require('accesscontrol')

let grantsObjects = {
    reader: {
        post: {
            'read:any': ['*', '!id']
        }
    },
    writer: {
        post: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    },
    editor: {
        post: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    }
}

const ac = new AccessControl(grantsObjects);


module.exports = ac