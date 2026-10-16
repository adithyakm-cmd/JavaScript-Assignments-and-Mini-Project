// Assignment 4: Loop Control Structures
console.log("-- Multiplication Table of 5 --");
for (let i = 1; i <= 5; i++) {
  console.log(`5 x ${i} = ${5 * i}`);
}

console.log("\n-- First number > 10 divisible by 6 --");
let number = 11;
while (true) {
  if (number > 10 && number % 6 === 0) {
    console.log(`Found: ${number}`);
    break;
  }
  number++;
}

console.log("\n-- do...while loop with continue --");
let counter = 0;
do {
  counter++;
  if (counter === 3) continue;
  console.log(`Counter: ${counter}`);
} while (counter < 5);
