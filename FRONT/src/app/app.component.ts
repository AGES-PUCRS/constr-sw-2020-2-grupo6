import {Component, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

export interface Content {
    aulas: [];
    bibliography: [];
    material: [];
    name: string;
    description: string;
    _id: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
    displayedColumns = ['id', 'name', 'description', 'edit'];
    dataSource: MatTableDataSource<Content>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient, public dialog: MatDialog) {
    }

    openViewDialog(data) {
        this.dialog.open(DialogView, {data});
    }

    openEditDialog(data) {
        this.dialog.open(DialogEdit, {data});
    }

    getInfo(){
        this.http.get<Content>('http://3.128.18.231:5000/content/')
            .subscribe((data: Content[] | any) => {
                console.log(data);
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })

    }


    ngAfterViewInit() {
        this.getInfo();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    handleDelete(id) {
        this.http.delete(`http://3.128.18.231:5000/content/${id}`)
            .subscribe((dataa: Content[] | any) => {
                this.getInfo();
            });
    }

    handleAdd() {
        this.dialog.open(DialogAdd);
    }
}

@Component({
    selector: 'dialog-view',
    templateUrl: 'modalView.html',
})

export class DialogView {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Content) {
    }
}

@Component({
    selector: 'dialog-edit',
    templateUrl: 'modalEdit.html',
})

export class DialogEdit {
    name: string;
    description: string;
    bibliography: [];
    material: [];
    aulas: [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: Content, private http: HttpClient) {
        this.name = data.name;
        this.description = data.description;
        this.bibliography = [];
        for (let b of data.bibliography) {
            // @ts-ignore
            this.bibliography.push([...b]);
        }
        this.material = [];
        for (let b of data.material) {
            // @ts-ignore
            this.material.push([...b]);
        }

        this.aulas = []
        // @ts-ignore
        this.aulas.push([...data.aulas]);
    }

    submit() {
        let body = {
            name: this.name,
            description: this.description,
            bibliography: this.bibliography,
            material: this.material,
            aulas: this.aulas
        };
        this.http.patch(`http://3.128.18.231:5000/content/${this.data._id}`, body)
            .subscribe((dataa: Content[] | any) => {
                this.data.name = this.name;
                this.data.description = this.description;
                this.data.bibliography = this.bibliography;
                this.data.material = this.material;
                this.data.aulas = this.aulas;
            });
    }

    addBibliografia() {
        // @ts-ignore
        this.bibliography.push(['', '']);
        // @ts-ignore
        this.data.bibliography.push(['', '']);

    }

    excluirBibliografia(index) {
        // @ts-ignore
        this.bibliography.splice(index, 1);
        // @ts-ignore
        this.data.bibliography.splice(index, 1);
    }

    addMaterial() {
        // @ts-ignore
        this.material.push(['', '']);
        // @ts-ignore
        this.data.material.push(['', '']);

    }

    excluirMaterial(index) {
        // @ts-ignore
        this.material.splice(index, 1);
        // @ts-ignore
        this.data.material.splice(index, 1);
    }

    addAula() {
        // @ts-ignore
        this.aulas.push('');
        // @ts-ignore
        this.data.aulas.push('');

    }

    excluirAula(index) {
        // @ts-ignore
        this.aulas.splice(index, 1);
        // @ts-ignore
        this.data.aulas.splice(index, 1);
    }


}

@Component({
    selector: 'dialog-add',
    templateUrl: 'modalAdd.html',
})

export class DialogAdd {
    name: string;
    description: string;
    bibliography: any[];
    material: any[];
    aulas: any[];

    constructor(private http: HttpClient) {
        this.name = '';
        this.description = '';
        this.bibliography = [['', ' ']];
        this.material = [['', '']];
        this.aulas = [''];
    }

    submit() {
        let body = {
            name: this.name,
            description: this.description,
            bibliography: this.bibliography,
            material: this.material,
            aulas: this.aulas
        };
        this.http.post(`http://3.128.18.231:5000/content`, body)
            .subscribe((dataa: Content[] | any) => {
                this.name = '';
                this.description = '';
                this.bibliography = [];
                this.material = [];
                this.aulas = [];
                window.location.reload();
            });
    }

    addBibliografia() {
        // @ts-ignore
        this.bibliography.push(['', '']);

    }

    excluirBibliografia(index) {
        // @ts-ignore
        this.bibliography.splice(index, 1);
    }

    addMaterial() {
        // @ts-ignore
        this.material.push(['', '']);
    }

    excluirMaterial(index) {
        // @ts-ignore
        this.material.splice(index, 1);
    }

    addAula() {
        // @ts-ignore
        this.aulas.push('');

    }

    excluirAula(index) {
        // @ts-ignore
        this.aulas.splice(index, 1);
    }
}
