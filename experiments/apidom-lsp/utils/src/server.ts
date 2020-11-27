import {
	TextDocument
} from 'vscode-languageserver-textdocument';


export async function test(): Promise<string> {
	console.log("TEST");
	return "TEST";
}
