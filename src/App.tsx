import { useDispatch } from "react-redux";
import { Products } from "./Interfaces/Products";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "./Services/Products";
import { setProduct } from "./Services/Products/slice";
import { useTypedSelector } from "./store";

const ProductsList = ({ products }: { products: Products[] }) => {
  const dispatch = useDispatch();
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>price</th>
          <th>category_id</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, key) => (
          <tr key={key} onClick={() => dispatch(setProduct(product))}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.category_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const { data, error, isLoading } = useGetProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const product = useTypedSelector((state) => state.productsSlice.product);

  const createProductHandle = () => {
    addProduct({
      id: Math.floor(Math.random() * 1000000),
      name: "Test",
      description: "Description",
      price: 33,
      category_id: 3,
    });
  };

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <ProductsList products={data} />
      ) : null}

      <button onClick={() => createProductHandle()}>Create new Product</button>
      {isAdding && <div>Adding...</div>}

      {JSON.stringify(product)}
    </div>
  );
}

export default App;
