import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorService } from '../../../../../../../../shared/src/lib/services/form-error-service';
import { MasterUserService } from '../../../services/master-user-service';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterUserModalMode } from '../../../models/modal-mode.type';
import { UserData } from '../../../models/user.model';
import { formatName } from '../../../../../../../../shared/src/lib/utils/common.utilities';

@Component({
  selector: 'app-user-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.scss',
})
export class UserModal {

  private fb = inject(FormBuilder);
  private formError = inject(FormErrorService);
  private userService = inject(MasterUserService);
  private dialogService = inject(DialogService);
  input: any = inject(MAT_DIALOG_DATA);

  mode!: MasterUserModalMode;
  modeName!: string;
  data!: UserData;
  userRoles!: any;
  userForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    roleId: [0, [Validators.required]],
    roleName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });


  constructor(
    private dialogRef: MatDialogRef<UserModal>
  ) { }

  ngOnInit() {
    this.initializeData();
    this.applyModeConfiguration();
  }

  private initializeData() {
    this.mode = this.input.mode;
    this.modeName = formatName(this.mode);
    this.data = this.input.data!;
  }



  private applyModeConfiguration() {
    if (!(this.mode === 'view')) {
      this.userRoles = this.input.userRoles || [];
    }

    const configMap: Record<MasterUserModalMode, () => void> = {
      'edit': () => this.patchUser(),
      'view': () => { this.patchUser(); this.userForm.disable(); },
      'add': () => { }
    };

    configMap[this.mode]?.();
  }


  private patchUser() {
    this.userForm.patchValue({
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      password: this.data.password,
      roleId: this.data.roleId,
      roleName: this.data.roleName,
    });
  }

  private disableControls(fields: string[]) {
    fields.forEach(f => this.userForm.get(f)?.disable());
  }



  // ========================= // EVENTS // ========================= 
  onRoleChange(roleId: number) {
    const selectedRole = this.userRoles.find((c: any) => c.id === roleId);
    this.userForm.patchValue({ roleName: selectedRole?.role });
  }

  submit() {

    const actionMap: Record<MasterUserModalMode, () => void> = {
      'add': () => this.handleAddUser(),

      'edit': () => this.handleEditUser(),

      'view': () => { }
    };

    actionMap[this.mode]?.();
  }



  private handleEditUser() {
    const value = this.userForm.getRawValue();
    const userPayload = {
      id: value.id,
      name: value.name,
      email: value.email,
      password: value.password,
      roleId: value.roleId,
    }
    this.userService.editUser(userPayload)
      .subscribe((res) => {
        this.dialogService.success("User Edited successfully!");
      });
  }

  private handleAddUser() {
    const value = this.userForm.getRawValue();
    const userPayload = {
      name: value.name,
      email: value.email,
      password: value.password,
      roleId: value.roleId,
    }
    this.userService.createUser(userPayload)
      .subscribe((res) => {
        this.dialogService.success("User Created successfully!");
      });
  }




  closeModal() { this.close(); }


  private close(status?: boolean) { this.dialogRef.close(status); }





  getError(control: any, fieldName: string) { return this.formError.getErrorMessage(control!, fieldName); }

  isFormInvalid() { return this.formError.isFormInvalid(this.userForm); }

  isControlInvalid(control: AbstractControl | null) { return this.formError.isControlInvalid(control); }

}
