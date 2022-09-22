class NotFound extends Error{}
class AccessDenied extends Error{}

function handler_error(err, res){
    if (err instanceof AccessDenied) {
        return res.status(403).send(err.message)
    } else if (err instanceof NotFound) {
        return res.status(404).send(err.message)
    } else {
        return res.status(500).send("Erro desconhecido entre em contato com o administrador")
    }
}

module.exports = {
    NotFound,
    AccessDenied,
    handler_error
}