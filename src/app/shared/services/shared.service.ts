import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sessionToken;
  private showSpinnerSubject$: BehaviorSubject<boolean>;
  showSpinner$: Observable<boolean>;
  constructor(private snackBar: MatSnackBar) { 
    this.showSpinnerSubject$ = new BehaviorSubject(false);
    this.showSpinner$ = new Observable();
    this.showSpinnerSubject$.subscribe(
      (value) => {
        // this.showSpinner$ = of(value);
        this.showSpinner$ = this.showSpinnerSubject$.asObservable();
      }
    );
  }
  
  getLoadingStatus(): Observable<boolean>{
  	return this.showSpinnerSubject$.asObservable();
  }
  getSessionToken() {
    if (!this.sessionToken) {
      this.sessionToken = localStorage.getItem('sessionToken');
    }
    const sessionToken = (this.sessionToken) ? 'Bearer ' + this.sessionToken : this.sessionToken;
    return sessionToken;
  }
  showLoading(isShow: boolean) {
    this.showSpinnerSubject$.next(isShow);
  }
  openSnackBar(message: string, action: string, dur: any = 2000, pos: any = 'top') {
    this.snackBar.open(message, action, {
      duration: dur,
      verticalPosition: pos
    });
  }
}
