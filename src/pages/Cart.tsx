import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { products } from "@/lib/data";

// Mock cart items for demo
const initialCartItems = [
  { productId: "prod-1", quantity: 2, variant: "500g" },
  { productId: "prod-3", quantity: 1, variant: "1kg" },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");

  // Calculate cart totals
  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    const variant = product?.variants?.find(v => v.size === item.variant);
    
    return {
      ...item,
      product,
      price: variant 
        ? (variant.salePrice || variant.price) 
        : (product?.salePrice || product?.price || 0),
    };
  }).filter(item => item.product !== undefined);

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const discount = 0; // Would be calculated based on promo code
  const total = subtotal + shipping - discount;

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    toast.success("Item removed from cart");
  };

  const handleApplyPromo = () => {
    if (promoCode.trim() === "") {
      toast.error("Please enter a promo code");
      return;
    }
    
    // In a real app, this would validate the promo code with an API
    toast.error("Invalid promo code");
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout or require login
    toast.info("Please log in to checkout");
  };

  return (
    <>
      <Navbar />
      <main className="py-10">
        <div className="container-custom">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex justify-center">
                <ShoppingCart size={64} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/">
                <Button className="mt-4 bg-niraa-600 hover:bg-niraa-700">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 font-medium text-sm text-muted-foreground pb-2">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <Separator />

                {/* Items */}
                {cartProducts.map((item) => {
                  const product = item.product;
                  if (!product) return null;
                  
                  return (
                    <div key={item.productId} className="py-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product */}
                        <div className="col-span-12 md:col-span-6">
                          <div className="flex gap-4">
                            {/* Image */}
                            <div className="w-20 h-20 rounded overflow-hidden border">
                              <img
                                src={product.mainImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1">
                              <h3 className="font-medium">
                                <Link to={`/product/${product.id}`} className="hover:text-niraa-600">
                                  {product.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Size: {item.variant}
                              </p>
                              
                              {/* Mobile Price - visible only on small screens */}
                              <div className="flex justify-between items-center mt-2 md:hidden">
                                <span className="font-semibold">
                                  {formatPrice(item.price)}
                                </span>
                                <button
                                  onClick={() => handleRemoveItem(item.productId)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price - hidden on mobile */}
                        <div className="hidden md:block md:col-span-2 text-center">
                          {formatPrice(item.price)}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-8 md:col-span-2 md:text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.productId, Math.max(1, item.quantity - 1))}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-4 md:col-span-2 text-right flex items-center justify-end gap-2">
                          <span className="font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          
                          {/* Remove button - hidden on mobile */}
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            className="hidden md:inline-flex text-muted-foreground hover:text-destructive"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <Separator className="mt-4" />
                    </div>
                  );
                })}

                {/* Continue Shopping */}
                <div className="pt-4">
                  <Link to="/">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border rounded-lg p-6 bg-white sticky top-24">
                  <h3 className="font-serif text-xl font-bold mb-6">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <Separator />
                    
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>

                    {/* Promo Code */}
                    <div className="pt-4">
                      <p className="text-sm font-medium mb-2">Promo Code</p>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button 
                          variant="outline"
                          onClick={handleApplyPromo}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button 
                      className="w-full mt-6 bg-niraa-600 hover:bg-niraa-700"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
