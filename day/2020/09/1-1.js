const pets = [
  {
    type: "Dog",
    name: "Max",
  },
  {
    type: "Cat",
    name: "Karl",
  },
  {
    type: "Dog",
    name: "Tommy",
  },
];

console.log(pets.find(({ type }) => type === "Cat"));
