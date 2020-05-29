import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['./asset-select.component.css']
})
export class AssetSelectComponent implements OnInit {

  assets = [];


  private FETCH_MORE_SCROLL_POSITION = 100;
  private PAGE_SIZE = 10;
  private INITIAL_PAGE_INDEX = 1;
  private CURRENT_PAGE;
  private SEARCH_STRING = '';

  @ViewChild('assetSelect') selectElem: MatSelect;
  selectedValue = 'Search';

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.CURRENT_PAGE = this.INITIAL_PAGE_INDEX;
    this.fetchResults();

  }

  registerPanelScrollEvent() {
    const panel = this.selectElem.panel.nativeElement;
    panel.addEventListener('scroll', event => this.loadAllOnScroll(event));
  }

  loadAllOnScroll(event) {
    if (event.target.scrollTop > this.FETCH_MORE_SCROLL_POSITION) {
      this.CURRENT_PAGE = this.CURRENT_PAGE + 1;
      this.FETCH_MORE_SCROLL_POSITION = this.FETCH_MORE_SCROLL_POSITION + 100;
      this.fetchResults(this.CURRENT_PAGE, this.PAGE_SIZE, this.SEARCH_STRING);
    }
  }

  fetchResults(pageIndex?, pageSize?, searchString?) {
    if (!pageIndex && !pageSize && !searchString) {
      const url = `http://localhost:3000/names/${this.INITIAL_PAGE_INDEX}&${this.PAGE_SIZE}&`;
      this.serverService.getNames(url).subscribe(response => {
        this.assets = response.names;
      }, error => (error));
    } else {
      const params = { pageIndex, pageSize, searchString };
      const url = `http://localhost:3000/names`;
      this.serverService.getNames(url, params).subscribe(response => response.names.forEach(name => {
        this.assets.push(name);
      }), error => (error));
    }
  }

  reset() {
    this.assets = [];
  }

  search(event) {
    this.SEARCH_STRING = event;
    this.CURRENT_PAGE = 1;
    this.FETCH_MORE_SCROLL_POSITION = 100;
    this.assets = [];
    this.fetchResults(this.CURRENT_PAGE, this.PAGE_SIZE, this.SEARCH_STRING);
  }

  selectValue(event) {
    this.selectedValue = event;
    this.SEARCH_STRING = event;
  }

}
