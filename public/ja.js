
startsWithVowel = function(szoveg,magyar){
    if magyar
    	return 'aeiouáéíóöőúüű'.includes(szoveg[0]);
    return 'aeiou'.includes(szoveg[0]);
}
felsorolas = function(array){
    return array.join(", ").replace(/,(?=[^,]*$)/," és");
}

suffix = number => (number % 10 === 1 && number !== 11) ? 'st' :
	    (number % 10 === 2 && number !== 12) ? 'nd' :
	    (number % 10 === 3 && number !== 13) ? 'rd' : 'th';

serialize = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}



    const promiseWithTimeout = async function (promise, time) {
        return new Promise((resolve, reject) => {
            const timerId = setTimeout(()=>reject(new Error('Timeout')), time);
            promise
                .then(resolve)
                .catch(reject)
                .finally(() =>
                    clearTimeout(timerId)
                )
        })
    }
