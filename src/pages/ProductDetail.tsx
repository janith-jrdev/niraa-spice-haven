import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Minus, Plus, ShoppingCart, Heart, TruckIcon, Award, Shield } from "lucide-react";
import { products } from "@/lib/data";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find the product
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-12 text-center">Product not found</div>;
  }

  // Set default variant
  if (selectedVariant === "" && product.variants && product.variants.length > 0) {
    setSelectedVariant(product.variants[0].size);
  }

  // Get current variant
  const currentVariant = product.variants?.find(v => v.size === selectedVariant);
  
  // Determine the current price
  const currentPrice = currentVariant 
    ? currentVariant.price 
    : product.price;
  
  // Determine the current sale price
  const currentSalePrice = currentVariant 
    ? currentVariant.salePrice 
    : product.salePrice;

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Maximum available stock reached");
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to wishlist`);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'bestseller':
        return 'bg-spice-500';
      case 'low_stock':
        return 'bg-rose-500';
      case 'out_of_stock':
        return 'bg-gray-500';
      default:
        return 'bg-niraa-500';
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${product.category}`} className="capitalize">
                    {product.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-muted-foreground max-w-[200px] truncate">
                  {product.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-xl overflow-hidden border bg-white">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border ${
                      selectedImageIndex === index ? 'ring-2 ring-niraa-600' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {/* Status Badge */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getStatusBadgeStyle(product.status)}>
                    {product.status === 'bestseller' && 'Bestseller'}
                    {product.status === 'low_stock' && 'Low Stock'}
                    {product.status === 'out_of_stock' && 'Out of Stock'}
                  </Badge>
                  {product.badges && product.badges.map((badge, index) => (
                    badge !== product.status && (
                      <Badge 
                        key={index} 
                        className={
                          badge === "Organic" 
                            ? "bg-green-500" 
                            : badge === "Premium" 
                            ? "bg-purple-500" 
                            : "bg-niraa-500"
                        }
                      >
                        {badge}
                      </Badge>
                    )
                  ))}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold">{product.name}</h1>
                <p className="text-sm text-muted-foreground mt-2 capitalize">Category: {product.category}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                {currentSalePrice && currentSalePrice < currentPrice ? (
                  <>
                    <span className="text-3xl font-bold text-niraa-600">
                      {formatPrice(currentSalePrice)}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(currentPrice)}
                    </span>
                    <Badge variant="destructive" className="ml-2">
                      {Math.round((1 - currentSalePrice / currentPrice) * 100)}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold">
                    {formatPrice(currentPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 10 ? (
                  <p className="text-green-600 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-600 inline-block"></span> In Stock
                  </p>
                ) : product.stock > 0 ? (
                  <p className="text-amber-600 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-600 inline-block"></span> Low Stock (Only {product.stock} left)
                  </p>
                ) : (
                  <p className="text-red-600 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-600 inline-block"></span> Out of Stock
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700">{product.description}</p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Packing Size</h3>
                  <Select 
                    value={selectedVariant} 
                    onValueChange={setSelectedVariant}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant) => (
                        <SelectItem key={variant.size} value={variant.size}>
                          {variant.size} - {formatPrice(variant.salePrice || variant.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity === 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-niraa-600 hover:bg-niraa-700"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </Button>
              </div>

              {/* Features */}
              <div className="pt-6 space-y-4 border-t">
                <div className="flex gap-3">
                  <TruckIcon className="h-5 w-5 text-niraa-600" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">On orders over ₹999</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Award className="h-5 w-5 text-niraa-600" />
                  <div>
                    <h4 className="font-medium">Premium Quality</h4>
                    <p className="text-sm text-muted-foreground">100% authentic products</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-niraa-600" />
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">Multiple payment options</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
