import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../api.service';
import { datamodel } from '../list/models';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  public dataid!: number;
  public cadastro!: datamodel;
  data: undefined | datamodel[];
  constructor(private activatedroute: ActivatedRoute, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']("id");
      // console.log("data id é", this.dataid)
    })
    this.api.fetchdata(this.dataid).subscribe((data: datamodel) => {
      this.cadastro = data;
    })
  }
  update() {
    this.api.updatecadastro(this.cadastro, this.dataid).subscribe((res: datamodel) => {
      this.router.navigate(['/'])
    })
  }

  deletecadastro() {
    this.api.deletecadastro(this.dataid).subscribe((res: datamodel) => {
      this.router.navigate(['/'])
  })
  }
}
