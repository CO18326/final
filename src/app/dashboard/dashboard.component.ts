import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../data/api.service';
import { data } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup
  user_data :data=new data;
  table_data:any;
  constructor(private formBuilder: FormBuilder,private api:ApiService,private route:Router) { }

  ngOnInit(): void {
  if(! localStorage.getItem('logged_in')){
    this.route.navigate(['/login'])
  }
  this.formValue=this.formBuilder.group(
    {
      name:[''],
      email:[''],
      mob:[''],
      address:['']
    }
  )
    this.get_data();
}

  addData(){
    this.user_data.name=this.formValue.value.name;
    this.user_data.email=this.formValue.value.email;
    this.user_data.mob=this.formValue.value.mob;
    this.user_data.address=this.formValue.value.address;

    this.api.postdata(this.user_data).subscribe(res=>{
        //alert("success !");
        this.formValue.reset()
        this.get_data();
    },
    err=>{
      console.log(err);
    })
  }

  get_data(){
    this.api.getdata().subscribe(res=>{
      this.table_data=res;
    },
    err=>{
    console.log(err)
    }
    )
  }

  deleteData(data:any){
    this.api.deletedata(data.id).subscribe(res=>{
      console.log(res);
      this.get_data();
    })
  }

  setEditValue(data:any){
    this.user_data.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mob'].setValue(data.mob);
    this.formValue.controls['address'].setValue(data.address);
  }

  updateData(){
    this.user_data.name=this.formValue.value.name;
    this.user_data.email=this.formValue.value.email;
    this.user_data.mob=this.formValue.value.mob;
    this.user_data.address=this.formValue.value.address;
    this.api.updatedata(this.user_data,this.user_data.id).subscribe(res=>{
      this.formValue.reset()
      this.get_data();
    })
  }

}
