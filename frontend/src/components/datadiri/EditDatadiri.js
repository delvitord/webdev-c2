import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const UpdateDatadiri = () => {
  const [nama, setNama] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [foto, setFoto] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [x, setX] = useState("");
  const [github, setGithub] = useState("");
  const history = useHistory();
  const {id} = useParams();
  
  useEffect(() => {
    getDatadiriById();
  }, []);

  const updateDatadiri = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/data_diri/${id}`, {
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        email,
        no_telp,
        foto,
        deskripsi,
        linkedin,
        instagram,
        x,
        github,
      });
      history.push("/data-diri");
    } catch (error) {
      console.log(error);
    }
  };

  const getDatadiriById = async () => {
    const response = await axios.get(`http://localhost:5000/data_diri/${id}`);
    setNama(response.data.nama);
    setTempatLahir(response.data.tempat_lahir);
    setTanggalLahir(response.data.tanggal_lahir);
    setAlamat(response.data.alamat);
    setEmail(response.data.email);
    setNoTelp(response.data.no_telp);
    setFoto(response.data.foto);
    setDeskripsi(response.data.deskripsi);
    setLinkedin(response.data.linkedin);
    setInstagram(response.data.instagram);
    setX(response.data.x);
    setGithub(response.data.github);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateDatadiri}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Tempat Lahir</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={tempat_lahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                placeholder="Tempat Lahir"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Tanggal Lahir</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={tanggal_lahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                placeholder="Tanggal Lahir"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">No Telepon</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={no_telp}
                onChange={(e) => setNoTelp(e.target.value)}
                placeholder="No Telepon"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Foto</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                placeholder="Foto"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Deskripsi</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Linkedin</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Linkedin"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Instagram</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">X</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={x}
                onChange={(e) => setX(e.target.value)}
                placeholder="X"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Github</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="Github"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDatadiri;
