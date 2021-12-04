function euclideanDistance(a, b){
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}
function vectorMagnitude(vector){
  return Math.sqrt(vector.reduce((acc, cur) => acc + Math.pow(cur, 2), 0));
}
function throttle(func, duration = 100){
  let wait = false;
  return (...args) => {
    if(wait) return;
    func(...args);
    wait = true;
    setTimeout(() => wait = false, duration)
  }
}
function range(start, end, step){
  if(step === undefined){
    step = end < start ? -1 : 1;
  }
  let result = [];
  for(let i = start; step > 0 ? i <= end : i >= end; i += step){
    result.push(i);
  }
  return result;
}
function* enumerate(list){
  for(let i in list){
    yield [i, list[i]];
  }
}