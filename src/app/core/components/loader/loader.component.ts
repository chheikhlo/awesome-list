import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'al-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading$!: Observable<boolean>;
 
  constructor(private loaderService: LoaderService) { }
  
  ngOnInit() {
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
