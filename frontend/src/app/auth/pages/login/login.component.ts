import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });

  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.formLogin.value);
  }

}
