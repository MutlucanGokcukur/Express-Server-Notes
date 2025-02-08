import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import env from '@root/config/env.js';
import noteRoutes from '@root/routes/noteRoutes.js';
import sequelize from "@root/config/db.js";
import "./config/sync.js"; 

//#region app and PORT implementation
const app  = express();
const PORT = env.PORT || 3000;
//#endregion

//#region Static Files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));
//#endregion

//#region Middleware
app.use(express.json());
//#endregion

//#region Routes
app.use('/notes', noteRoutes);
//#endregion

//#region Database Sequelize Sync
sequelize.sync()
    .then(() => 
    {
        console.log("✅ Database sync successful!");
    })
    .catch((err) => 
    {
        console.error("❌ Database sync error:", err);
        process.exit(1);
    });
//#endregion

//#region Start Project
app.listen(PORT, () => 
{
    console.log(`🚀 Server is running on port ${PORT}...`);
});
//#endregion
