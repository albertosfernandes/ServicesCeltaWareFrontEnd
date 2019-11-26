import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  private filesDownload: any[] = [
    {Id: 1, Name: "arquivo1.zip", Date: "05/01/2019", Size: 200, },
    {Id: 2, Name: "arquivo2.zip", Date: "03/01/2019", Size: 3000, },
    {Id: 3, Name: "arquivo3.zip", Date: "31/12/2019", Size: 14000, },
    {Id: 4, Name: "arquivo4.zip", Date: "20/12/2019", Size: 100, }
  ]

  private filesDownloadBS: any[] = [
    {Id: 1, Name: "arquivoBS1.zip", Date: "05/01/2019", Size: 200, },
    {Id: 2, Name: "arquivoBS2.zip", Date: "03/01/2019", Size: 3000, },
    {Id: 3, Name: "arquivoBS3.zip", Date: "31/12/2019", Size: 14000, },
    {Id: 4, Name: "arquivoBS4.zip", Date: "20/12/2019", Size: 100, }
  ]

  private filesDownloadTEF: any[] = [
    {Id: 1, Name: "arquivotTEF1.zip", Date: "05/01/2019", Size: 200, },
    {Id: 2, Name: "arquivotTEF2.zip", Date: "03/01/2019", Size: 3000, },
    {Id: 3, Name: "arquivotTEF3.zip", Date: "31/12/2019", Size: 14000, },
    {Id: 4, Name: "arquivotTEF4.zip", Date: "20/12/2019", Size: 100, }
  ]

  private filesDownloadPDV: any[] = [
    {Id: 1, Name: "arquivoPDV1.zip", Date: "05/01/2019", Size: 200, },
    {Id: 2, Name: "arquivoPDV2.zip", Date: "03/01/2019", Size: 3000, },
    {Id: 3, Name: "arquivoPDV3.zip", Date: "31/12/2019", Size: 14000, },
    {Id: 4, Name: "arquivoPDV4.zip", Date: "20/12/2019", Size: 100, }
  ]

  private directoryDownload: any[] = [
    {Id: 1, Name: "CeltaBS ERP"},
    {Id: 2, Name: "CeltaBS PDV"},
    {Id: 3, Name: "Impressoras"},
    {Id: 4, Name: "TEF"},
    {Id: 5, Name: "Fiscal SAT"},
    {Id: 6, Name: "Utilitários"},
  ]

  getFilesDownload(id: string) {
    if(id == "CeltaBS ERP")
    { return this.filesDownloadBS; }
    if(id == "CeltaBS PDV")
    { return this.filesDownloadPDV; }
    if(id == "TEF")
    { return this.filesDownloadTEF; }
    else{ return this.filesDownload;  }
    
  }

  getDirectoryDownload() {
    return this.directoryDownload;
  }

  postFile(id: string, fileName: File) {
    //this.httpcli.post('http://localhost:8080/files', formData)
    //.subscribe(resposta => console.log("Upload"));
    console.log("Service: " + id + " - " +  fileName.name)
  }

  constructor() { }
}
