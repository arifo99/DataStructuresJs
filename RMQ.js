class RMQ {
	constructor(values, comparator) {
		this.RMQ = [values];
		this.comparator = comparator;
		this.build();
	}

	build() {
		for(var logVal = 1; ; logVal++) {
			var RMQrow = [];
			for(var i = 0; i + (1<<logVal) - 1 < this.RMQ[0].length; i++) {
				var smallestValue = this.RMQ[logVal - 1][i];
				if(this.comparator(this.RMQ[logVal - 1][i + (1<<(logVal - 1))], smallestValue))
					smallestValue = this.RMQ[logVal - 1][i + (1<<(logVal - 1))];
				RMQrow.push(smallestValue);
			}
			if(RMQrow.length == 0) 
				return;

			this.RMQ.push(RMQrow);
		}
	}

	query(left, right) {
		const diff = right - left + 1;

		var logDiff = 0;
		while((1<<logDiff) <= diff)
			logDiff++;
		logDiff--;

		var leftValue = this.RMQ[logDiff][left], rightValue = this.RMQ[logDiff][right - (1<<logDiff) + 1];
		if(this.comparator(leftValue, rightValue))
			return leftValue;
		return rightValue;
	}
}

exports.RMQ = RMQ;