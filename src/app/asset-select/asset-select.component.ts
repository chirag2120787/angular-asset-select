import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['./asset-select.component.css']
})
export class AssetSelectComponent implements OnInit {

  assets: any[] = [];
  private currentPage: number;
  private searchString = '';
  private fetchMoreScrollPosition = 100;


  private readonly PAGE_SIZE = 10;
  private readonly INITIAL_PAGE_INDEX = 1;

  @ViewChild('assetSelect') selectElem: MatSelect;
  selectedValue = 'Search';

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.currentPage = this.INITIAL_PAGE_INDEX;
    this.fetchResults();

  }

  registerPanelScrollEvent() {
    const panel = this.selectElem.panel.nativeElement;
    panel.addEventListener('scroll', event => this.fetchMoreOnScroll(event));
  }

  private fetchMoreOnScroll(selectElement) {
    if (selectElement?.target?.scrollTop > this.fetchMoreScrollPosition) {
      this.currentPage = this.currentPage + 1;
      this.fetchMoreScrollPosition = this.fetchMoreScrollPosition + 100;
      this.fetchResults(this.currentPage, this.PAGE_SIZE, this.searchString);
    }
  }

  private fetchResults(pageIndex?: number, pageSize?: number, searchString?: string) {
    if (!pageIndex && !pageSize && !searchString) {
      this.serverService.getNames().subscribe(response => {
        this.assets = response.names;
      }, error => (error));
    } else {
      const params = { pageIndex, pageSize, searchString };
      this.serverService.getNames(params).subscribe(response => response.names.forEach(name => {
        this.assets.push(name);
      }), error => (error));
    }
  }

  onSearchAssets(inputString) {
    this.searchString = inputString;
    this.currentPage = 1;
    this.fetchMoreScrollPosition = 100;
    this.assets.length = 0;
    this.fetchResults(this.currentPage, this.PAGE_SIZE, this.searchString);
  }

  onSelectValue(valueSelected) {
    this.selectedValue = valueSelected;
  }

}
