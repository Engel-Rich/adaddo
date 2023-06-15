import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../firebase.config";

 export default function useGetDocs(collectionName) {
  const [state, setState] = useState({
    data: [],
    error: null,
    loading: true,
  });
  useEffect(() => {
    (async function () {
      let list = [];
      await getDocs(collection(dataBase, collectionName))
        .then((result) => {
          result.forEach((doc) => {
            list.push(doc.data());
          });
          setState((c) => ({ ...c, data: list, loading: false }));
        })
        .catch((err) => {
          setState((c) => ({ ...c, error: err, loading: false }));
        });
    })();
  }, []);

  return [state];
}
