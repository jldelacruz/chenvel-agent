import { useEffect, useState } from "react";
import ItemDetails2 from "../../components/ItemDetails2";
import { useLazyGetPackagesQuery } from "../../redux/chenvel";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(10);
  const [getPackges, { isFetching: isFetchingPackages }] =
    useLazyGetPackagesQuery();

  useEffect(() => {
    (async () => {
      await getPackges({ start: start, length: length })
        .unwrap()
        .then((response) => {
          setPackages(response);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  return (
    <>
      {packages.map((p) => {
        return <ItemDetails2 key={p.id} item={p} />;
      })}
    </>
  );
};

export default Home;
