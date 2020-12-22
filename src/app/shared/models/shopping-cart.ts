import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{ 
    items:ShoppingCartItem[] = [];
    constructor(private itemsMap:{[productId:string]:ShoppingCartItem}){
        this.itemsMap = itemsMap || {};

        for(let productId of Object.keys(this.itemsMap)){
            this.items
            .push(new ShoppingCartItem({...this.itemsMap[productId], key: productId}));        }
    }

    getQuantity(product: Product){  
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
      }

    get totalItemsCount(){
        let count = 0;
        for(let cartItem of Object.values(this.itemsMap))
            count += cartItem.quantity;
        
        return count;
    }

    get totalPrice(){        
        let sum = 0;
        for(let item of this.items){
            sum += item.totalPrice;
        }
        return sum;
    }
    
}