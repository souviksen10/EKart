import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  filteredProducts : Product[] = [];   
  category: string; 
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,private productsService: ProductService,private cartService: ShoppingCartService) { 
    
  } 

  async ngOnInit() {    
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();    
  }

  private populateProducts(){
    this.productsService.getAll()
    .pipe(
      map(products => {
        return products.map(product => ({key: product.payload.key,...product.payload.val()})
        )
      }))
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        }))
          .subscribe(params => {
            this.category = params.get('category');
            this.applyFilter();            
          });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category == this.category) : this.products;
  }

}
