import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServerService {
    constructor(private http: HttpClient) { }

    getNames(params?): Observable<any> {
        const namesApiUrl = 'http://localhost:3000/names';
        let url: string;
        if (params) {
            url = `${namesApiUrl}/${params.pageIndex}&${params.pageSize}&${params.searchString}`;
        } else {
            url = `${namesApiUrl}/1&10&`;
        }
        return this.http.get<object>(`${url}`);
    }

}
