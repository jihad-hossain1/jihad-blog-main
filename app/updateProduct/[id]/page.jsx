import UpdateProductForm from "../UpdateProductForm/UpdateProductForm";

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

const UpdateProduct = async ({ params }) => {
  const { id } = params;
  const { product } = await getProductById(id);
  return (
    <div>
      <UpdateProductForm pid={id} product={product} />
    </div>
  );
};

export default UpdateProduct;
