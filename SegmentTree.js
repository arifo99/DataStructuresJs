class SegmentTree {
	constructor(size, comparator, values = null) {
		this.size = size;
		this.comparator = comparator;

		this.values = null;
		if(values == null) {
			this.values = [];
			for(var i = 0; i <= this.size; i++)
				this.values.push(0);
		}
		else
			this.values = [0].concat(values);
		
		this.segmentTree = [0];
		for(var i = 0; i < this.size*4; i++)
			this.segmentTree.push(0);

		this.build()
	}

	build(left = 1, right = this.size, nodeIndex = 1) {
		if(left == right) {
			this.segmentTree[nodeIndex] = this.values[left];
			return;
		}

		const middle = Math.floor((left + right)/2);

		this.build(left, middle, 2*nodeIndex);
		this.build(middle + 1, right, 2*nodeIndex + 1);

		if(this.comparator(this.segmentTree[2*nodeIndex], this.segmentTree[2*nodeIndex + 1]))
			this.segmentTree[nodeIndex] = this.segmentTree[2*nodeIndex];
		else
			this.segmentTree[nodeIndex] = this.segmentTree[2*nodeIndex+1];
	}

	update(newValueIndex, newValue, left = 1, right = this.size, nodeIndex = 1) {
		if(left == right) {
			this.segmentTree[nodeIndex] = newValue;
			this.values[newValueIndex] = newValue;
			return;
		}

		const middle = Math.floor((left + right)/2);

		if(newValueIndex <= middle)
			this.update(newValueIndex, newValue, left, middle, 2*nodeIndex);
		else
			this.update(newValueIndex, newValue, middle + 1, right, 2*nodeIndex + 1);
		
		if(this.comparator(this.segmentTree[2*nodeIndex], this.segmentTree[2*nodeIndex + 1]))
			this.segmentTree[nodeIndex] = this.segmentTree[2*nodeIndex];
		else
			this.segmentTree[nodeIndex] = this.segmentTree[2*nodeIndex+1];
	}

	query(l, r, left = 1, right = this.size, nodeIndex = 1) {
		if(l == left && r == right) 
			return this.segmentTree[nodeIndex];
		
		const middle = Math.floor((left + right)/2);

		if(r <= middle)
			return this.query(l, r, left, middle, 2*nodeIndex);
		if(l > middle)
			return this.query(l, r, middle+1, right, 2*nodeIndex + 1);
		
		const leftValue = this.query(l, middle, left, middle, 2*nodeIndex);
		const rightValue = this.query(middle+1, r, middle+1, right, 2*nodeIndex+1);

		if(this.comparator(leftValue, rightValue))
			return leftValue;
		return rightValue;
	}
}

export default SegmentTree;
