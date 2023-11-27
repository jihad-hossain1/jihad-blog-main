const getProduct = async () => {
  try {
    // https://jihad-blog-main.vercel.app
    const res = await fetch("http://localhost:3000/api/products", {
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
  // const { products } = await getProduct();
  // console.log(products);
  return (
    <div className="max-w-screen-xl mx-auto px-6  py-2 min-h-screen">
      <div className="flex justify-between items-center my-6">
        <h4 className="text-gray-400 text-2xl font-semibold">Shop</h4>
        <h4 className="text-gray-400">{`${7} Projects`}</h4>
      </div>
      <div>products ....</div>
    </div>
  );
};

export default ProductsPage;
