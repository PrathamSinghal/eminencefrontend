import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private snackBarQueue: { message: string; action: string; duration: number }[] = [];
  private isShowing = false;

  constructor() {}

  // Method to add a message to the queue and attempt to show it
  getMessage(message: string, action: string = 'Close', duration: number = 2000) {
    this.snackBarQueue.push({ message, action, duration }); // Add message to the queue
    this.showNext(); // Attempt to show the next message
  }

  // Private method to display the next message in the queue
  private showNext() {
    if (this.isShowing || this.snackBarQueue.length === 0) {
      return; // Do nothing if a message is already showing or no messages in queue
    }

    this.isShowing = true;
    const { message, action, duration } = this.snackBarQueue.shift()!; // Get the next message

    // Display the snackbar with custom position and duration
    this._snackBar
      .open(message, action, {
        duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
      .afterDismissed()
      .subscribe(() => {
        this.isShowing = false;
        this.showNext(); // Show the next message in the queue
      });
  }

  // Optional method to customize the position
  // setPosition(horizontal: MatSnackBarHorizontalPosition, vertical: MatSnackBarVerticalPosition) {
  //   this.horizontalPosition = horizontal;
  //   this.verticalPosition = vertical;
  // }
}
