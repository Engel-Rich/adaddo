import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../firebase.config";

//  export default function useGetDocs(collectionName) {
//   const [state, setState] = useState({
//     data: [],
//     error: null,
//     loading: true,
//   });
//   useEffect(() => {
//     (async function () {
//       let list = [];
//       await getDocs(collection(dataBase, collectionName))
//         .then((result) => {
//           result.forEach((doc) => {
//             list.push(doc.data());
//           });
//           setState((c) => ({ ...c, data: list, loading: false }));
//         })
//         .catch((err) => {
//           setState((c) => ({ ...c, error: err, loading: false }));
//         });
//     })();
//   }, []);

//   return [state];
// }

export default function useGetDocsWherCondition(props ) {
    // controller,operation,condition,collectionName,
  const [state, setState] = useState({
    data: [],
    error: null,
    loading: true,
  });
  console.log(props.condition);
  useEffect(() => {
    (async function () {
      let list = [];
      await getDocs(query(
        collection(dataBase, props.collectionName),
        where(props.controller, props.operation, props.condition)
      ))
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

// export default  useGetDocs
// export default useGetDocsWherCondition ;
