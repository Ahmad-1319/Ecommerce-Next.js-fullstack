import ProductDetails from "@/components/ProductDetails";

export default  async function ProductDetailsPage({ params }) {
  const slug =  params['product-slug'];

 
  
  return <ProductDetails slug={slug}  />;
}