
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    price,
    salePrice,
    image,
    badges = [],
    category,
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

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
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
            >
              <ShoppingCart size={18} />
            </Button>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  className={
                    badge === "Bestseller" 
                      ? "bg-spice-500" 
                      : badge === "Limited Stock" 
                      ? "bg-rose-500" 
                      : badge === "Wholesale Only" 
                      ? "bg-blue-500" 
                      : "bg-niraa-500"
                  }
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

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
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
