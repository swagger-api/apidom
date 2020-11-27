import { equal  }  from 'assert';

import {
	TextDocuments,
} from 'vscode-languageserver';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

suite('Test', () => {
	
	async function doTest(): Promise<string> {
		return "";
	}

	test('test property no schema', async function () {
		const s = await doTest();
		equal(s, '');
	});

});
