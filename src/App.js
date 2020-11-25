import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const listDefault = [1, 2, 3, 4];

const App = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    }
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setList(lastList => lastList.concat(listDefault));
        window.history.pushState({}, '', page);
        setLoading(false);
      }, 2000);
    }
  }, [page]);

  useEffect(() => {
    const location = window.location;
    console.log(location);
  }, []);

  return (
    <div className='container'>
      <div className='container-list'>
        {list.map((item, index) => (
          <div key={index} className='item'>
            {item}
          </div>
        ))}
      </div>
      <div ref={loader}></div>
      {loading && <div className='loader'>Loading...</div>}
    </div>
  );
};

export default App;
