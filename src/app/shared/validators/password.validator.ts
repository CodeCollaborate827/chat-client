import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;
  
  if (!password) {
    return null; 
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const valid = hasUpperCase && hasSpecialCharacter && hasNumber;

  if (!valid) {
    return {
      password: {
        hasUpperCase,
        hasNumber,
        hasSpecialCharacter,
      }
    };
  }

  return null;
}

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value as string ?? control.parent?.get('newPassword')?.value as string;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
        return { confirmPassword: true }
    }

    return null;
}