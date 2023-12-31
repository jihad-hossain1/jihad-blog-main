import { getProducts } from "@/utils/fetchAllProducts";
import ProuctTab from "./compo/ProuctTab";

const ProductsPage = async () => {
  const { products } = await getProducts();
  const newProduct = [...products];

  return (
    <div className="max-w-screen-xl mx-auto px-6  py-2 min-h-screen">
      <div className="flex justify-between items-center my-6">
        <h4 className="text-gray-400 text-2xl font-semibold">Shop</h4>
        <h4 className="text-gray-400">{`${products?.length} Projects`}</h4>
      </div>
      <div>
        <div>
          <ProuctTab products={newProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
