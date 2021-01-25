import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-read',
  templateUrl: 'read.page.html',
  styleUrls: ['read.page.scss'],
})
export class ReadPage {

  name;
  verses;
  lastChapter;
  chapter;
  showChap;
  numChapter;
  tam;
  book;
  books;
  version;
  versions;
  showVersions;
  number;

  constructor(private app:AppComponent){}

  async ionViewWillEnter(){
    this.numChapter = new Array();
    this.showChap = false;
    this.tam = this.tam == undefined ? 2 : this.tam;
    this.books = this.app.books;
    this.showVersions = false;
    this.number = 1;
    this.loadVersions();
  }
  
  async loadText(number = 1,book = 'gn', version = 'acf'){
    this.showChap = this.showChap ? false : this.showChap;
    this.numChapter = new Array();
    this.lastChapter = number;
    if (book.length > 2){
      book = this.books.find(bk => bk.name == book).abbrev.pt;
    }
    if (version.length > 3){
      version = version.substr(0,3);
    }
    let url = `https://www.abibliadigital.com.br/api/verses/${version.toLocaleLowerCase()}/${book}/${number}`;
    let url2 = `https://www.abibliadigital.com.br/api/books/${book}`;
    let auth = { headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBKYW4gMjAgMjAyMSAyMTozMTowNSBHTVQrMDAwMC5yb2JzbGpAZ21haWwuY29tIiwiaWF0IjoxNjExMTc4MjY1fQ.5zfqqzFaHAoS-jpWyjGb0k8EsmpBR75Wb_sZ_PMfM2A'}};
    let response = await fetch(url2,auth);
    Promise.resolve(response.json())
      .then((res:any) => {
        for (let i = 1; i <= res.chapters; i++){
          this.numChapter.push(i);  
        }
      });
    let response2 = await fetch(url,auth);
    Promise.resolve(response2.json())
      .then((res:any) => {
        this.verses = res.verses;
        this.chapter = res.chapter.number.toString();
      });
  }

  async page(next: boolean){
    if (next){
      this.number = +this.lastChapter+1;
      this.loadText(this.number);
    } else {
      if (this.lastChapter > 1){
        this.number = +this.lastChapter-1;
        this.loadText(this.number);
      }
    }
  }

  showChapter(){
    this.showChap = this.showChap ? false : true;
  }

  fontSize(event){
    this.tam = event.target.value;
    let el = document.getElementsByTagName('ion-text');
    let arrEl = [].slice.call(el);
    if (this.tam == 1){
      arrEl.forEach(element => {
        element.style.fontSize = "small";
      }); 
    } else if (this.tam == 2){
      arrEl.forEach(element => {
        element.style.fontSize = "medium";
      }); 
    } else {
      arrEl.forEach(element => {
        element.style.fontSize = "large";
      }); 
    }
  }

  verseClass(){
    let el = document.getElementsByTagName('ion-text');
    let arrEl = [].slice.call(el);
    if (this.tam == 1){
      arrEl.forEach(element => {
        element.style.fontSize = "small";
      }); 
    } else if (this.tam == 2){
      arrEl.forEach(element => {
        element.style.fontSize = "medium";
      }); 
    } else {
      arrEl.forEach(element => {
        element.style.fontSize = "large";
      }); 
    }
  }

  async loadBooks(){
    let url = 'https://www.abibliadigital.com.br/api/books';
    let auth = { headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBKYW4gMjAgMjAyMSAyMTozMTowNSBHTVQrMDAwMC5yb2JzbGpAZ21haWwuY29tIiwiaWF0IjoxNjExMTc4MjY1fQ.5zfqqzFaHAoS-jpWyjGb0k8EsmpBR75Wb_sZ_PMfM2A'}};
    let response = await fetch(url,auth);
    Promise.resolve(response.json())
      .then((res:any) => {
        this.books = res;
        this.book = this.books[0];
        this.name = this.books[0].name;
        this.loadText(1);
      });
  }

  async loadVersions(){
    let url = 'https://www.abibliadigital.com.br/api/versions';
    let auth = { headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBKYW4gMjAgMjAyMSAyMTozMTowNSBHTVQrMDAwMC5yb2JzbGpAZ21haWwuY29tIiwiaWF0IjoxNjExMTc4MjY1fQ.5zfqqzFaHAoS-jpWyjGb0k8EsmpBR75Wb_sZ_PMfM2A'}};
    let response = await fetch(url,auth);
    Promise.resolve(response.json())
      .then((res:any) => {
        this.versions = res.filter(pos => pos.version == 'acf' || pos.version == 'nvi');
        this.version = this.version == undefined ? res[0].version.toLocaleUpperCase() : this.version;
        this.loadBooks();
      });
  }

  showVersion(){
    this.showVersions = this.showVersions ? false : true;
  }

  versionVal(version){
    if (version.toLocaleUpperCase() == this.version){
      return 'versionsEl';
    } else {
      return 'versions';
    }
  }

  selectVersion(version){
    this.version = version.toLocaleUpperCase();
  }

}
