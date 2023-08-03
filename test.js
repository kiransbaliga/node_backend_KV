const data = [
    {
      "target": {
        "address": {}
      },
      "property": "name",
      "children": [],
      "constraints": {
        "isString": "name must be a string",
        "isNotEmpty": "name should not be empty"
      }
    },
    {
      "target": {
        "address": {}
      },
      "property": "email",
      "children": [],
      "constraints": {
        "isString": "email must be a string",
        "isNotEmpty": "email should not be empty"
      }
    },
    {
      "target": {
        "address": {}
      },
      "value": {},
      "property": "address",
      "children": [
        {
          "target": {},
          "property": "line1",
          "children": [],
          "constraints": {
            "isString": "line1 must be a string",
            "isNotEmpty": "line1 should not be empty"
          }
        },
        {
          "target": {},
          "property": "line2",
          "children": [],
          "constraints": {
            "isString": "line2 must be a string",
            "isNotEmpty": "line2 should not be empty"
          }
        },
        {
          "target": {},
          "property": "pincode",
          "children": [],
          "constraints": {
            "isString": "pincode must be a string",
            "isNotEmpty": "pincode should not be empty"
          }
        }
      ]
    }
  ]

  function findConstraints(error) {
    const err = {};
    
    for (let i of error) {
        // console.log(i)
      if (i.property === "address") {
        // console.log(i.children)
        err[i.property] = findConstraints(i.children);
      } else {
          const constraints = [];
          for (let j in i.constraints) {
            // console.log(j)
          constraints.push(i.constraints[j]);
        }
        err[i.property] = constraints;
      }
    }
    return err;
  }

  console.log(findConstraints(data))