import { Component, NgModule, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.scss']
})
export class RegiaoComponent implements OnInit {
  displayedColumns: string[] = ['stateOptions'];
  dataSource: MatTableDataSource<any>;
  regionArray = [{regionName: 'São Paulo'}];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api : ApiService) { 
  }

  ngOnInit() {
    this.getAllRegion()
  }

  getAllRegion() {
    this.api.getRegion()
    .subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("erro quando carregava")
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form)
    this.regionArray.push({
      regionName:form.controls['region'].value
    })
    form.reset()
  }

  onCancel(form: NgForm) {
    form.reset()
  }

  onDelete(index: number) {
    console.log(index);

    this.regionArray.splice(index, 1);
  }
}
