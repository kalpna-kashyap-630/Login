import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../toast";
import Navbar from "../navbar";


function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Set logged in user
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logout");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();

      setProducts(result.products || []);

      console.log(result);
    } catch (error) {
      handleError("Failed to fetch products");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar handleLogout={handleLogout} />

      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>{loggedInUser}</h2>
          <h3>Show Products</h3>
        </div>

        <div className="row">
          {products.length > 0 ? (
            products.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card shadow-sm h-100">

                  {/* Product Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Price: ₹{item.price}</p>

                    <button className="btn btn-primary w-100">
                      Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center">No Products Found</h4>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Home;