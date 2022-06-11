class Heap {
	constructor(comparator) {
		this.values = [0];
		this.valueCount = 0;
		this.comparator = comparator
	}

	checkUp(valuePos) {
		const fatherPos = valuePos/2;

		if(fatherPos == 0)
			return

		if(this.comparator(this.values[valuePos], this.values[fatherPos])) {
			[this.values[valuePos], this.values[fatherPos]] = [this.values[fatherPos], this.values[valuePos]];
			this.checkUp(fatherPos);
		}

		return;
	}

	checkDown(valuePos) {
		const leftSonPos = valuePos * 2;
		const rightSonPos = leftSonPos + 1;

		var smallestValue = this.values[valuePos], smallestCase = 1;

		if(leftSonPos <= this.valueCount && this.comparator(this.values[leftSonPos], smallestValue)) {
			smallestValue = this.values[leftSonPos];
			smallestCase = 2;
		}

		if(rightSonPos <= this.valueCont && this.comparator(this.values[rightSonPos], smallestValue)) {
			smallestCase = 3;
		}

		if(smallestCase == 2) {
			[this.values[valuePos], this.values[leftSonPos]] = [this.values[leftSonPos], this.values[valuePos]];
			this.checkDown(leftSonPos);
		}
		else if(smallestCase == 3) {
			[this.values[valuePos], this.values[rightSonPos]] = [this.values[rightSonPos], this.values[valuePos]];
			this.checkDown(rightSonPos);
		}
	}

	insert(newValue) {
		this.valueCount++;
		this.values[this.valueCount] = newValue;
		this.checkUp(this.valueCount);
	}

	pop() {
		var smallestValue = JSON.parse(JSON.stringify(this.values[1]));
		[this.values[1], this.values[this.valueCount]] = [this.values[this.valueCount], this.values[1]];
		this.valueCount--;
		this.checkDown(1);
		return smallestValue;
	}

	peek() {
		return this.values[1];
	}
}

exports.Heap = Heap;