import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Fridge } from 'src/app/objects/fridge';
import { Item } from 'src/app/objects/item';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() itemChild: Item;
  @Input() fridgeChild: Fridge;
  errorMessage: any;
  item: Item;
  actual: number;
  target: number;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private restService: RestService) {}
  //Add user form actions
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      alert('Great!!');
    }
  }

  ngOnInit() {}

  changeSingleItem(form: NgForm) {
    const fridgeId = this.fridgeChild.id;
    const itemId = this.itemChild.id;

    const newFormData = {
      id: itemId,
      actual: this.actual,
      target: this.target,
    };

    console.log(newFormData);

    this.restService
      .changeSingleItemService(fridgeId, itemId, newFormData)
      .subscribe(
        (data) => {
          (this.item = data),
            console.log('return item: ' + JSON.stringify(this.item)),
            alert('Change item success'),
            form.resetForm();

        },
        (error) => {
          console.error('error caught in component');
          this.errorMessage = error;
          alert(this.errorMessage);
          throw error;
        }
      );
  }
}
