const Post = require('../models/post')
const genPipeline = require('../utils/pipeline').generate
class PostController {

    /**
     * create new Post and its require Auth token
     * @param {*} req 
     * @param {*} res 
     * @return {*} data 
    */
    static async create(req, res) {
        const body = req.body
        const newPost = new Post(body)
        newPost.createdBy = req.admin._id
        newPost.save().then(data => {
            return res.json({ error: false, msg: "Post created", data: data })
        }).catch(e => {
            return res.status(400).json({ error: true, msg: e.message })
        })
    }

    /**
     * ReadMany Post and its require Auth token
     * @param req 
     * @param res 
     * @param req.query.filters {"name":"arun", "status":true, "createdAt":"24/01/2021"} 
     * @param req.query.pageNumber 1,
     * @param req.query.perPage 30,
     * @param req.query.sort {"createdAt":"descending"},
     * @return data[] 
    */
    static async readMany(req, res) {
        var count = 0
        var lookup = [
            {
                $lookup: {
                    from: "admins",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            {
                $unwind: {
                    path: "$createdBy",
                    "preserveNullAndEmptyArrays": true
                }
            },
        ]

        var project = {
            $project: {
                "createdBy.password": 0,
                "createdBy.createdAt": 0,
                "createdBy.updatedAt": 0,
                "createdBy.active": 0,
                "createdBy.__v": 0,
                "__v": 0
            }
        }
        const pipeline = await genPipeline(
            req.query.filters,
            req.query.pageNumber,
            req.query.perPage,
            req.query.sort,
            lookup,
            project,
        );
        let match = false
        for (let i = 0; i < pipeline.length; i++) {
            if (pipeline[i].$match) {
                match = pipeline[i]
            }
        }
        Post.aggregate(pipeline).exec(async (error, data) => {
            if (error) return res.status(400).json({ error: true, msg: error.message })
            try {
                if (match) {
                    count = await Post.aggregate([match, { $group: { _id: null, count: { $sum: 1 } } }])
                } else {
                    count = await Post.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
                }
                count = (count.length >= 1) ? count[0].count : 0
                return res.status(200).json({ error: false, data: data, count: count })
            } catch (err) {
                return res.status(400).json({ error: true, msg: err.message })
            }
        })
    }

    /**
     * ReadMany Post reference of admin and its require Auth token
     * @param req 
     * @param res 
     * @param req.query.filters {"name":"arun", "status":true, "createdAt":"24/01/2021"} 
     * @param req.query.pageNumber 1,
     * @param req.query.perPage 30,
     * @param req.query.sort {"createdAt":"descending"},
     * @return data[] 
    */
    static async readOwnPost(req, res) {
        var count = 0
        var lookup = [
            {
                $lookup: {
                    from: "admins",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            {
                $unwind: {
                    path: "$createdBy",
                    "preserveNullAndEmptyArrays": true
                }
            },
        ]

        var project = {
            $project: {
                "createdBy.password": 0,
                "createdBy.createdAt": 0,
                "createdBy.updatedAt": 0,
                "createdBy.active": 0,
                "createdBy.__v": 0,
                "__v": 0
            }
        }
        if (!req.query.filters) {
            req.query["filters"] = { createdBy: req.admin._id }
        }
        req.query.filters["createdBy"] = req.admin._id
        const pipeline = await genPipeline(
            req.query.filters,
            req.query.pageNumber,
            req.query.perPage,
            req.query.sort,
            lookup,
            project,
        );
        let match = false
        for (let i = 0; i < pipeline.length; i++) {
            if (pipeline[i].$match) {
                match = pipeline[i]
            }
        }
        Post.aggregate(pipeline).exec(async (error, data) => {
            if (error) return res.status(400).json({ error: true, msg: error.message })
            try {
                if (match) {
                    count = await Post.aggregate([match, { $group: { _id: null, count: { $sum: 1 } } }])
                } else {
                    count = await Post.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
                }
                count = (count.length >= 1) ? count[0].count : 0
                return res.status(200).json({ error: false, data: data, count: count })
            } catch (err) {
                return res.status(400).json({ error: true, msg: err.message })
            }
        })
    }
    /**
     * ReadOne Post and its require Auth token
     * @param req 
     * @param res 
     * @param req.params._id _id of post 
     * @return data
    */
    static async readOne(req, res) {
        const _id = req.params._id
        Post.findById(_id).populate("createdBy", ["-password", "-createdAt", "-updatedAt", "-__v"]).exec(async (error, data) => {
            if (error) return res.status(400).json({ error: true, msg: error.message })
            return res.status(200).json({ error: false, data: data })
        })
    }

    /**
     * DeleteOne Post and its require Auth token
     * @param req 
     * @param res 
     * @param req.params._id _id of post 
     * @return data
    */
    static async deleteOne(req, res) {
        const _id = req.params._id
        Post.findOneAndDelete({ _id: _id, createdBy: req.admin._id }).exec(async (error, data) => {
            if (error) return res.status(400).json({ error: true, msg: error.message })
            if (data == null) return res.status(401).json({ error: true, msg: "Invalid Post Id Or Invalid Admin" })
            return res.status(200).json({ error: false, data: data })
        })
    }
}


module.exports = PostController
