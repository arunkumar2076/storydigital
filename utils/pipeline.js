const ObjectId = require('mongoose').Types.ObjectId
const moment = require('moment')
let MATCH_INDEX_FILTERS
const defaultPageNumber  = process.env.DEFAULTPAGENUMBER
const defaultperPage = process.env.DEFAULTPERPAGE

exports.generate = async (
    filters,
    pageNumber,
    perPage,
    sort,
    lookup,
    project,
) => {

    
    let pipeline = [];
    if (filters) {
        if (Object.keys(filters).length) {
            filtersPipeline(pipeline, filters)
        }
    }
    pageNumber = pageNumber || defaultPageNumber;
    if (perPage == 0) {
        perPage = 1;
    } else {
        perPage = perPage || defaultperPage;
        const skip = (pageNumber - 1) * perPage;
        pipeline.push({ $skip: skip });
        if (perPage > 0) {
            pipeline.push({ $limit: Number(perPage) });
        }
    }
    if (lookup && lookup.length != 0) {
        for (let i = 0; i < lookup.length; i++) {
            pipeline.push(lookup[i]);
        }
    }
    if (project) {
        pipeline.push(project)
    }

    if (sort) {
        if (Object.keys(sort).length)
            sortPipeline(pipeline, sort);
    }
    return pipeline;
};

function filtersPipeline(pipeline, data) {
    MATCH_INDEX_FILTERS = pipeline.push({ $match: { $and: [] } }) - 1;

    Object.keys(data).forEach(function (key) {
        if (data[key] === false || data[key] == 0 || (data[key] != '')) {
            if (data[key] == null) {
                pipeline[MATCH_INDEX_FILTERS].$match.$and.push({ [key]: data[key] });
            } else if (data[key] === false || data[key] === true) {
                pipeline[MATCH_INDEX_FILTERS].$match.$and.push({ [key]: data[key] });
                } else if (moment(data[key], "DD/MM/YYYY", true).isValid()) {
                    if (key == "createdAt") {
                        pipeline[MATCH_INDEX_FILTERS]['$match']['$and'].push({ [key]: { $gte: moment(data[key], "DD/MM/YYYY") } });
                    }
            } else if (!Number.isInteger(data[key]) && !ObjectId.isValid(data[key])) {
                pipeline[MATCH_INDEX_FILTERS].$match.$and.push({ [key]: { $regex: data[key], $options: 'i' } });

            } else if (Number.isInteger(data[key])) {
                pipeline[MATCH_INDEX_FILTERS].$match.$and.push({ [key]: data[key] });
            } else if (ObjectId.isValid(data[key])) {
                pipeline[MATCH_INDEX_FILTERS].$match.$and.push({ [key]: ObjectId(data[key]) });
            }

        }

    });
}

//  "$sort": {
// "createdAt": -1
// }
function sortPipeline(pipeline, data) {
    let sortPipe = {};

    Object.keys(data).forEach(function (key) {

        if (data[key] == 'descending') {
            sortPipe[key] = -1;
        } else {
            sortPipe[key] = 1;
        }
    });
    pipeline.push({ $sort: sortPipe });
}