import * as mongoose from 'mongoose'

export interface ModelBase extends mongoose.Document {
    _id: mongoose.Types.ObjectId
}