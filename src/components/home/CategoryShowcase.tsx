
import { Link } from "react-router-dom";
import { categories } from "@/lib/data";

const CategoryShowcase = () => {
  return (
    <section className="py-16 bg-accent">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
