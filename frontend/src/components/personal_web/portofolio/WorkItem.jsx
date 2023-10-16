import React from 'react';

const WorkItem = ({ item }) => {
  return (
    <div className="work__card" key={item.id}>
      <img src={item.image} alt='' className='work__img' />
      <h3 className="work__title">{item.title}</h3>
      <a href={item.link} className="work__button">
        Link Github <i className="bx bx-right-arrow-alt work__button-icon"></i>
      </a>
      <a href={item.file} className="work__button">
        Download <i className="bx bx-right-arrow-alt work__button-icon"></i>
      </a>
    </div>
  );
};

export default WorkItem;
