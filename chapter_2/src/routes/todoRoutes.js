import express from 'express';
import db from '../db.js';

const router = express.Router();

//#region Get all todos for logged-in user
router.get('/', async (req, res) =>
{

});
//#endregion
//#region Create a new todo
router.post('/', (req, res) =>
{

});
//#endregion
//#region Update a todo
router.put('/:id', (req, res) =>
{

});
//#endregion
//#region Delete a todo
router.delete('/:id', (req, res) =>
{

});
//#endregion

export default router;
