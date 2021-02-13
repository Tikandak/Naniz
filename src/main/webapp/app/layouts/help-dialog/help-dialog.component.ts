import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'jhi-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent {
  constructor(protected dialogRef: NbDialogRef<HelpDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
