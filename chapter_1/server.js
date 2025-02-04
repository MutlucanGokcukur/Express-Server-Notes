const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 8383;
let   data    =
[
    "Mutlu"
]
app.use(express.json());


app.get('/', (req, res) =>
{
    res.send("<h1>Homepage</h1>");
    res.sendStatus(200);
});

app.get('/dashboard', (req, res) =>
{
    res.send("<h1>Dashboard</h1>");
    res.sendStatus(200);
});

app.get('/api/data', (req, res) =>
{
    res.send(data);
    res.sendStatus(200);
});

app.post('/api/data', (req, res) =>
{
    const newEntry = req.body;
    const name     = newEntry.name;
    data.push(name);
    res.sendStatus(201);
});

app.delete('/api/data', (req, res) =>
{
    data.pop();
    res.sendStatus(204);
});

app.listen(PORT, () =>
{
    console.log(`Server has started on: ${PORT}`);
});
