import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class DataAccessService {
  constructor(private _http: HttpClient) {}

  private async postHTTP(url: string, body: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers: any = {};
      const token: string | null = localStorage.getItem('token');
      if (token) headers.Authorization = `Bearer ${token}`;
      this._http
        .post(url, body, {
          headers,
        })
        .pipe(take(1))
        .subscribe({
          next: (postReturn: any) => {
            if (postReturn.errors) throw new Error(postReturn.errors);
            resolve(postReturn);
          },
          error: (err: any) => {
            reject(err);
          },
        });
    });
  }

  public async callGraphQL(
    operation: string,
    variables: any = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('token')) {
        throw new Error('No auth token found.');
      }
      const body = {
        query: operation,
        variables,
      };

      this.postHTTP(environment.GRAPHQL_URL, body)
        .then((queryReturn: any) => {
          if (queryReturn.errors)
            throw new Error(
              queryReturn.errors
                .map(
                  (gqlErr: { extensions: any; message: string }) =>
                    `Msg: ${gqlErr.message}, Ext: ${gqlErr.extensions.code}, Path: ${gqlErr.extensions.path}`
                )
                .join(',')
            );
          resolve(queryReturn.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async callBackend(endpoint: string, body: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHTTP(`${environment.BACKEND_URL}/${endpoint}`, body)
        .then((backendReturn) => {
          resolve(backendReturn);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
