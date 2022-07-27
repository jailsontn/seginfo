const { v4: uuidv4 } = require('uuid')

const objects = [ 
    {id: '7503061d-e90c-4200-b93c-9051c7825f17', description: "Aviso de Exemplo"},
]

const all = function(){
    return objects
}

const filter = function(f){
    return all().filter(f)
}

const findIndex = function(field, value){
    let index = all().findIndex(object => object[field] === value)
    if (index < 0) {
        throw new Error('Não encontrado')
    }
    return index
}

const findBy = function(field, value){
    const index = findIndex(field, value)
    return all()[index]
}

const findById = function(id){
    return findBy('id', id)
}

const create = function(object){
    object.id = uuidv4()
    all().push(object)
    return object
}

const update = function(id, new_object){
    let object = findById(id)
    console.log(object)
    console.log(new_object)
    for (let attr of Object.keys(new_object)){
        object[attr] = new_object[attr]
    }
    return object
}

const delete_ = function(id){
    const index = findIndex('id', id)
    all().splice(index, 1);
}

const save = function(object){
    if (object.id === undefined){
        return create(object)
    } 
    return update(object)
}

module.exports = {
    findById,
    all,
    create,
    update,
    delete_,
    save,
}