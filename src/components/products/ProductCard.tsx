import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const {
    id,
    name,
    price,
    salePrice,
    images,
    badges = [],
    category,
    status,
    stock
  } = product;

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    toast.success(`${name} added to cart`);
  };

  const wishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    toast.success(`${name} added to wishlist`);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
    <Link to={`/product/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/50 hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft size={18} className="text-white" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/50 hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight size={18} className="text-white" />
              </Button>
            </div>
          )}
          
          {/* Quick Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 bg-black/20">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={wishlist}
            >
              <Heart size={18} className="text-niraa-600" />
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-niraa-600 hover:bg-niraa-700"
              onClick={addToCart}
              disabled={stock === 0}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>

          {/* Status Badge */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className={getStatusBadgeStyle(status)}>
              {status === 'bestseller' && 'Bestseller'}
              {status === 'low_stock' && 'Low Stock'}
              {status === 'out_of_stock' && 'Out of Stock'}
            </Badge>
            {badges.map((badge, index) => (
              badge !== status && (
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

          {/* Sale Tag */}
          {salePrice && salePrice < price && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive">
                Sale
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif font-medium text-lg line-clamp-1">{name}</h3>
          
          {/* Category */}
          <p className="text-xs text-muted-foreground mb-2 capitalize">{category}</p>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            {salePrice && salePrice < price ? (
              <>
                <span className="font-semibold text-niraa-600">{formatPrice(salePrice)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(price)}</span>
              </>
            ) : (
              <span className="font-semibold">{formatPrice(price)}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            {stock > 10 ? (
              <p className="text-green-600 text-sm flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-600 inline-block"></span> In Stock
              </p>
            ) : stock > 0 ? (
              <p className="text-amber-600 text-sm flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-600 inline-block"></span> Only {stock} left
              </p>
            ) : (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-600 inline-block"></span> Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
