import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCarAddsQuery } from "../generated/graphql";

const Index = () => {
  const[{data}] = useCarAddsQuery();
  return (
    <>
      <NavBar />
      {!data ? <div>loading...</div> : data.carAdds.map(add => (
      <div key={add.id} style={{marginBottom: 15}}>
        <div>{add.brand}</div>
        <div>{add.model}</div>
        <div>{add.price}</div>
      </div>
      ))}
    </>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
