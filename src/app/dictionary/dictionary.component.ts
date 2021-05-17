import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { dictionary, IDictItem } from '../dict';


@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.component.html',
	encapsulation: ViewEncapsulation.None
})
export class DictionaryComponent implements OnInit {
	dictionary: IDictItem[] = dictionary;
	showElements: IDictItem[] = [];
	searchString: string = "";

	constructor() { }

	ngOnInit(): void {
	}

	onType(): void {
		this.showElements = this.dictionary.filter(word => 
				word.label.toLocaleLowerCase()
							.startsWith(this.searchString.toLocaleLowerCase())
		);

	}

}
