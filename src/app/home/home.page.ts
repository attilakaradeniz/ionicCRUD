import { Component, ViewChild, OnInit } from '@angular/core';

import { Item, StorageService } from '../services/storage.service';
import { Platform, ToastController } from '@ionic/angular';
// DATA HTTP
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';
import { map } from 'rxjs/operators';
//import { UserData } from './user-data';
//import { HttpClient, Headers, RequestOptions } from '@angular/common/http';
 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// imp
export class HomePage implements OnInit {


  items: Item[] = [];

  newItem: Item = <Item>{};

 // @ViewChild('mylist')mylist: List;

//  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, public httpClient: HttpClient) {
  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
        this.loadItems();
    });
  }
  
  // on init
  ngOnInit() {}

  // 
  // sendPostRequest() {
  //     let headers = Headers();
  //     headers.append("Accept", 'application/json');
  //     headers.append('Content-Type', 'application/json');
  //     const requestOptions = new RequestOptions({ headers : headers});
  // }
  



  // CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
        let test = item;
        console.log('TEST', test);
        this.newItem = <Item>{};
        this.showToast('Item added!')
        this.loadItems(); // Or add it to the array directly
        console.log(this.newItem);
        console.log(this.items);
    });

  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
        this.items = items;
    });
  }

    // UPDATE
    updateItem(item: Item) {
      item.title = `UPDATED: ${item.title}`;
      item.modified = Date.now();
  
      this.storageService.updateItem(item).then(item => {
        this.showToast('Item updated!');
      });
    }

    // DELETE
    deleteItem(item: Item) {
        this.storageService.deleteItem(item.id).then(item => {
          this.showToast('Item removed!');
          //this.mylist.closeSlidindItems(); // Fix or sliding is stuck afterwards
          this.loadItems(); // Or splice it from the array directly
        });
    }


    // Helper
    async showToast(msg) {
      const toast = await this.toastController.create({
        message : msg,
        duration: 2000
      });
      toast.present();
    }


  


}
