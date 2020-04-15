import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHouse} from '../interface/house';
import {IHost} from '../interface/host';
import {ICustomer} from '../interface/customer';

@Injectable()
export class ComponentsService {

  urlApi = 'http://localhost:5000/api/houses/';

  constructor(private httpClient: HttpClient) {
  }

  public listHouse(): Observable<any> {
    return this.httpClient.get(this.urlApi);
  }

  public listCategoryHouse(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/categoryHouses/');
  }

  public listAllHouse(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/housesss/');
  }

  public listCategoryRoom(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/categoryRooms/');
  }

  public findById(id): Observable<any> {
    return this.httpClient.get(this.urlApi + id);
  }


  public addHouse(house: IHouse): Observable<any> {
    return this.httpClient.post<any>(this.urlApi, house);
  }

  public editHouse(house: IHouse): Observable<any> {
    return this.httpClient.put<any>(this.urlApi + house.idNha, house);
  }

  public deleteHouse(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlApi + id);
  }

  public searchByDiaChi(diaChi: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:5000//api/findAllByDiaChiContainsAndTrangThai?house=' + diaChi);
  }

  public searchBySoLuongPhongNgu(soLuong: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:5000//api/findAllBySoLuongPhongNguLessThanEqualAndTrangThai?house=' + soLuong);
  }

  public searchBySoLuongPhongTam(soLuong: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:5000//api/findAllBySoLuongPhongTamLessThanEqualAndTrangThai?house=' + soLuong);
  }

  public searchBetween(input: string, output: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>('http://localhost:5000//api/findAllByGiaTienTheoDemBetweenAndTrangThai?dauDuoi=' + input + '&dauTren=' + output);
  }
  public listUser(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/hosts/');
  }
  public addUser(host: IHost): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/hosts/', host);
  }
  public findByIdChuNha(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/findAllByHost?host=' + id);
  }
  public findByIdHost(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/hosts/' + id);
  }
  public editUser(host: IHost): Observable<any> {
    return this.httpClient.put<any>('http://localhost:5000/api/hosts/' + host.idChuNha, host);
  }
  public addCustomer(customer: ICustomer): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/customers/', customer);
  }
  public editCustomer(customer: ICustomer): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/customers/' + customer.idCustomer, customer);
  }
  public getListCustomer(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/customers/');
  }
}

