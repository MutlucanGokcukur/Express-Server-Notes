import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

//#region Register a new user endpoing /auth/register
router.post('/register', async (req, res) =>
{
    const { username, password } = req.body;
    const hashedPassword         = bcrypt.hashSync(password, 8);  // The higher the number, the more secure it is, but it also increases the processing time.

    try
    {
        //#region Create user
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES(?, ?);`);
        const result     = insertUser.run(username, hashedPassword);
        //#endregion
        //#region Default Todo
        const defaultTodo = "First default todo :)";
        const insertTodo  = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo);
        //#endregion
        //#region Create User Token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn:'24h' });
        //#endregion
        //#region Return user data
        res.status(201).json({ token });
        //#endregion
    }
    catch(err)
    {
        console.log(err.message);
        res.sendStatus(503);
    };
});
//#endregion

router.post('/login', (req, res) =>
{
    const { username, password } = req.body;
    try
    {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
        const user = getUser.get(username);

        if (!user)
        {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid)
        {
            return res.status(401).send({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token })
    }
    catch (err)
    {
        console.log(err.message)
        res.sendStatus(503)
    }

})

export default router;
