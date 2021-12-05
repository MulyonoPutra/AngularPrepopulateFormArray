import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  capabilityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.http.get('/assets/data.json')
      .subscribe((data: any[]) => {
        this.capabilityForm = this.fb.group({
          capabilities: this.fb.array(data.map(datum => this.generateDatumFormGroup(datum)))
        });
      });
  }

  enableSection(index, disabled) {
    const capabilityFormGroup = (<FormArray>this.capabilityForm.get('capabilities')).at(index);
    disabled ? capabilityFormGroup.enable() : capabilityFormGroup.disable();
  }

  private generateDatumFormGroup(datum) {
    return this.fb.group({
      capability: this.fb.control({ value: datum.Capability, disabled: true }),
      subCategory: this.fb.control({ value: datum.SubCategory, disabled: true }),
      skill: this.fb.control({ value: datum.Skill, disabled: true }),
      skillId: this.fb.control({ value: datum.SkillID, disabled: true })
    });
  }

}
