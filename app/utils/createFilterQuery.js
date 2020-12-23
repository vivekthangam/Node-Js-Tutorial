const { Query } = require("mongoose");

var createFilterQuery = async(req, schema) => {
    let query;

    //copy query String
    const reqQuery = {...req.query }
        //Fields to exclude
    console.log(reqQuery)
    const removeFields = ['select', 'sort', 'page', 'limit']

    //Loop over removeFields and delete them form reqQuery
    removeFields.forEach(param => delete reqQuery[param])
        //Create query String
    let queryStr = JSON.stringify(reqQuery)

    //Create Operators ($gt,$gte,$lt,$lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    console.log(queryStr)
    console.log(queryStr)


    query = schema.find(JSON.parse(queryStr)).populate('ToDos')

    //Select Fields
    if (req.query.select) {
        const Fields = req.query.select.split(",").join(" ")
        console.log(Fields)
        query = query.select(Fields)
    }

    //sort 
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ")
        console.log(sortBy)
        query = query.sort(sortBy);
    }

    //pagination
    const Pagination = {};
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await schema.countDocuments();

    if (endIndex < total) {
        Pagination.next = {
            Page: page + 1,
            limit
        }

    }
    if (startIndex > 0) {
        Pagination.prev = {
            Page: page - 1,
            limit
        }

    }
    query = query.skip(startIndex).limit(limit)

    const _schemabj = await query;

    return {
        "data": _schemabj,
        "pagination": Pagination
    };
}

module.exports = createFilterQuery;