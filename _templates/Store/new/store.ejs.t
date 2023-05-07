---
to: src/Stores/<%= name %>/index.ts
---
import { action, Action, thunk, Thunk } from 'easy-peasy';
import { TRootStore } from 'Stores';
import { <%= Name %> } from 'Models/<%=Name%>/@types.ts'


export interface <%= Name %>State {
	<%= name %>: <%= Name %>;
	get<%= Name %>: Thunk<<%=Name%>State, <%= Name %>, any, TRootStore, Promise<R>>;
	set<%= Name %>: Action<<%=Name%>State, <%= Name %>>;

 }

const <%= name %>Store: <%= name %>State = {};

export default <%= name %>Store;

