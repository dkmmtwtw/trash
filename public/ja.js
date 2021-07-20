XMLHttpRequest.prototype.setRequestHeaders = function (obj) {
	Object.keys(obj).forEach(key => {
		this.setRequestHeader(key, obj[key]);
	});
}
function startsWithVowel(szoveg){
    return 'aeiou'.includes(szoveg[0]);
}
function felsorolas(array){
    return array.join(", ").replace(/,(?=[^,]*$)/," és");
}
