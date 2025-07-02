import ProductCard from "@/components/productCard";

const CategoryListing = async ({ params }) => {
  const slug = params.slug;
  const res = await fetch("http://localhost:3000/api/products/get", { cache: "no-store" });
  const products = await res.json();

  // Filter products by category (case-insensitive)
  const filtered = products.filter(
    (p) => p.category && p.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto py-28 px-4">
      <h1 className="text-3xl font-bold mb-6 capitalize"> {slug} Products</h1>
      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {filtered.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryListing;