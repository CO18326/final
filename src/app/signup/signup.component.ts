import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form_value !:FormGroup
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private rout:Router) { }

  ngOnInit(): void {
  this.form_value=this.formBuilder.group({
    email:[''],
    passwd:['']
  })
  }
  addUser(){
    this.http.post<any>("https://fake-server-json-jw.herokuapp.com/users",this.form_value.value).subscribe(res=>{
      
    this.form_value.reset();
    alert("registerd !");
    this.rout.navigate(['/login']);
    })
  }
}
