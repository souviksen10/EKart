import { ShoppingCart } from './shopping-cart';
export class Order{
    datePlaced: number;
    items: any[];

    constructor(public userId:string, public shipping: any
    ,shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
              product:{
                imageUrl: i.imageUrl,
                price: i.price,
                title: i.title          
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          });
    }
}