import ProuctTab from "./compo/ProuctTab";
import SingleProduct from "./compo/SingleProduct";
const getProduct = async () => {
  try {
    // https://jihad-blog-main.vercel.app
    const res = await fetch("https://jihad-blog-main.vercel.app/api/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading product:", error);
  }
};

const ProductsPage = async () => {
  const { products } = await getProduct();

  return (
    <div className="max-w-screen-xl mx-auto px-6  py-2 min-h-screen">
      <div className="flex justify-between items-center my-6">
        <h4 className="text-gray-400 text-2xl font-semibold">Shop</h4>
        <h4 className="text-gray-400">{`${products?.length} Projects`}</h4>
      </div>
      <div>
        <div>
          <ProuctTab products={products} />
        </div>

        <div className="flex flex-col gap-5 mt-2">
          {products?.map((product) => (
            <SingleProduct product={product} key={product?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
