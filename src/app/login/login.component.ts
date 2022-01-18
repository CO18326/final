import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form_value !:FormGroup;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
  this.form_value=this.formbuilder.group({
    email:[''],
    passwd:['']
  })
  }

  login(){
    this.http.get<any>("https://fake-server-json-jw.herokuapp.com/users").subscribe(res=>{
      var isuser= res.find((a:any)=>{
        return a.email==this.form_value.value.email && a.passwd==this.form_value.value.passwd
      })

      if(isuser){
        this.form_value.reset();
        localStorage.setItem('logged_in','true');
        this.route.navigate(['/dashboard']);
        
      }
      else{
        alert("incorrect email or password");
        this.form_value.reset();
      }
    })
  }

}
