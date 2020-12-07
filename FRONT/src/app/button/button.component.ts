import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
    @Input() buttonConfig: any;

    constructor() {
    }

    callParentFunction(): void {
        let {parent, parentFuncion,parentFuncionParam} = this.buttonConfig
        parent[parentFuncion](parentFuncionParam)
    }

    ngOnInit(): void {
    }

}
