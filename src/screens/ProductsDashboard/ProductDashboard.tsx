import ProductActivity from '~/components/ProductActivity';
import ProductView from '~/components/ProductView';

const ProductsDashboard = () => {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <ProductActivity />
            <ProductView />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductsDashboard;
