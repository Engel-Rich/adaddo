import { useEffect, useState } from "react"
import Loader from "../Components/loading"
// import { collection, getDocs } from "firebase/firestore"
// import { dataBase } from "../firebase.config"
import useGetDocs from "../core/getDocsSimpleFromfirebase"

import StoreCard from "../Components/storeCard"

function StorePage() {
    const [list] = useGetDocs('boutiques')

    return <div className="container-fluid">
    
        {/* <div className="row justify-content-cente align-items-center d-flex">
            <div className="col-12 text-center">
                <h1 className=" display-5 pb-3">
                    Gestion des restaurants
                </h1>
            </div>
        </div> */}

        <div className="container-fluid d-flex pb-5 align-items-center justify-content-center">
            {list.loading ? <Loader/> : <div className="container-fluid">
                <div className="row">
                    {list.data.map(restau => <div key={restau.id_boutique} className="col-md-4 col-lg-3 col-sm-6">
                            <StoreCard  boutique={restau} />
                        </div>)
                    }
                </div>
            </div> }
        </div>
    </div>
}

export default StorePage