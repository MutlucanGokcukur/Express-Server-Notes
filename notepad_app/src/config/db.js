import { Sequelize } from "sequelize";
import env from "./env.js";

const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, 
{
    host   : env.DB_HOST,
    port   : env.DB_PORT,
    dialect: "mysql",
    logging: false,         // Set to false if you don't want to see SQL logs in the console
    pool   : 
    {
        max    : 10,      // Maximum 10 connection
        min    : 0,       // Minimum 0 connection
        acquire: 30000,
        idle   : 10000
    }
});


const testDBConnection = async () => 
{
    try 
    {
        await db.authenticate();
        console.log("✅ MySQL connection successful!");
    } 
    catch (error) 
    {
        console.error("❌ MySQL connection error:", error);
        process.exit(1);
    }
};

testDBConnection();

export default db;
