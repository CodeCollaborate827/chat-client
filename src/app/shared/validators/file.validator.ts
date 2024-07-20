import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Attachment } from "../models";

export const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;

export function isFileExtensionValid(files: File[], validTypes: string[]): boolean {
  return files.every((file: File) => validTypes.includes(file.type));
}

export function isExtensionValidByName(files: File[], validExtensions: string[]): boolean { 
  return files.every((file: File) => { 
    const name = file.name.split('.').pop()?.toLowerCase();
    return !!name && validExtensions.includes(name);
  });
}

export function isFileSizeValid(file: File, maxSize: number = DEFAULT_MAX_FILE_SIZE): boolean { 
  return file.size <= maxSize;
}

export function emptyFileValidator(files: File[]): boolean { 
  return files.every(file => !!file.size);
}

export function fileValidator(control: AbstractControl): ValidationErrors | null {
  const files: Attachment[] = control.value ?? [];
  if (files.some((el) => el.error)) { 
    return { invalidFile: null }
  }

  return null;
}