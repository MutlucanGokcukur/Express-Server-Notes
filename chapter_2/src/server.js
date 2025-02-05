//#region Imports
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from "./middleware/authMiddleware.js";
//#endregion

//#region app and PORT implementation
const app  = express();
const PORT = process.env.PORT || 3000;
//#endregion

//#region Static Files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));
//#endregion

//#region Middleware
app.use(express.json());
//#endregion

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(PORT,() =>
{
    console.log(`Server has started on port: ${PORT}`);
})