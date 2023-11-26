const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Tallou MacMechan",
    number: "486-480-5304",
  },
  {
    id: 2,
    name: "Granville Syphas",
    number: "748-915-0556",
  },
  {
    id: 3,
    name: "Zared Pashen",
    number: "446-960-1915",
  },
  {
    id: 4,
    name: "Lu Stanyard",
    number: "870-431-5724",
  },
  {
    id: 5,
    name: "Jeremy Feldfisher",
    number: "386-442-8812",
  },
  {
    id: 6,
    name: "Phaidra Coraini",
    number: "365-849-8783",
  },
  {
    id: 7,
    name: "Joelie Jacobsen",
    number: "307-769-8178",
  },
  {
    id: 8,
    name: "Jerrie Alabaster",
    number: "581-933-4644",
  },
  {
    id: 9,
    name: "Leena Kemsley",
    number: "517-906-2719",
  },
  {
    id: 10,
    name: "Adrea Vogt",
    number: "691-376-1485",
  },
];

const nameList = persons.map((person) => person.name);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) res.json(person);
  else res.status(404).end();
});

app.get("/info", (req, res) => {
  const now = new Date();
  const content = `<p>Phonebook has ${persons.length} people</p> <p> ${now}</p>`;
  console.log(content);
  res.send(content);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  id = Math.round(Math.random() * 1000);
  return id;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) return res.status(400).json({ error: "name missing" });
  else if (!body.number)
    return res.status(400).json({ error: "number missing" });
  else if (nameList.some((name) => name === body.name)) {
    return res.status(400).json({ error: "name already exists" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
