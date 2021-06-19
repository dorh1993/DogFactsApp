import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  public inputOpened: boolean = false;
  public value: string = '';
  public iconType:string = 'add_circle';
  @Input() label : string = '';
  @Input() placeholder : string = '';
  @Output() newFormEvent = new EventEmitter<object>();
  constructor() { }

  ngOnInit(): void {
  }


public controlIconForm() {
if (this.iconType == 'add_circle') {
  this.inputOpened = !this.inputOpened ? true :  false;
} else {
  this.prepareAndSend(this.value);
  }
}

public checkValueExist(value: string){
  this.value = value;
  if(this.value != '') {
    this.iconType = 'send';
  }else{
    this.iconType = 'add_circle';
    this.inputOpened = false;
  }
}


public prepareAndSend(value: string){
  let form = { "text": value }
  this.newFormEvent.emit(form);
  this.resetForm();
}

public resetForm(){
  this.value = '';
  this.iconType = 'add_circle';
  this.inputOpened = false;
}

}
