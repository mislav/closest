var tests = 0, failures = 0

function equal(expected, result) {
	if (expected !== result) throw new Error("got " + result)
}

function test(name, fn) {
	var error
	try {
		fn.call()
	} catch(e) {
		error = e
	}

	if (error) {
		console.error(name + " FAILED: " + error.toString())
		failures++
	} else {
		tests++
	}
}

function find(tagName) {
	return document.getElementsByTagName(tagName)[0]
}

test("find closest link", function() {
	var span = find('span')
	equal(span.parentNode, span.closest('a'))
})

test("find self", function() {
	var link = find('a')
	equal(link, link.closest('a[href]'))
})

test("find <html> element", function() {
	var link = find('a')
	equal(document.documentElement, link.closest('.no-js'))
})

test("stop at first match", function() {
	var link = find('a')
	var item = link.closest('.task-item')
	equal('LI', item.nodeName)
})

test("not found", function() {
	var link = find('a')
	equal(null, link.closest('.nonexistent'))
})

test("prepend", function() {
	var container = document.createElement('div')
	  , span = document.createElement('span')
	  , strong = document.createElement('strong')

	container.appendChild(span)
	container.appendChild(strong)

	container.prepend('hello')
	var el = container.firstChild
	equal('#text', el.nodeName)
	equal('hello', el.textContent)
	equal('SPAN', el.nextSibling.nodeName)

	strong.prepend(document.createElement('b'))
	equal(1, strong.childNodes.length)
	equal('B', strong.firstChild.nodeName)
})

test("prepend multiple", function() {
	var container = document.createElement('div')
	  , span = document.createElement('span')

	container.appendChild(span)

	container.prepend('hello', document.createElement('b'))
	equal(3, container.childNodes.length)
	equal('#text', container.childNodes[0].nodeName)
	equal('B', container.childNodes[1].nodeName)
	equal('SPAN', container.childNodes[2].nodeName)
})

test("prepend empty args", function() {
	var error
	try {
		document.body.prepend()
	} catch(e) { error = e }

	equal('Error: DOM Exception 8', error.toString())
})

var results = document.getElementById('results')
results.textContent = tests + " passed, " + failures + " failures."

if (failures > 0) results.className = 'failed'
else results.className = 'passed'
