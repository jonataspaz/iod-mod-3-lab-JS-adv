/* 1. makeCounter below is a decorator function which creates and returns a function that
increments a counter.
a) Create a second counter counter2 using the makeCounter function and test to see if
it remains independent to counter1
b) Modify makeCounter so that it takes an argument startFrom specifying where the
counter starts from (instead of always starting from 0)
c) Modify makeCounter to take another argument incrementBy, which specifies how
much each call to counter() should increase the counter value by. */

function makeCounter(startFrom, inrementBy) {
    let currentCount = startFrom;

    return function() {
    currentCount = currentCount + inrementBy;
    console.log(currentCount)
    return currentCount;s
    };
}

let counter1 = makeCounter(0 , 5);
let counter2 = makeCounter(10 , 1);
counter1(); // 1s
counter1(); // 10
counter2(); // 11
counter2(); // 12
counter2(); // 13
counter2(); // 14

/* 2 The following delayMsg function is intended to be used to delay printing a message until
some time has passed.
a) What order will the four tests below print in? Why?

#4 #3 #2 #1

because of the setTimeout daley of 20 and 100.

b) Rewrite delayMsg as an arrow function
c) Add a fifth test which uses a large delay time (greater than 10 seconds)
d) Use clearTimeout to prevent the fifth test from printing at all. */

 const delayMsg = (msg) => {
  console.log(`This message will be printed after a delay: ${msg}`);
};
setTimeout(delayMsg, 100, "#1: Delayed by 100ms");
setTimeout(delayMsg, 20, "#2: Delayed by 20ms");
setTimeout(delayMsg, 0, "#3: Delayed by 0ms");
delayMsg("#4: Not delayed at all");
const timeout10S = setTimeout(delayMsg, 10000, "#5: Delayed by 10000ms");
clearTimeout(timeout10S);

/* 3. 'Debouncing' is a concept that refers to 'putting off' the execution of multiple, fast-timed,
similar requests until there's a brief pause, then only executing the most recent of those
requests. See https://www.techtarget.com/whatis/definition/debouncing
It's often used to handle fast-firing scrolling events in a browser, or to prevent multiple server
requests being initiated if a user clicks repeatedly on a button.
Using the following code to test and start with:
a) Create a debounce(func) decorator, which is a wrapper that takes a function func and
suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second
pause, the most recent call to func should be executed and any others ignored.
b) Extend the debounce decorator function to take a second argument ms, which defines the
length of the period of inactivity instead of hardcoding to 1000ms
c) Extend debounce to allow the original debounced function printMe to take an argument
msg which is included in the console.log statement. */

 function debounce(func, delay = 1000) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

function printMe(msg) {
  console.log(msg);
}

printMe = debounce(printMe);

//fire off 3 calls to printMe within 300ms - only the LAST one should print, after 1000ms of no calls
setTimeout(() => printMe("debounced message 1"), 100);
setTimeout(() => printMe("debounced message 2"), 200);
setTimeout(() => printMe("debounced message 3"), 300);

/* 4. The Fibonacci sequence of numbers is a famous pattern where the next number in the
sequence is the sum of the previous 2.
e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.
a) Write a function printFibonacci() using setInterval that outputs a number in
the Fibonacci sequence every second.
b) Write a new version printFibonacciTimeouts() that uses nested setTimeout
calls to do the same thing
c) Extend one of the above functions to accept a limit argument, which tells it how many
numbers to print before stopping. */

function printFibonacci() {
  let n1 = 0;
  let n2 = 1;

  console.log(n1);
  console.log(n2);

  setInterval(function () {
    const fib = n1 + n2;
    console.log(fib);

    n1 = n2;
    n2 = fib;
  }, 1000);
}

function printFibonacciTimeouts(limit) {
  let n1 = 0;
  let n2 = 1;

  console.log(n1);
  console.log(n2);

  let count = 2;

  function getNextFibonacci() {
    const fib = n1 + n2;
    console.log(fib);

    n1 = n2;
    n2 = fib;
    count++;

    if (count < limit) {
      setTimeout(getNextFibonacci, 1000);
    }
  }

  setTimeout(getNextFibonacci, 1000);
}

printFibonacciTimeouts(5);

/* 5. The following car object has several properties and a method which uses them to print a
description. When calling the function normally this works as expected, but using it from
within setTimeout fails. Why? */
 let car = {
  make: "Porsche",
  model: "911",
  year: 1964,
  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};

setTimeout(car.description.bind(car), 200);
/* a) Fix the setTimeout call by wrapping the call to car.description() inside a
function
b) Change the year for the car by creating a clone of the original and overriding it
c) Does the delayed description() call use the original values or the new values from
b)? Why?
d) Use bind to fix the description method so that it can be called from within
setTimeout without a wrapper function
e) Change another property of the car by creating a clone and overriding it, and test that
setTimeout still uses the bound value from */

/*6 Use the Function prototype to add a new delay(ms) function to all functions, which can
be used to delay the call to that function by ms milliseconds. */
 function multiply(...args) {
  let multi = 1;
  for (let arg of args) multi *= arg;

  console.log(multi);
}

Function.prototype.delay = function (ms) {
  const fn = this; // reference to the original function
  return function (...args) {
    setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};

multiply.delay(500)(5, 5, 10); // prints 25 after 500 milliseconds

/* a) Use the example multiply function below to test it with, as above, and assume that all
delayed functions will take two parameters
b) Use apply to improve your solution so that delayed functions can take any number of
parameters
c) Modify multiply to take 4 parameters and multiply all of them, and test that your
delay prototype function still works. */

/* 7. In JavaScript, the toString method is used to convert an object to a string representation.
By default, when an object is converted to a String, it returns a string that looks something
like [object Object].
However, we can define our own toString methods for custom objects to provide a more
meaningful string representation.
a) Define a custom toString method for the Person object that will format and print
their details
b) Test your method by creating 2 different people using the below constructor function
and printing them
c) Create a new constructor function Student that uses call to inherit from Person and
add an extra property cohort
d) Add a custom toString for Student objects that formats and prints their details. Test
with 2 students. */
 function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;

  this.toString = function () {
    return this.name + ", " + this.age + " years old, " + this.gender;
  };
}

function Student(name, age, gender, cohort) {
  Person.call(this, name, age, gender);
  this.cohort = cohort;
}

const person1 = new Person("James Brown", 73, "male");
const person2 = new Person("Brown James", 23, "Female");
const student1 = new Student("Smith", 59, "female", "2013");
console.log("person1: " + person1.toString());
console.log("person2: " + person2.toString());
console.log("student1: " + student1.toString());

/* 8. The following DigitalClock class uses an interval to print the time every second once
started, until stopped. */
class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }
  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);

    //dont forget to stop, otherwise the interval will continue forever :-))
     setTimeout(() => {
      this.stop();
     }, 10000);
  }
}
const myClock = new DigitalClock("my clock:");
myClock.start();

class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);

    //dont forget to stop, otherwise the interval will continue forever :-))
    setTimeout(() => {
      clearInterval(this.timer);
    }, 10000);
  }
}

// Love your neat coding mate.

const myPrecisionClock = new PrecisionClock("my precision clock:", 500);
myPrecisionClock.start();

/* a) Create a new class PrecisionClock that inherits from DigitalClock and adds the
parameter precision – the number of ms between 'ticks'. This precision parameter
should default to 1 second if not supplied.
b) Create a new class AlarmClock that inherits from DigitalClock and adds the
parameter wakeupTime in the format hh:mm. When the clock reaches this time, it
should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should
default to 07:00 if not supplied. */

class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime = "07:00") {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }
  display() {
    let date = new Date();
    let [hours, mins] = [date.getHours(), date.getMinutes()];
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    let currentTime = `${hours}:${mins}`;
    console.log(`${this.prefix} ${currentTime}`);
    if (currentTime === this.wakeupTime) {
      console.log("Wake Up");
      this.stop();
    }
  }
}

const myAlarmClock = new AlarmClock("my alarm clock:", "18:05");
myAlarmClock.start();

/* 9. We can delay execution of a function using setTimeout, where we need to provide the
callback function to be executed after the delay.
a) Create a promise-based alternative randomDelay() that delays execution for a
random amount of time (between 1 and 20 seconds) and returns a promise we can use
via .then(), as in the starter code below
b) If the random delay is even, consider this a successful delay and resolve the promise,
and if the random number is odd, consider this a failure and reject it
c) Update the testing code to catch rejected promises and print a different message
d) Try to update the then and catch messages to include the random delay value */
 function randomDelay() {
  const delay = Math.floor(Math.random() * 20000) + 1000; // generate a random delay between 1 and 20 seconds
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay % 2 === 0) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
}
randomDelay()
  .then(() => console.log("Delay succeeded!"))
  .catch(() => console.log("Delay failed!"));

/*   10.Fetch is a browser-based function to send a request and receive a response from a server,
  which uses promises to handle the asynchronous response.
  The below fetchURLData uses fetch to check the response for a successful status
  code, and returns a promise containing the JSON sent by the remote server if successful
  or an error if it failed. (To run this code in a node.js environment, follow the instructions in
  the comments before the function.)
  a) Write a new version of this function using async/await
  b) Test both functions with valid and invalid URLs. */
//run 'npm init' and accept all the defaults
//run 'npm install node-fetch'
//add this line to package.json after line 5: "type": "module",
 import fetch from "node-fetch";

globalThis.fetch = fetch;

async function fetchURLData(url) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
fetchURLData("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));

  //OVERALL everythings alright, all correct and neat, just dont forget to put a stop on your loops, intervals etc.

  // Love your work mate! Keep being curious!