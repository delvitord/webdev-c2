import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DatadiriList = () =>{
    const [datadiris, setDatadiri] = useState([])

    useEffect(() =>{
        getDatadiri()
    },[])

    const getDatadiri = async()=>{
        const response = await axios.get("http://localhost:5000/data_diri");
        setDatadiri(response.data)
    }

    return (
      <div className="columns mt-5 is-centered">
        <div className="column">
          <Link to={`/add`} className="button is-success">
            Add New
          </Link>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Alamat</th>
                <th>Email</th>
                <th>No.Telp</th>
                <th>Foto</th>
                <th>Deskripsi</th>
                <th>linkedin</th>
                <th>instagram</th>
                <th>x</th>
                <th>github</th>
              </tr>
            </thead>
            <tbody>
              {datadiris.map((data_diri, index) => (
                <tr key={data_diri.id}>
                  <td>{index + 1}</td>
                  <td>{data_diri.nama}</td>
                  <td>{data_diri.tempat_lahir}</td>
                  <td>{data_diri.tanggal_lahir}</td>
                  <td>{data_diri.alamat}</td>
                  <td>{data_diri.email}</td>
                  <td>{data_diri.no_telp}</td>
                  <td>{data_diri.foto}</td>
                  <td>{data_diri.deskripsi}</td>
                  <td>{data_diri.linkedin}</td>
                  <td>{data_diri.instagram}</td>
                  <td>{data_diri.x}</td>
                  <td>{data_diri.github}</td>
                  <td>
                    <Link
                      to={`/edit/${data_diri.id}`}
                      className="button is-small is-info">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default DatadiriList;