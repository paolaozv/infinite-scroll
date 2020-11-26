import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const listDefault = [1, 2, 3, 4];

const AppUseCallback = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
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

  const getList = useCallback(() => {
    if (!loading && page > list.length/4) {
      setLoading(true);
      window.history.pushState({}, '', page);
      setTimeout(() => {
        setList(lastList => lastList.concat(listDefault));
        setLoading(false);
      }, 2000);
    }
  }, [page, list, loading]);

  useEffect(() => {
    getList();
  }, [page, getList]);

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

export default AppUseCallback;
