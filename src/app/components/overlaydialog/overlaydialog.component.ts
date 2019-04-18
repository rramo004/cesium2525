import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Shape } from 'src/app/classes/shape';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-overlaydialog',
  templateUrl: './overlaydialog.component.html',
  styleUrls: ['./overlaydialog.component.css']
})

export class OverlaydialogComponent {

  formE: FormGroup;
  formR: FormGroup;
  description:string;
  radioChoice: string = 'Ellipse';
  radioOptions: string[] = ['Ellipse', 'Rectangle'];
  name: string;
  type: string;
  color = 'white';

  // Ellipse
  lat: number;
  lon: number;
  minor: number = 300000.0;
  major: number = 300000.0;
  heightE: number;

  // Rectangle
  coord1: number;
  coord2: number;
  coord3: number;
  coord4: number;
  heightR: number;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<OverlaydialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.title;
    }

    ngOnInit() {
            this.formE = this.fb.group({
                type: [this.type, []],
                name: [this.name, [Validators.required]],
                lat: [this.lat, [Validators.required]],
                lon: [this.lon, [Validators.required]],
                minor: [this.minor, [Validators.required]],
                major: [this.major, [Validators.required]],
                heightE: [this.heightE, [Validators.required]],
                color: [this.color, []]
            });
            this.formR = this.fb.group({
                type: [this.type, []],
                name: [this.name, [Validators.required]],
                coord1: [this.coord1, [Validators.required]],
                coord2: [this.coord2, [Validators.required]],
                coord3: [this.coord3, [Validators.required]],
                coord4: [this.coord4, [Validators.required]],
                heightR: [this.heightR, [Validators.required]],
                color: [this.color, []]
            });
    }

    getName() {
        if (this.radioChoice == 'Ellipse')
            return this.formE.get('name');
        else {
            return this.formR.get('name');
        }
    }

    getLat() {
        return this.formE.get('lat');
    }

    getLon() {
        return this.formE.get('lon');
    }

    getMinor() {
        return this.formE.get('minor');
    }

    getMajor() {
        return this.formE.get('major');
    }

    getHeightE() {
        return this.formE.get('heightE');
    }

    getCoord1() {
        return this.formR.get('coord1');
    }

    getCoord2() {
        return this.formR.get('coord2');
    }

    getCoord3() {
        return this.formR.get('coord3');
    }

    getCoord4() {
        return this.formR.get('coord4');
    }

    getHeightR() {
        return this.formR.get('heightR');
    }

    saveEllipse() {
        this.formE.get('type').setValue('Ellipse');
        this.formE.get('color').setValue(this.color);
        this.dialogRef.close(this.formE.value);
    }

    saveRectangle() {
        this.formR.get('type').setValue('Rectangle');
        this.formE.get('color').setValue(this.color);
        this.dialogRef.close(this.formR.value);
    }

    close() {
        this.dialogRef.close();
    }

    isValidEllipse(): boolean {
        let isValid = true;
        if ((this.getName().dirty || this.getName().touched) && this.getName().invalid) {
            if (this.getName().errors.required) 
              isValid = isValid && false;
        }
        else if ((this.getLat().dirty || this.getLat().touched) && this.getLat().invalid) {
            if (this.getLat().errors.required)
                isValid = isValid && false;
        }
        else if ((this.getLon().dirty || this.getLon().touched) && this.getLon().invalid) {
            if (this.getLat().errors.required) 
                isValid = isValid && false;
        }
        else if ((this.getMinor().dirty || this.getMinor().touched) && this.getMinor().invalid) {
            if (this.getMinor().errors.required) 
                isValid = isValid && false;
        }
        else if ((this.getMajor().dirty || this.getMajor().touched) && this.getMajor().invalid) {
            if (this.getMajor().errors.required) 
                isValid = isValid && false;
        }
        else if ((this.getHeightE().dirty || this.getHeightE().touched) && this.getHeightE().invalid) {
            if (this.getHeightE().errors.required) 
                isValid = isValid && false;
        }

        return isValid;
    }

    isValidRectangle(): boolean {
        let isValid = true;
        if ((this.getName().dirty || this.getName().touched) && this.getName().invalid) {
            if (this.getName().errors.required) 
              isValid = isValid && false;
        }
        else if ((this.getCoord1().dirty || this.getCoord1().touched) && this.getCoord1().invalid) {
            if (this.getCoord1().errors.required)
                isValid = isValid && false;
        }
        else if ((this.getCoord2().dirty || this.getCoord2().touched) && this.getCoord2().invalid) {
            if (this.getLat().errors.required) 
                isValid = isValid && false;
        }
        else if ((this.getCoord3().dirty || this.getCoord3().touched) && this.getCoord3().invalid) {
            if (this.getCoord3().errors.required) 
                isValid = isValid && false;
        }
        else if ((this.getCoord4().dirty || this.getCoord4().touched) && this.getCoord4().invalid) {
            if (this.getCoord4().errors.required) 
                isValid = isValid && false;
        }
        else if ((this.getHeightR().dirty || this.getHeightR().touched) && this.getHeightR().invalid) {
            if (this.getHeightR().errors.required) 
                isValid = isValid && false;
        }

        return isValid;
    }




}
