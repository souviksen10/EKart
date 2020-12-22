import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];  
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[]=[];
  itemCount;
  constructor(private productsService: ProductService) {
    this.subscription = productsService.getAll()
    .pipe(
      map(products => {
        return products.map(product => ({key: product.payload.key,...product.payload.val()})
        )
      })).subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });

      
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initializeTable(products){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset:0, limit:10}).then(p => this.items = p);
    this.tableResource.count().then(c => this.itemCount = c);
  }

  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params).then(p => this.items = p);
  }

   filter(query){
      let filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) 
      : this.products;

      this.initializeTable(filteredProducts);
   }

  ngOnInit(): void {
  }

}
