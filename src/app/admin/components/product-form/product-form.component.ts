import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product : any ={};
  id;  

  constructor(private router:Router,private route: ActivatedRoute,
    categoryService: CategoryService,private productService: ProductService) {
    this.categories$ = categoryService.getAll()
    .pipe(
      map(categories => {
        return categories.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    ); 

    this.id = route.snapshot.paramMap.get('id');
    if(this.id)
      productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);    
   }
   

  ngOnInit(): void {    
  }
  save(product){
    if(this.id)
      this.productService.update(this.id, product);
    else  
      this.productService.create(product);

    this.router.navigate(['admin/products']);
  }
  delete(){
    if(!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }
}
