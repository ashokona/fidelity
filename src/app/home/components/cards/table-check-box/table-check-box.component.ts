import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-table-check-box',
  templateUrl: './table-check-box.component.html',
  styleUrls: ['./table-check-box.component.css']
})
export class TableCheckBoxComponent implements ViewCell, OnInit {
    @Output() selectedList:any[] = [];
    renderValue: string;
  
    @Input() value: string | number;
    @Input() rowData: any;
  
    @Output() save: EventEmitter<any> = new EventEmitter();
  
    ngOnInit() {
      this.renderValue = this.value.toString().toUpperCase();
    }
  
    onClick() {
      this.save.emit(this.rowData);
      this.selectedList.push(this.rowData.idCard)
    }
}
