import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import BackContext from './BackContext';
import Nav from './Nav';
import ServicesCreate from './Services/Create';
import ServicesCrud from './Services/Crud';
import MastersCrud from './Masters/Crud';
import MastersList from './Masters/List';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  //////////////////////SRVICES////////////////////
  const [services, setServices] = useState(null);
  const [createService, setCreateService] = useState(null);
  const [deleteService, setDeleteService] = useState(null);
  const [editService, setEditService] = useState(null);
  const [modalService, setModalService] = useState(null);

  ///////////////////////MASTERS//////////////////
  const [masters, setMasters] = useState(null);
  const [createMaster, setCreateMaster] = useState(null);
  const [deleteMaster, setDeleteMaster] = useState(null);
  const [editMaster, setEditMaster] = useState(null);
  const [modalMaster, setModalMaster] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(null);

  // create service
  useEffect(() => {
    if (null === createService) return;
    axios
      .post(
        'http://localhost:3003/admin/create-service',
        createService,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [createService]);

  // read services
  useEffect(() => {
    axios
      .get('http://localhost:3003/admin/services', authConfig())
      .then((res) => setServices(res.data));
  }, [lastUpdate]);

  // edit service
  useEffect(() => {
    if (null === editService) return;
    axios
      .put(
        'http://localhost:3003/admin/services/' + editService.id,
        editService,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [editService]);

  // delete servcice
  useEffect(() => {
    if (null === deleteService) return;
    axios
      .delete(
        'http://localhost:3003/admin/services/' + deleteService.id,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [deleteService]);

  // create master
  useEffect(() => {
    if (null === createMaster) return;
    axios
      .post('http://localhost:3003/admin/masters', createMaster, authConfig())
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [createMaster]);

  // read masters
  useEffect(() => {
    axios
      .get('http://localhost:3003/admin/masters', authConfig())
      .then((res) => setMasters(res.data));
  }, [lastUpdate]);

  console.log(masters);

  // edit master
  useEffect(() => {
    if (null === editMaster) return;
    axios
      .put(
        'http://localhost:3003/admin/masters/' + editMaster.id,
        editMaster,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [editMaster]);

  // delete master
  useEffect(() => {
    if (null === deleteMaster) return;
    axios
      .delete(
        'http://localhost:3003/admin/masters/' + deleteMaster.id,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [deleteMaster]);

  return (
    <BackContext.Provider
      value={{
        setCreateService,
        services,
        setDeleteService,
        setEditService,
        setModalService,
        modalService,
        masters,
        setCreateMaster,
        setDeleteMaster,
        setEditMaster,
        setModalMaster,
        modalMaster,
      }}
    >
      {show === 'admin' ? (
        <div className="back">
          <Nav />
          <MastersList />
        </div>
      ) : show === 'create-service' ? (
        <div className="back">
          <Nav />
          <ServicesCreate />
        </div>
      ) : show === 'services' ? (
        <ServicesCrud />
      ) : show === 'masters' ? (
        <MastersCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
