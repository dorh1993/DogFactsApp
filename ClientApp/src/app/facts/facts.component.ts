import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactsService } from './facts.service';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss']
})
export class FactsComponent implements OnInit {
  public facts: any = [];
  public loading: boolean = false;
  public title: string = '';
  public inputLabel: string = 'Enter A New Fact';
  public inputPlaceHolder: string = 'Dogs Are...';
  constructor(private activateRoute: ActivatedRoute, private factsService: FactsService) {}

  ngOnInit(){
    let pageState = this.activateRoute.snapshot.data.kind;
    this.getFacts(pageState);
    this.title = this.activateRoute.snapshot.data.title;
  }

  public getFacts(path: any) {
    this.loading = true;
    this.factsService.getFacts$(path).subscribe(res => {
      this.facts = res;
      this.loading = false;
      console.log('res', res);
    });
  }

  public saveForm($event: any) {
    let form = $event;
    this.factsService.saveFacts$(form).subscribe(res => {
      console.log('res', res);
    });
  }

}
