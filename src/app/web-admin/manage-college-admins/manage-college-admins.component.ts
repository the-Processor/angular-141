import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { User } from 'src/app/models/user';
import { ManageCollegeAdminService } from 'src/app/services/manage-college-admin.service';

@Component({
  selector: 'app-manage-college-admins',
  templateUrl: './manage-college-admins.component.html',
  styleUrls: ['./manage-college-admins.component.scss']
})
export class ManageCollegeAdminsComponent implements OnInit {

  form: FormGroup;
  imagePreview: string;

  constructor(private manageCollegeAdminService: ManageCollegeAdminService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      middleName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      // image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/)]}),
      // type: new FormControl(null, {validators: [Validators.required]}),
      building: new FormControl(null, {validators: [Validators.required]}),
      street: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      district: new FormControl(null, {validators: [Validators.required]}),
      pincode: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{6}$/)]}),
      institute: new FormControl(null, {validators: [Validators.required]})
    });
  }

  // , Validators.pattern(/^[1-9][0-9]{3,10}$/g)

  onSubmit(){
    if (!this.form.valid){
      return;
    }
    const name = `${this.form.value.firstName} ${this.form.value.middleName} ${this.form.value.lastName}`;
    const newStaff = new User(
      null,
      this.form.value.email,
      this.form.value.email,
      name,
      'collegeAdmin', // this.form.value.type
      this.form.value.contact,
      {
        building : this.form.value.building,
        street : this.form.value.street,
        city : this.form.value.city,
        district : this.form.value.district,
        pincode : this.form.value.pincode
      },
      this.form.value.institute
    );
    this.manageCollegeAdminService.postCollegeAdmin(newStaff);
    // this.form.reset();
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({image: file});
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onClear(){
    this.form.reset();
  }

}
