---
to: "<%= needsParser ? `src/Models/${Name}/${name}Parsers.ts` : null %>"
unless_exists: true
---
import { JSONType } from 'Typings/@types';
import { <%= Name %> } from './@types';

export const parseTo<%= Name %> = (obj: JSONType): <%= Name %> =>{
	return {...obj} as <%= Name %>;
}