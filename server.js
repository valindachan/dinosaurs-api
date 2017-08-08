const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(express.static("public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

let allDinosaurs = [
  {
    id: 0,
    name: "Aardonyx",
    size: "5000 lbs",
    habitats: ["jungle"]
  },
  {
    id: 1,
    name: "Abelisaurus",
    size: "60000 lbs",
    habitats: ["jungle", "mountain"]
  },
  {
    id: 2,
    name: "Bactrosaurus",
    size: "15000 lbs",
    habitats: ["plain"]
  },
  {
    id: 3,
    name: "Camarasaurus",
    size: "70000 lbs",
    habitats: ["mountain"]
  },
  {
    id: 4,
    name: "Dacentrurus",
    size: "90000 lbs",
    habitats: ["desert"]
  },
  {
    id: 5,
    name: "Edmontonia",
    size: "80000 lbs",
    habitats: ["jungle", "desert"]
  }
]

app.get("/api/dinosaurs", (req, res) => {
  res.json(allDinosaurs)
})

app.get("/api/dinosaurs:id", (req, res) => {
  const dinoId = parseInt(req.params.id)
  const dinosaur = allDinosaurs.find(dino => dino.id === dinoId)
  res.json(dinosaur)
})

app.get("/api/dinosaurs:id/habitats", (req, res) => {
  const dinoId = parseInt(req.params.id)
  const dinosaur = allDinosaurs.find(dino => dino.id === dinoId)
  const habitats = dinosaur["habitats"]
  res.json(habitats)
})

// Create a dinosaur
app.post("/api/dinosaurs", (req, res) => {
  let newDino = {
    id: allDinosaurs.length,
    name: req.body.name,
    size: req.body.size,
    habitats: req.body.habitats
  }

  allDinosaurs.push(newDino)

  res.json(newDino)
})

app.put("/api/dinosaurs/:id", (req, res) => {
  const dinoId = parseInt(req.params.id)
  const dinosaur = allDinosaurs.find(dino => dino.id === dinoId)
  dinosaur = {
    id: dinoId,
    name: req.body.name,
    size: req.body.size,
    habitats: req.body.habitats
  }
  res.json(dinosaur)
})

app.delete("/api/dinosaurs/:id", (req, res) => {
  const dinoId = parseInt(req.params.id)
  allDinosaurs = allDinosaurs.filter(dino => dino.id !== dinoId)
  res.json(allDinosaurs)
})

app.listen(3000, function() {
  console.log("Successfully started application!")
})
