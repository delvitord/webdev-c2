import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkItem from './WorkItem';

const Works = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:5000/datadiri/portofolio", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const projectsData = response.data.map((project, index) => ({
          id: index + 1,
          image: project.image, // Sesuaikan dengan nama field di database
          title: project.judul, // Sesuaikan dengan nama field di database
          link:project.link,
          file:project.file,
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
