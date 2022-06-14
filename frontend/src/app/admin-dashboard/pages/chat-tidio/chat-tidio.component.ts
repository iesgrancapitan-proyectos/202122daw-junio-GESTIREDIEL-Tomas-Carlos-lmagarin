import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-tidio',
  templateUrl: './chat-tidio.component.html',
  styleUrls: ['./chat-tidio.component.css']
})
export class ChatTidioComponent implements OnInit {
  url:string='https://www.tidio.com/panel/conversations'
  iFrameUrl!: SafeResourceUrl;
  displayFrame:boolean = true;

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
