import { useTitle } from "../hooks/useTitle";
import {ProductCard} from "../components"
export const Home = () => {
  useTitle("Home");

  const products = [
    {"id": 1, "name": "6ml Perfume Oil", "price": 2000, "image": "/assets/image/Six.jpg",},
    {"id": 2, "name": "10ml Perfume Oil", "price": 3500, "image": "/assets/image/twelve.jpg",}, 
    {"id": 3, "name": "12ml Perfume Oil", "price": 4500, "image": "/assets/image/fifteen.jpg",}, 
    {"id": 4, "name": "20ml Perfume Oil", "price": 6500, "image": "/assets/image/twenty.jpg",}, 
    {"id": 5, "name": "25ml Perfume Oil", "price": 8500, "image": "/assets/image/twenty_five.jpg",}, 
    {"id": 6, "name": "30ml Perfume Oil", "price": 11000, "image": "/assets/image/thirty.jpg",}, 
    {"id": 7, "name": "50ml Perfume Oil", "price": 17000, "image": "/assets/image/fifty.jpg",}
  ]

  return (
    <main>
      <section className="products">
        { products.map((product) => (
          <ProductCard key={product.id} product={product} />
        )) }        
      </section>
    </main>
  )
}