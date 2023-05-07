---
to: src/Models/<%= Name %>/index.ts
---
import { request } from 'Resources/AxiosUtils';
import { JSONType } from 'Typings/@types';


class <%= Name %>Model {

    static getAll<%= Name %> = async (params?: JSONType) => request<<%= Name %>[]>({
            url: '/<%= api %>',
            method: 'GET',
            params
		});
    static get<%= Name %> = async(id: string, params?: JSONType) => request<<%= Name %>>({
            url: `/<%= api %>/${id}`,
            method: 'GET',
            params
        });
}

export default <%= Name %>Model;
