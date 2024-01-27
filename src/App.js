// Parent component
// Imports
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import AddProductPage from "./Pages/AddProductPage";

function App() {
  // Creating router here
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "add-product", element: <AddProductPage /> },
      ],
    },
  ]);

  return (
    <>
      {/* Notifications Component */}
      <ToastContainer />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

// Exporting App
export default App;
