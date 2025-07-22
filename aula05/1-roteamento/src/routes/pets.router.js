const { Router } = require('express');

const router = Router();

const pets = [{name: 'Bob', specie: 'Dog'}, {name: 'Tom', specie: 'Cat'}, {name: 'Jerry', specie: 'Mouse'}];

router.param("pet", (req, res, next, pet) => {
  console.log("param pet", pet);

  // Validar se o parâmetro é um número
  if (!isNaN(pet)) {
    return res.status(400).send("Pet name must not be a number");
  }

  if (typeof pet === "string" && pet.length >= 3) {
    req.pet = pet;
    return next();
  }

  return res.status(400).send("Pet name is too short");
});


router.get("/", (req, res) => {
  return res.status(200).json(pets);
});

router.get("/:pet", (req, res) => {
  const { pet } = req;
  console.log("pet", pet);

  const petFound = pets.find(p => p.name === pet);
  if (petFound) {
    return res.status(200).json(petFound);
  }
  return res.status(404).send("Pet not found");
});

router.post("/", (req, res) => {
  const { name, specie } = req.body;
  pets.push({ name, specie });
  res.status(201).send({ name, specie });
});

router.put("/:pet", (req, res) => {
  const { pet } = req;
  console.log("pet put", pet);

  const petIndex = pets.findIndex((p) => p.name === pet);
  console.log(petIndex)
  console.log(pets[petIndex])

  if (petIndex === -1) {
    return res.status(404).send("Pet not found");
  }
  
  pets[petIndex].adotado = true
  console.log(pets[petIndex])

  return res.status(200).json({ pet: pets[petIndex] });
})

module.exports = router;