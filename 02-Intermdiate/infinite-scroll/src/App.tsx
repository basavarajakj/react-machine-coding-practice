import { useEffect, useState, useCallback, useRef } from 'react';
import Loader from './components/Loader';
import ProductCard, { type Product } from './components/ProductCard';

const LIMIT = 10;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observeRef = useRef<IntersectionObserver | null>(null);

  const fetchProducts = useCallback(async (): Promise<void> => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`
      );

      const data: { products: Product[] } = await res.json();
      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(data.products.length === LIMIT);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  // Intersection observers
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null): void => {
      if (loading) return;

      if (observeRef.current) observeRef.current.disconnect();

      observeRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchProducts();
          }
        },
        {
          root: null,
          rootMargin: '200px', // preload before reaching bottom
          threshold: 0,
        }
      );
      if (node) observeRef.current.observe(node);
    },
    [fetchProducts, loading, hasMore]
  );

  useEffect(() => {
    // only fetch initial page on mount; subsequent pages are
    // loaded by the intersection observer when the last item
    // becomes visible
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className='min-h-screen bg-gray-100'>
      {/* Header */}
      <header className='bg-blue-600 text-white py-4 shadow'>
        <h1 className='text-2xl text-center font-bold'>
          Infinite scroll products
        </h1>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <div
                key={product.id}
                ref={lastProductRef}
              >
                <ProductCard
                  product={product}
                  key={product.id}
                />
              </div>
            );
          }
          return (
            <ProductCard
              key={product.id}
              product={product}
            />
          );
        })}
      </div>

      {loading && <Loader />}

      {!hasMore && (
        <p className='text-center text-gray-600 py-6'>No More products</p>
      )}
    </main>
  );
}

export default App;
