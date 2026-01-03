export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition p-4'>
      <img
        src={product.thumbnail}
        title={product.title}
        className='h-40 w-full object-cover rounded-lg'
      />

      <div className='mt-3'>
        <h3 className='font-semibold text-lg'>{product.title}</h3>
        <p className='text-gray-500 text-sm line-clamp-2'>
          {product.description}
        </p>

        <div className='flex  justify-between items-center mt-3'>
          <span className='text-blue-600 font-bold'>${product.price}</span>
          <span className='text-sm bg-green-100 text-green-600 px-2 py-1 rounded'>
            ⭐ {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
