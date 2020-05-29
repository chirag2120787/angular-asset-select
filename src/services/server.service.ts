import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
    constructor(private http: HttpClient) { }

    getNames(url, params?) {
        if (params) {
            url = `${url}/${params.pageIndex}&${params.pageSize}&${params.searchString}`;
        }
        return this.http.get<any>(`${url}`);
    }

}
