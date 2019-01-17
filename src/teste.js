async function sleep (forHowLong) {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await timeout(forHowLong);
}

async function countFromThree () {
  await sleep(0);
  console.log(3);
  await sleep(1000);
  console.log(2);
  await sleep(1000);
  console.log(1);
  await sleep(1000);
  console.log('DONE');
}

countFromThree();