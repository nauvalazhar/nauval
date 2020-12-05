#!/usr/bin/env node

const figlet = require('figlet');
const center = require('center-align');
const fs = require('fs');
const path = require('path');
const about = require('./about.js');

// pl/pr=padding-left/right
const [pl, pr, width, marks] = ["   ", "   ", 80, {
	nw: "╔",
	n:  "═",
	ne: "╗",
	e:  "║",
	se: "╝",
	s:  "═",
	sw: "╚",
	w:  "║",
}];

// helpers
// repeat alias
const r = (str, count) => str.repeat(count);
// create custom box for about section and this box is autoheight
const bx = (title, body) => {
	let o = `${marks.nw}${marks.n}${title}${r(marks.n, (width) - title.length - 3)}${marks.ne}\n`;

	const bs = body.trim().split("\n");

	const bl = marks.w + r(" ", width - 2) + marks.w + "\n";

	o += bl;
	bs.forEach(l => {
		const t = l.trim();
		const restTotal = width - t.length - (pl + pr).length - 2;
		const rest = restTotal > -1 ? r(" ", restTotal) : '';

		o += marks.w + pl + t + rest + pr + marks.w+ "\n";
	});
	o += bl;

	o += `${marks.sw}${r(marks.s, width - 2)}${marks.se}\n`

	return o;
}

// use custom figlet font (named 3d.flf inside fonts/ directory)
const data = fs.readFileSync(path.join(__dirname, '3d.flf'), 'utf8');
figlet.parseFont('3dFont', data);

// starting point
figlet.text(about.header, {
	font: '3dFont'
}, function(err, headerText) {
	console.log("\n\n");
	console.log(
		center(headerText, width),
		"\n\n",
		center(about.tagline, width),
		"\n\n"
	);

	about.sections.forEach(({title, body}) => {
		console.log(bx(title, body));
	});
})
