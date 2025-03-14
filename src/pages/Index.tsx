
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryShowcase />
        <FeaturedProducts />
        <section className="py-16 bg-niraa-50">
          <div className="container-custom">
            <div className="bg-white border rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">About Niraa</h2>
              <p className="text-muted-foreground mb-6">
                At Niraa Dryfruits & Spices, we take pride in offering the finest quality dry fruits and authentic spices sourced directly from farms across India and around the world. Our mission is to bring the authentic taste of nature to your doorstep.
              </p>
              <p className="text-muted-foreground">
                With a focus on quality, freshness, and customer satisfaction, we ensure that every product that reaches you is of premium quality and packed with goodness.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
