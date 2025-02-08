import Note from "@root/models/noteModel.js";

const NoteController = 
{
    async getAllNotes(req, res) 
    {
        try 
        {
            const notes = await Note.findAll();
            res.json(notes);
        } 
        catch (error) 
        {
            res.status(500).json({ error: "Failed to retrieve notes" });
        }
    },

    async getNoteById(req, res) 
    {
        try
        {
            const note = await Note.findByPk(req.params.id);

            if (!note) return res.status(404).json({ error: "Note not found" });

            res.json(note);
        } 
        catch (error) 
        {
            res.status(500).json({ error: "Failed to retrieve note" });
        }
    },

    async createNote(req, res) 
    {
        try 
        {
            const { title, content } = req.body;
            const newNote            = await Note.create({ title, content });
            res.status(201).json(newNote);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ error: "Failed to create note" });
        }
    },

    async updateNote(req, res) 
    {
        try 
        {
            const { title, content } = req.body;
            const note               = await Note.findByPk(req.params.id);

            if (!note) return res.status(404).json({ error: "Note not found" });

            note.title   = title;
            note.content = content;
            await note.save();

            res.json(note);
        } 
        catch (error) 
        {
            res.status(500).json({ error: "Failed to update note" });
        }
    },

    async deleteNote(req, res) 
    {
        try 
        {
            const note = await Note.findByPk(req.params.id);

            if (!note) return res.status(404).json({ error: "Note not found" });

            await note.destroy();
            res.json({ message: "Note deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete note" });
        }
    },
};

export default NoteController;
