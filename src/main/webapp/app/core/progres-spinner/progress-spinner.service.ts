import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  private spinnerTopRef = this.cdkSpinnerCreate();

  constructor(private overlay: Overlay) {}

  private cdkSpinnerCreate(): any {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'light-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  public showSpinner(): void {
    this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
  }

  public stopSpinner(): void {
    this.spinnerTopRef.detach();
  }
}
