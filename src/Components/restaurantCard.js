import { useEffect, useState } from 'react';
import '../style/restaurentCard.css'
import { SmallLoader } from '../core/smallLoader';
import useGetDocs from '../core/getDocsFromCollection';

export default function RestaurentCard({ restaurent }) {

    const [categorie] = useGetDocs('Cathegorie');
    const [position, setPositions] = useState({ datas: {}, loading: true});

    useEffect(() => {
        (async function () {
            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${restaurent.position.latitude},${restaurent.position.longitude}&key=AIzaSyBghCCVHKCu4Tydes1wevoQnltNQ-hakQs`)
                .then(async  (result) => {                
                    const body= await result.json();
                    console.log(body);
                    setPositions({
                        loading: false, datas: {
                            placeId: body['results'][0]["place_id"],
                            mainName: body['results'][0]["address_components"][1]['long_name'],
                            secondaryName: body['results'][0]["address_components"][3]['long_name'],
                        }
                    })
                }).catch((err) => {
                    setPositions(post => ({...post, loading:false}))
                    console.log(err);
                })
        })()        
    }, [])
    // console.log(restaurent);
    return <>
        <div className="__area text-center">
            <a href="#" className="__card">
                <button className="__favorit"><i className="la la-ellipsis-h"></i></button>
                <img src={restaurent.logo} className="img-fluid __img" />
                <div className="__card_detail text-left">
                    <h4>{restaurent.nom_restau}</h4>
                    <p>
                        {position.loading ? <SmallLoader/>: position.datas.mainName+' / '+position.datas.secondaryName }
                    </p>
                    <div className="__type">
                    {/* <span href="#Italian">Italian</span>
                        <span href="#Vegetarian">Vegetarian</span>
                        <span href="#Pizza">Pizza</span>
                        <span href="#off">10%</span> */}
                       {categorie.loading? <SmallLoader/>: categorie.data.map(elmt => <span key={elmt.id_cathegorie}>{elmt.cathegorie_name}</span> ) }
                    </div>
                    <div className="__detail">
                        {/* <i className="la la-star-o"></i> <span>5.0</span> <i className="la la-clock-o"></i> <span>30 m</span> */}
                    </div>
                </div>
            </a>
        </div>

    </>
}