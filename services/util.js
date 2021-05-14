const _ = require('lodash');

// Standard functions used in services

const createData = (body, fields) => {
    let data = {};
    fields.map(field => {
        data[field] = body[field] || null;
    });
    return data;
};

const updateData = (model, body, fields) => {
    console.log('model',model);
    console.log('body',body);
    console.log('fields',fields)
    fields.map(field => {
        model[field] = body[field] || model[field];
    });
    return model;
}

const init = (req, next, model, fields, where = null) => {
    req.model = model;
    req.model_fields = fields;
    if (where) {
        req.where_field = where;
    }
    return next();
}

const getAll = (req, res, next) => {
    const model = req.model;
    model.findAll().then(items => {
        req.output = items;
        return next();
    });
}

const getAllId = (req, res, next) => {
    const model = req.model;
    const filter = {
        where: {
            [req.where_field]: req.params.id
        }
    };
    model.findAll(filter).then(items => {
        req.output = items;
        return next();
    });
}

const get = (req, res, next) => {
    const model = req.model;
    const id = req.params.id;
    model.findByPk(id).then(item => {
        req.output = item;
        return next();
    });
}

const create = (req, res, next) => {
    const model = req.model;
    const fields = req.model_fields;
    const data = createData(req.body, fields);
    model.create(data).then(item => {
        req.output = item;
        return next();
    }).catch(err => {
        console.log('Error creating item', err);
        return next(err);
    });
}

const update = (req, res, next) => {
    const model = req.model;
    const fields = req.model_fields;
    const id = req.params.id;
    model.findByPk(id).then(item => {
        updateData(item, req.body, fields).save().then(updatedItem => {
            req.output = updatedItem;
            return next();
        });
    });
}

const del = (req, res, next) => {
    const model = req.model;
    const id = req.params.id;
    model.findByPk(id).then(item => {
        item.destroy().then(destroyed => {
            req.output = destroyed;
            return next();
        });
    });
}

exports.createData = createData;
exports.updateData = updateData;
exports.init = init;
exports.getAll = getAll;
exports.getAllId = getAllId;
exports.get = get;
exports.create = create;
exports.update = update;
exports.del = del;