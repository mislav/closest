(function (ELEMENT) {
	function convertNode(node) {
		return typeof node === 'string' ? document.createTextNode(node) : node;
	}

	// http://dom.spec.whatwg.org/#mutation-method-macro
	function mutation(nodes) {
		if (!nodes.length) {
			throw new Error('DOM Exception 8');
		} else if (nodes.length === 1) {
			return convertNode(nodes[0]);
		} else {
			var i, fragment = document.createDocumentFragment();

			for (i = 0; i < nodes.length; i++) {
				fragment.appendChild(convertNode(nodes[i]));
			}

			return fragment;
		}
	}

	// http://dom.spec.whatwg.org/#dom-parentnode-prepend
	if (!('prepend' in ELEMENT)) ELEMENT.prepend = function prepend() {
		this.insertBefore(mutation(arguments), this.firstChild);
	};

	// http://dom.spec.whatwg.org/#dom-parentnode-append
	if (!('append' in ELEMENT)) ELEMENT.append = function append() {
		this.appendChild(mutation(arguments));
	};

	// http://dom.spec.whatwg.org/#dom-childnode-before
	if (!('before' in ELEMENT)) ELEMENT.before = function before() {
		if (this.parentNode) {
			this.parentNode.insertBefore(mutation(arguments), this);
		}
	};

	// http://dom.spec.whatwg.org/#dom-childnode-after
	if (!('after' in ELEMENT)) ELEMENT.after = function after() {
		if (this.parentNode) {
			this.parentNode.insertBefore(mutation(arguments), this.nextSibling);
		}
	};

	// http://dom.spec.whatwg.org/#dom-childnode-replacewith
	if (!('replaceWith' in ELEMENT)) ELEMENT.replaceWith = function replace() {
		if (this.parentNode) {
			this.parentNode.replaceChild(mutation(arguments), this);
		}
	};

	// http://dom.spec.whatwg.org/#dom-childnode-remove
	if (!('remove' in ELEMENT)) ELEMENT.remove = function remove() {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
})(Element.prototype);
