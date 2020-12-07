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
        this.buttonConfig.parent[this.buttonConfig.parentFuncion](this.buttonConfig.parentFuncionParam)
    }

    ngOnInit(): void {
    }

}
