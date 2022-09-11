
function isAuthor(object, user, options = { attribute: "author" }) {
    return object[options['attribute']] === user.id
}

function isAdmin(user){
    return user.role === "Admin"
}

function isEditor(user){
    return user.role === "Editor"
}

function isLeitor(user){
    return user.role === "Comum"
}

function IsEditordAuthor(object, user){
    return isEditor(user) && isAuthor(object, user)
}

// function IsLeitordAuthor(object, user){
//     return isLeitor(user) && isAuthor(object, user)
// }

function IsAdminOrEditorAuthor(object, user){
    return isLeitor(user) && isAuthor(object, user)
}

module.exports = {
    isAuthor,
    isAdmin,
    isEditor,
    isLeitor,
    IsEditordAuthor,
    IsAdminOrEditorAuthor
}