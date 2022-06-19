import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private _renderer2: Renderer2,@Inject(DOCUMENT) private _document: Document) {

  }

  ngOnInit(): void {
    let script = this._renderer2.createElement('script');
    script.src = `//code.tidio.co/w1tmmcitbsntvblwkkkjd5mll2rdcixz.js`
    script.async = true;

    this._renderer2.appendChild(this._document.body, script);
 }

}
