import db from "@root/config/db.js";

const syncDatabase = async () => 
{
    try 
    {
        await db.sync({ alter: true });
        console.log("✅ Database synchronized successfully!");
    } 
    catch (error) 
    {
        console.error("❌ Database synchronization error:", error);
    }
};

syncDatabase();
