interface CalculatorInterface {
  add(a: number, b: number): number;
  sub(a: number, b: number): number;
  mul(a: number, b: number): number;
  div(a: number, b: number): number;
  mod(a: number, b: number): number;
}

class calculator  implements CalculatorInterface{

  add(a: number, b: number): number{
    return a+b; 
  }

  sub(a: number, b: number): number{
    return a-b; 
  }

  mul(a: number, b: number): number{
    return a*b; 
  }

  div(a: number, b: number): number{
    if (b===0){
      return undefined;
    }
    return a/b; 
  }

  mod(a: number, b: number): number{
        
    return a%b; 
  }

}

const k = new calculator()
console.log(k.add(1,2));
console.log(k.sub(1,2));
console.log(k.mul(1,2));
console.log(k.div(1,2));
console.log(k.mod(1,2));