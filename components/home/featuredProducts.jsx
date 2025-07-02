
import ProductCard from "../productCard"

const FeaturedProducts = async () => {
    const res =  await fetch('http://localhost:3000/api/products/get')
    const products = await res.json()
const featuredProducts= products.filter((elem)=>{
return elem.featured
})
  return (
    <>
         <h1 className='text-4xl sm:text-5xl text-center'>Featured Products</h1>
        <p className='my-5 text-slate-600 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam harum atque consequuntur?</p>
        <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6  my-5 gap-3'>
  
          {featuredProducts.map((p , index)=>{
            return   <ProductCard key={index} {...p}/> 
          })}
       
        </div>
      
    </>
  )
}

export default FeaturedProducts