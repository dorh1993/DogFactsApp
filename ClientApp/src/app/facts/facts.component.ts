import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactsService } from './facts.service';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss']
})
export class FactsComponent implements OnInit {
  public facts: any= [];
  public loading: boolean = false;
  private countFacts: number = 20;
  public pageState: string = '';
  public title: string = '';
  public inputLabel: string = 'Enter A New Fact';
  public inputPlaceHolder: string = 'Dogs Are...';
  constructor(private activateRoute: ActivatedRoute, private factsService: FactsService) {}

  ngOnInit(){
    this.pageState = this.activateRoute.snapshot.data.kind;
    this.getFacts(this.pageState);
    this.title = this.activateRoute.snapshot.data.title;
  }

  public getFacts(path: any) {
    this.loading = true;
    this.factsService.getFacts$(path, this.countFacts).subscribe(res => {
      this.facts = res;
      this.loading = false;
    });
  }

  public saveForm($event: any) {
    let form = $event;
    this.factsService.saveFacts$(form).subscribe(res => res);
  }


}
