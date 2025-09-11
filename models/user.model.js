import {db} from '../database/connection.database.js'

const create = async({email, password, username}) => {
    const query = {
        text: `
        INSERT INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING uid, email, username
        `,
        values: [email, password, username]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

const findOneByEmail = async(email) => {
    const query = {
        text: `
        SELECT * FROM USERS
        WHERE EMAIL = $1
        `,
        values: [email]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

export const UserModel = {
    create,
    findOneByEmail
}

