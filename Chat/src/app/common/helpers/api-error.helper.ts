import { HttpErrorResponse } from "@angular/common/http";

export const getErrorMessage = (error: HttpErrorResponse): string => { 
  if (!error.error || !error.error.errors) { 
    return error.statusText;
  }

  return '';
}

export const getErrorStatus = (error: HttpErrorResponse): string | number => { 
  if (!error.error || !error.error.errors) { 
    return error.status;
  }

  return '';
}