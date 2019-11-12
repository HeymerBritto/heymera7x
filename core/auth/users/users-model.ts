import * as mongoose from 'mongoose'
import { ModelBase } from '../../generic/model/base-model'

export interface IUser extends ModelBase {
    username: string,
    email: string,
    password: string
}

const userSchema: mongoose.Schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

export const User = mongoose.model<IUser>('User', userSchema)