import mongoose, { Schema } from 'mongoose'

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyBusiness: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobBenefits: Array,
    expireAt: {
      type: Date,
      required: true,
    },
    datePosted: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

JobSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
export default mongoose.model('Job', JobSchema)
