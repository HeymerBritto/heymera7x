import mongoose, { Schema } from 'mongoose'

export interface ModelBase extends mongoose.Document {
    _id: Schema.Types.ObjectId
}