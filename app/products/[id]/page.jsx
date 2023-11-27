const getProductById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });
    //
    if (!res.ok) {
      throw new Error("failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const SingleProductDetails = async ({ params }) => {
  const { id } = params;
  const { product } = await getProductById(id);
  console.log(product);
  return (
    <div>
      SingleProductDetails
      {product?._id}
    </div>
  );
};

export default SingleProductDetails;
