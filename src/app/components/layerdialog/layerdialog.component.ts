import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ViewerService } from 'src/app/services/viewer.service';

@Component({
  selector: 'app-layerdialog',
  templateUrl: './layerdialog.component.html',
  styleUrls: ['./layerdialog.component.css']
})
export class LayerdialogComponent implements OnInit {

  public layers: Layer[];
  
  layerForm: FormGroup;
  description: string;

  constructor(
    private viewerService: ViewerService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LayerdialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.title;
  }

  ngOnInit() {
    this.layers = [
      {id: 1, name: "United Stats Pop", checked: this.viewerService.viewer.imageryLayers.get(1).show },
      {id: 2, name: "New York Streets", checked: this.viewerService.viewer.imageryLayers.get(2).show }
    ]
  }

  close() {
    for (let layer of this.layers) {
      this.viewerService.viewer.imageryLayers.get(layer.id).show = layer.checked;
    }
    this.dialogRef.close();
  }

}

interface Layer {
  id: number;
  name: String;
  checked: boolean;
}




