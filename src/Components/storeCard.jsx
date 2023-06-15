import { useEffect, useState } from "react";
import "../style/restaurentCard.css";
import { SmallLoader } from "../core/smallLoader";
import { Modal, Button, message } from "antd";
import useGetDocsWherCondition from "../core/getDocsFromCollection";
import useGetDocs from "../core/getDocsSimpleFromfirebase";
import { doc, updateDoc } from "firebase/firestore";
import { dataBase } from "../firebase.config";

export default function StoreCard({ boutique }) {
  // console.log(boutique.nom_restau);
  // console.log(boutique.categories );
  const tab =
    boutique.categories.lenght == 0 ? ["null"] : boutique.categories;
  const [categorie] = useGetDocs("cathegorieVivre"); //useGetDocsWherCondition({collectionName:"Cathegorie",controller:  'id_cathegorie', operation:'in',condition: tab });
  const [position, setPositions] = useState({ datas: {}, loading: true });

  useEffect(() => {
    (async function () {
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${boutique.position.latitude},${boutique.position.longitude}&key=AIzaSyBghCCVHKCu4Tydes1wevoQnltNQ-hakQs`
      )
        .then(async (result) => {
          const body = await result.json();
          // console.log(body);
          setPositions({
            loading: false,
            datas: {
              placeId: body["results"][0]["place_id"],
              mainName:
                body["results"][0]["address_components"][1]["long_name"],
              secondaryName:
                body["results"][0]["address_components"][3]["long_name"],
            },
          });
        })
        .catch((err) => {
          setPositions((post) => ({ ...post, loading: false }));
          console.log(err);
        });
    })();
  }, []);

  const [isModalopen, setIsModalOpen] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const setRestaurentStatus = async(num)=>{
    startLoadingModal()
    try {
      await updateDoc(doc(dataBase, 'boutiques',boutique.id_boutique),{
        status:num,
      }).then((result)=>{
        endLoadingModal()
        message.success('Mise a jour effectue avec succes')
      }).catch((err)=>{
        message.error('Impossible d\'effectuer l\'operation '+err);
        endLoadingModal()
      })
    } catch (error) {
      message.error('Impossible d\'effectuer l\'operation '+error);
      endLoadingModal()
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsLoadingModal(false);
    setIsModalOpen(false);
  };

  function startLoadingModal() {
    setIsLoadingModal(true);
  }
  function endLoadingModal() {
    setIsLoadingModal(false);
  }
  
  return (
    <>
      {/* Modale */}

      <div className="__area text-center">
        <a href="#" className="__card">
          <button
            className="__favorit"
            onClick={openModal}
           
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
          <img src={boutique.image} className="img-fluid __img" />
          <div className="__card_detail text-left">
            <h4>{boutique.nom_boutique}</h4>

            {position.loading ? (
              <SmallLoader />
            ) : (
              <p>
                {position.datas.mainName + " | " + position.datas.secondaryName}
              </p>
            )}
            <div className="__type">
              {categorie.loading ? (
                <SmallLoader />
              ) : (
                categorie.data.map((elmt) => (
                  <span key={elmt.id_cathegorie}>{elmt.cathegorie_name}</span>
                ))
              )}
            </div>
          </div>
        </a>
      </div>
      <Modal
        open={isModalopen}
        // closable={false}
        maskClosable={false}
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button onClick={closeModal} key="cancel" type="primary">
            Cancel
          </Button>,
          <Button
            onClick={()=>{if(isLoadingModal) message.error('Operation en cours'); else closeModal()}}
            key="okey"
            type="primary"
            loading={isLoadingModal}
          >
            Ok
          </Button>,
        ]}
      >
        <div className="">
          <div className="">
            <div
              className="display-6"
              style={{ fontSize: "30px", fontWeight: "lighter" }}
            >
              {boutique.nom_restau}
            </div>
          </div>
          <div className="">
            <div className="container-fluid p-3">
              {boutique.status == 0 ? (
                <>
                  <div className="row mb-3 ms-5 me-5">
                    <Button onClick={()=>{setRestaurentStatus(1)}} className="btn btn-outline-success m-1 col-sm ">
                      Valider la boutique
                    </Button>
                  </div>
                  <div className="row mb-3 ms-5 me-5">
                    <Button onClick={()=>{setRestaurentStatus(2)}} className="btn btn-outline-danger m-1 col-sm ">
                      Rejetter la demande de creation
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {boutique.status == -1 ? (
                    <div className="row mb-3 ms-5 me-5">
                      <Button onClick={()=>{setRestaurentStatus(1)}} className="btn btn-outline-success m-1 col-sm ">
                        Reactiver la boutique
                      </Button>
                    </div>
                  ) : (
                    <div className="row mb-3 ms-5 me-5">
                      <Button onClick={()=>{setRestaurentStatus(-1)}} type="warning" className="btn btn-outline-warning m-1 col-sm ">
                        Desactiver la boutique
                      </Button>
                    </div>
                  )}
                  <div className="row mb-3 ms-5 me-5">
                    <Button className="btn btn-outline-danger m-1 col-sm p-2 ">
                      Supprimer la boutique
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
