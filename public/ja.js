
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

   dateToHumanComprehensible(arg){
        const date = new Date(arg);
        // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                    (day % 10 === 2 && day !== 12) ? 'nd' :
                    (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        hours = hours.toString().padStart(2, '0');

        return `${day}${suffix} of ${month} [${hours}:${minutes}] `;
    }
