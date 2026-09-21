import { Route, Routes } from "react-router";
import { PageOrder } from "./pages";
import { Providers } from "./Providers";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/order" element={<PageOrder />} />
        </Route>
      </Routes>
    </Providers>
  );
}

export default App;
