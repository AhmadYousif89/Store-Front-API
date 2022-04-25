import { useSelector, RootStateOrAny } from "react-redux";
import Products from "./Products";

function Home() {
  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <>
      <div className="heading">
        <h3>
          Welcome
          {user ? <span> {user.data.name.toUpperCase()} </span> : null}
        </h3>
      </div>
      <Products />
    </>
  );
}

export default Home;
