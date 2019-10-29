import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filterdialog',
  templateUrl: './filterdialog.component.html',
  styleUrls: ['./filterdialog.component.css']
})
export class FilterdialogComponent implements OnInit {
  filterForm: FormGroup;
  description: string;
  speedFilter: number;
  altFilter: number;
 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FilterdialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.title;
    this.speedFilter = data.filter.speed;
    this.altFilter = data.filter.alt;
}


  ngOnInit() {
    this.filterForm = this.fb.group({
      speedFilter: [this.speedFilter, []],
      altFilter: [this.altFilter, []]
    });
  }

  getSpeedFilter() {
    return this.filterForm.get('speedFilter');  
  }

  getAltFilter() {
    return this.filterForm.get('altFilter');
  }

  close() {
    this.dialogRef.close();
  }

  saveFilters() {
    this.dialogRef.close(this.filterForm.value);
  }

}
