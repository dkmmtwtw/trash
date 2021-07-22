XMLHttpRequest.prototype.setRequestHeaders = function (obj) {
	Object.keys(obj).forEach(key => {
		this.setRequestHeader(key, obj[key]);
	});
}
function startsWithVowel(szoveg,magyar){
    if magyar
    	return 'aeiouáéíóöőúüű'.includes(szoveg[0]);
    return 'aeiou'.includes(szoveg[0]);
}
function felsorolas(array){
    return array.join(", ").replace(/,(?=[^,]*$)/," és");
}
