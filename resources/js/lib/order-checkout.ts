export type CheckoutCartItem = {
    name: string;
    price: number;
    qty: number;
    image: string;
};

export function getLineTotal(item: Pick<CheckoutCartItem, "price" | "qty">): number {
    return item.price * item.qty;
}

export function getCartTotal(items: CheckoutCartItem[]): number {
    return items.reduce((sum, item) => sum + getLineTotal(item), 0);
}
