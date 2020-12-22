import { map, take } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();    
    return this.db.object('/shopping-carts/'+ cartId).valueChanges()
            .pipe(map((x:any)=> new ShoppingCart(x?.items)));
  }

  addToCart(product:Product){
    this.updateItem(product,1);
  }

  removeFromCart(product:Product){
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+ cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string,productId: string){
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + productId);    
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;
  
    let reponse = await this.create();
    localStorage.setItem('cartId',reponse.key);
    return reponse.key; 
  }

  private async updateItem(product:Product, change: number){
    let cartId = await this.getOrCreateCartId();    
    let itemRef = this.getItem(cartId,product.key);
    let item$ = itemRef.valueChanges();
    
    item$.pipe(take(1)).subscribe((item: any) => {   
      let quantity = (item?.quantity || 0) + change;
      if(quantity === 0) itemRef.remove();
      else
        itemRef.update(
          {     
            title: product.title,
            price: product.price,    
            imageUrl: product.imageUrl,
            quantity : quantity
          });
    })
  }
}
