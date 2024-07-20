import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { finalize, Observable, take } from "rxjs";
import { ConfirmDialogComponent, NotifyDialogComponent } from "../components";

@Injectable()
export class DialogService {
  private active = false;
  constructor(
    private dialog: MatDialog
  ) { }
  
  notify(title: string, message: string): Observable<void> { 
    const ref = this.dialog.open(NotifyDialogComponent, {
      data: { title, message },
      autoFocus: false,
      maxWidth: '50vw'
    });

    return ref.afterClosed();
  }

  error(title: string, message: string): Observable<void> | undefined { 
    if (this.active) return;

    this.active = true;
    const ref = this.dialog.open(NotifyDialogComponent, {
      data: { title, message },
      autoFocus: false,
      maxWidth: '50vw'
    });

    ref.afterClosed()
      .pipe(
        take(1),
        finalize(() => this.active = false)
      )
      .subscribe();
    
    return ref.afterClosed();
  }

  confirm(title: string, message: string, job$: Observable<any>): Observable<boolean> { 
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message, job$ },
      autoFocus: false
    });

    return ref.afterClosed();
  }
}