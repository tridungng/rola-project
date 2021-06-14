import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Item } from 'src/app/objects/item';
import { Input } from '@angular/core';
import { Fridge } from 'src/app/objects/fridge';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() itemChild: Item;
  @Input() fridgeChild: Fridge;
  errorMessage: any;
  item: Item;

  registerForm: FormGroup;
  submitted = false;

  constructor(private restService: RestService, private formBuilder: FormBuilder){}
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
    if(this.submitted)
    {
      alert("Great!!");
    }
   
  }
    
  ngOnInit() {
  }

  changeSingleItem(form: NgForm) {
    const fridgeId = this.fridgeChild.id;
    const itemId = this.itemChild.id;

    const newFormData = { id: itemId, actual: form.value.actual, target: form.value.target };
    
    console.log(newFormData);

    this.restService.changeSingleItemService(fridgeId, itemId, newFormData).subscribe(
      (data) => { 
        this.item = data,
        console.log("return item: " + JSON.stringify(this.item)),
        alert("Change item success"),
        form.resetForm()
      }, (error) => {
          console.error("error caught in component")
          this.errorMessage = error;
          alert(this.errorMessage);
          throw error;
        }
    );  
  }
}
