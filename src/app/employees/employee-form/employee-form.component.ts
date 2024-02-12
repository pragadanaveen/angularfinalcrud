import { Component } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  submitted: boolean = false;

  constructor(public service: EmployeeService) { }


  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      debugger;
      if (this.service.employeeForm.get('_id')?.value == '')
        this.service.postEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          this.resetForm();
        })
      else
        this.service.putEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          // this.toastr.info('Updated successfully', 'Employee Register')
          this.resetForm();
        })
    }
  }

  resetForm() {
    this.service.employeeForm.reset(new Employee());
    this.submitted = false;
  }
}
