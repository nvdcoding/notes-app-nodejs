const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');
yargs.command({
	command: 'add',
	describe:'Add a new note',
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'	 
		}
	},
	handler: function(argv) {
		notes.addNote(argv.title, argv.body);
	}	
});
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		notes.removeNote(argv.title);
	}
});
yargs.command({
	command: 'list',
	describe: 'list your notes',
	handler: function() {
		const titles = notes.listNotes();
		for(let i = 1; i <= titles.length; i++) {
			console.log(`${i}: ${titles[i]}`);
		}
	}
});
yargs.command({
	command: 'read',
	describe: 'reading a note',
	builder: {
		title: {
			describe: 'note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		const result = notes.readNote(argv.title);
		if(result.length === 0) {
			console.log(`Note hasnt found`);
		} else {
			console.log(`${result[0].title}: ${result[0].body}`);
		}
	}
});
yargs.parse();