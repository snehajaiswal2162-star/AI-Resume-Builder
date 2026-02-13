const { useParams } = require( 'react-router-dom');
const Resume = require('../models/Resume')

//controller for creating new resume 
// POST: /api/resume/create

const createResume = async (req,res) => {
    try {
        const userId = req.userId
        const {title} = req.body

        //create new reume
        const newResume = await Resume.create({userId,title})

        //return success message
        return res.status(400).json({message: "resume created successfully", resume:newResume, success:true})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//controller for resume delete
//POST: /api/resume/delete

const deleteResume = async (req,res) => {
    try {
        const userId = req.userId
        const {resumeId} = req.useParams

        //deletign resume
        await Resume.findOneAndDelete({userId, _id:resumeId})

        //return success message
        return res.status(400).json({message: "Resume deleted successfully", success:true})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//get resume by id
//POST: /api/resume/get

const getResumeById = async (req,res) => {
    try {
        const userId = res.userId
        const {resumeId} = req.useParams

        //get by id
        const resume = await Resume.find({userId,_id:resumeId})

        if(!resume){
            return res.status(400).json({message:"Resume not found!!", success:false})
        }

        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//get resume by public id
//GET: /api/resume/public

const getPublicResumeById = async (req,res) => {
    try {
     const {resumeId} = req.Params 
     
     //by public id
     const resume = await Resume.findOne({public:true, _id: resumeId})
     if(!resume){
        return res.status(400).json({message:"Resume not found", success:false})
     }

     return res.status(200).json({resume})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updateResume = async (req,res) => {
    try {
        const userId = req.userId
        const {resumeData,resumeId,removeBackground} = req.body
        const image = req.file

        let resumeDataCopy = JSON.parse(resumeData)

        const resume = await Resume.findByIdAndUpdate({userId, _id:resumeId}, resumeDataCopy, {new:true})

        return res.status(200).json({message:"Saved successfully", success:true})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    createResume,
    deleteResume,
    getResumeById,
    getPublicResumeById,
}