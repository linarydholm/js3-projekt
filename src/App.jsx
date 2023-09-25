import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";

// routes
import Root from "./routes/Root";
import Home from "./routes/Home";
import AddCard from "./routes/AddCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="add" element={<AddCard />} />
    </Route>
  )
)

function App() {
  return(
      <RouterProvider router={router}/>
    )
}

export default App;