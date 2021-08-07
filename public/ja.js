
startsWithVowel = function(szoveg,magyar){
    if magyar
    	return 'aeiouáéíóöőúüű'.includes(szoveg[0]);
    return 'aeiou'.includes(szoveg[0]);
}
felsorolas = function(array){
    return array.join(", ").replace(/,(?=[^,]*$)/," és");
}
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
XMLHttpRequest.prototype.setRequestHeaders = function (obj) {
	Object.keys(obj).forEach(key => {
		this.setRequestHeader(key, obj[key]);
	});
}
function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}
