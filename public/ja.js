XMLHttpRequest.prototype.setRequestHeaders = function (obj) {
			Object.keys(obj).forEach(key => {
				this.setRequestHeader(key, obj[key]);
			});
		}
