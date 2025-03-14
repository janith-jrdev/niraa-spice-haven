
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ProductCard from "@/components/products/ProductCard";
import { products, categories } from "@/lib/data";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const featuredProducts = products.filter(product => product.featured);
  
  const filteredProducts = activeTab === "all" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeTab);

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully selected collection of premium dry fruits and spices
          </p>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="dryfruits">Dry Fruits</TabsTrigger>
              <TabsTrigger value="spices">Spices</TabsTrigger>
              <TabsTrigger value="wholesale">Wholesale</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found in this category.</p>
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab("all")}
                >
                  View All Products
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Link to="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
