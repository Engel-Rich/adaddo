import { Alert, Spin } from 'antd';
import React from 'react';

const Loader = () => (
  <Spin tip="Chargement en cours...">
    <Alert
      message="Check informations"
      description="Veillez patienter pendant la récupération des informations..."
      type="info"
    />
  </Spin>
);

export default Loader;