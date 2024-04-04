import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (abstractControl: AbstractControl): ValidationErrors | null => {
  if (!(abstractControl instanceof FormGroup)) return null;

  const password = abstractControl.get('password')?.value;
  const confirmPassword = abstractControl.get('confirmPassword')?.value;
  if (password && confirmPassword && password !== confirmPassword) {
    // Retourne un objet d'erreur si les mots de passe ne correspondent pas
    return { passwordMismatch: true };
  }
  // Retourne null si aucune erreur (les mots de passe correspondent)
  return null;
};
