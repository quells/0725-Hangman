function randomIndex(arr) {
	if (arr.length < 1) {
		return -1;
	} else if (arr.length == 1) {
		return 0;
	} else {
		return parseInt(Math.random()*arr.length);
	}
}

function removeAtIndex(arr, i) {
	var result = {removed: undefined, remaining: undefined};

	if (i >= arr.length) {
		result.remaining = arr;
	} else {
		result.removed = arr[i];
		result.remaining = arr.slice(0, i).concat(arr.slice(i+1));
	}

	return result;
}
