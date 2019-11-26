import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { DownloadsService } from './../downloads.service';

@Component({
  selector: 'app-download-upload',
  templateUrl: './download-upload.component.html',
  styleUrls: ['./download-upload.component.css']
})
export class DownloadUploadComponent implements OnInit {

  categories: any[] = [];
  isSelect: boolean = true;
  file: File;
  fileName: string;
  categoryFilter: string;

  constructor(private downloadService: DownloadsService, private httpcli: HttpClient) { }

  inputFile(event){
   
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);

      //this.httpcli.post('http://localhost:8080/files', formData)
      //.subscribe(resposta => console.log("Upload"));      
      console.log("Arquivo upload: "+ this.file.name);
      this.fileName = this.file.name;
    }
  }
 
  filterCategory(event) {
    this.categoryFilter = event;
    console.log("Categoria: " + this.categoryFilter);
  }

  sendFile(){
    this.downloadService.postFile(this.categoryFilter, this.file)
    console.log("Categoria: " + this.categoryFilter + " - Arquivo: " + this.file.name);
  }

  ngOnInit() {
    this.categories = this.downloadService.getDirectoryDownload();
  }

}
