const fs = require('fs');
const chalk = require('chalk');

let getNotes = function() {
	return "this is my notes";
}

const addNote = function(title, body) {
	const notes = loadNotes();
	const duplicateNotes = notes.filter(function (item) {
		if(item.title === title) {
			return true;
		}
	});

	if(duplicateNotes.length === 0) {
		notes.push({
			title: title,
			body: body
		});
		saveNote(notes);
		console.log('Done');
	} else {
		console.log('title has used');
	}
	
}
const removeNote = function(title) {
	const notes = loadNotes();
	const notesToKeep = notes.filter(function(item) {
		if(item.title !== title) {
			return true;
		}
	});
	if(notesToKeep.length < notes.length) {
		console.log(chalk.green.inverse('note removed'));
		saveNote(notesToKeep);
	} else {
		console.log(chalk.red.inverse('no note removed'));
	}
}
const loadNotes = function() {
	try {
		const dataJSON = fs.readFileSync('./notes.json', {encoding: 'utf-8'});
		return JSON.parse(dataJSON);
	} catch(e) {
		return [];
	}
}

const saveNote = function(notes) {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
}
const listNotes = function () {
	const notes = loadNotes();
	return notes.map((x) => x.title);
}
const readNote = function(title) {
	const notes = loadNotes();
	return notes.filter((x) => x.title === title);
}
module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}


// console.log('utils.js');
// let name = 'Mike';
// let add = function(a, b) {
// 	return a + b;
// }
// module.exports = {name, add};