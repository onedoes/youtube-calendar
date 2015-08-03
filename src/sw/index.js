//

import install from './install';

console.log(window.Dict, Object);

function sleep(ms = 0) {
  return new Promise((t, r) => setTimeout(r, ms));
}


async function foo() {

  console.log('starty');
  try {
    await sleep(1000);
    console.log('b');
  } catch (e) {
    console.log('catch');
  }
  console.log('preend');
}

foo();
console.log('go');
