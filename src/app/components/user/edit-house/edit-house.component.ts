import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import {Picture} from '../picture';
import {AngularFireDatabase} from '@angular/fire/database';

declare const myTest: any;

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss']
})
export class EditHouseComponent implements OnInit {
  myItems: File[] = [];
  isDone = false;
  picture: Picture[];
  listUser: any[];
  arrayPicture: Picture[] = [];
  categoryHouseList: any[];
  categoryRoomList: any[];
  house: any;
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  idNha: number;
  formGroup = new FormGroup({
    tenNha: new FormControl(),
    diaChi: new FormControl(),
    soLuongPhongNgu: new FormControl(),
    soLuongPhongTam: new FormControl(),
    moTaChung: new FormControl(),
    giaTienTheoDem: new FormControl(),
    trangThai: new FormControl(),
    idNha: new FormControl(),
    categoryHouseId: new FormControl(),
    categoryRoomId: new FormControl()
  });

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.componentsService.listUser().subscribe(result2 => {
      this.listUser = result2;
    });
    this.componentsService.listCategoryHouse().subscribe(result => {
      this.categoryHouseList = result;
    });
    this.componentsService.listCategoryRoom().subscribe(result1 => {
      this.categoryRoomList = result1;
    });
    this.route.paramMap.subscribe(params => {
      const idSearch = params.get('id');
      this.componentsService.findById(idSearch).subscribe(house => {
        this.house = house;
        this.formGroup.controls.tenNha.setValue(this.house.tenNha);
        this.formGroup.controls.diaChi.setValue(this.house.diaChi);
        this.formGroup.controls.soLuongPhongNgu.setValue(this.house.soLuongPhongNgu);
        this.formGroup.controls.soLuongPhongTam.setValue(this.house.soLuongPhongTam);
        this.formGroup.controls.moTaChung.setValue(this.house.moTaChung);
        this.formGroup.controls.giaTienTheoDem.setValue(this.house.giaTienTheoDem);
        this.formGroup.controls.trangThai.setValue(this.house.trangThai);
        this.formGroup.controls.categoryHouseId.setValue(this.house.categoryHouse.id);
        this.formGroup.controls.categoryRoomId.setValue(this.house.categoryRoom.id);
        this.idNha = Number(idSearch);
      });
    });
  }


  edit() {
    const tenNha = this.formGroup.get('tenNha').value;
    const diaChi = this.formGroup.get('diaChi').value;
    const soLuongPhongNgu = this.formGroup.get('soLuongPhongNgu').value;
    const soLuongPhongTam = this.formGroup.get('soLuongPhongTam').value;
    const moTaChung = this.formGroup.get('moTaChung').value;
    const giaTienTheoDem = this.formGroup.get('giaTienTheoDem').value;
    const trangThai = this.formGroup.get('trangThai').value;
    const categoryHouseId = this.formGroup.get('categoryHouseId').value;
    const categoryRoomId = this.formGroup.get('categoryRoomId').value;
    console.log(this.arrayPicture);
    this.componentsService.editHouse(tenNha, diaChi,
      soLuongPhongNgu, soLuongPhongTam, moTaChung, giaTienTheoDem, trangThai, this.idNha,
      categoryHouseId, categoryRoomId, this.arrayPicture).subscribe(result => {
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Sửa thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Sửa thất bại!';
      this.formGroup.reset();
    });
  }

  uploadFile(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.myItems.push(files[i]);
    }
    this.uploadAll();
  }

  uploadAll() {
    this.isLoading = true;
    Promise.all(
      this.myItems.map(file => this.putStorageItem(file))
    )
      .then((url) => {
        console.log(`All success`, url);
        let puctureAdd: Picture;
        for (let i = 0; i < url.length; i++) {
          puctureAdd = {idAnh: null, tenAnh: url[i].tenAnh};
          this.arrayPicture.push(puctureAdd);
        }
        console.log(this.arrayPicture);
        this.isDone = true;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
        this.isLoading = false;
        this.isDone = false;
      });
  }

  putStorageItem(file): Promise<Picture> {
    // the return value will be a Promise
    const metadata = {
      contentType: 'image/jpeg',
    };
    console.log(file);
    return new Promise<Picture>((resolve, reject) => {
      firebase.storage().ref('img/' + Date.now()).put(file, metadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            const picture = {tenAnh: downloadURL};
            resolve(picture);
          });
        })
        .catch(error => reject(error));
    });
  }

  pushDeleteImage(index: number) {
    let picture1: Picture[];
    picture1 = this.house.picture.splice(index, 1);
    for (let i = 0; i < picture1.length; i++) {
      this.arrayPicture.push(picture1[i]);
    }
    console.log(this.arrayPicture);
  }

  onClick(){
    myTest();
  }
}





