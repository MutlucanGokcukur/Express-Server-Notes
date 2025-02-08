import { DataTypes } from "sequelize";
import { format } from "date-fns";
import db from "@root/config/db.js";

const Note = db.define(
    "Note",
    {
        id: 
        {
            type        : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey  : true,
        },
        title: 
        {
            type     : DataTypes.STRING,
            allowNull: false,
        },
        content: 
        {
            type     : DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: 
        {
            type        : DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() 
            {
                const rawValue = this.getDataValue("createdAt");
                return rawValue ? format(rawValue, "dd-MM-yyyy HH:mm"): null;
            }
        },
        updatedAt: 
        {
            type        : DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() 
            {
                const rawValue = this.getDataValue("updatedAt");
                return rawValue ? format(rawValue, "dd-MM-yyyy HH:mm"): null;
            }
        }
    },
    {
        tableName : "notes",
        timestamps: true,
    }
);

export default Note;
