import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkItem from './WorkItem';
import { useParams } from 'react-router-dom';

const Works = () => {
  const [projects, setProjects] = useState([]);
  const { url_custom } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
        const id = url.data[0].dataDiriId;
        const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
        const dataDiri = response.data[0]; // Mengambil data diri pertama dalam array (indeks 0)
        const portofolioData = dataDiri.portofolio;

        const projectsData = portofolioData.map((project, index) => ({
          id: index + 1,
          image: project.image, 
          title: project.judul,
          link: project.link,
          file: project.file,
          deskripsi:project.deskripsi,
        }));

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="work__container grid">
        {projects.map((item) => {
          return <WorkItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Works;
