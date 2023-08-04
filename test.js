const data = [
  {
    target: {
      address: {},
    },
    property: "name",
    children: [],
    constraints: {
      isString: "name must be a string",
      isNotEmpty: "name should not be empty",
    },
  },
  {
    target: {
      address: {},
    },
    property: "email",
    children: [],
    constraints: {
      isString: "email must be a string",
      isNotEmpty: "email should not be empty",
    },
  },
  {
    target: {
      address: {},
    },
    value: {},
    property: "address",
    children: [],
    constraints:{
      isNotEmpty:"Adress cannot be null"
    }  
  
  },
];

function findConstraints(error) {
  const err = {};
  for (let i of error) {
    if (i.children.length > 0) {
      err[i.property] = findConstraints(i.children);
    } else {
      const constraints = [];
      for (let j in i.constraints) {
        constraints.push(i.constraints[j]);
      }
      err[i.property] = constraints;
    }
  }
  return err;
}

console.log(findConstraints(data));
