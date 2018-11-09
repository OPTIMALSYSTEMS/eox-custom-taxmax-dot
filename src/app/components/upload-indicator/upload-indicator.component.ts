import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-upload-indicator',
  templateUrl: './upload-indicator.component.html',
  styleUrls: ['./upload-indicator.component.scss']
})
export class UploadIndicatorComponent {

  @Input() state: string;

}
