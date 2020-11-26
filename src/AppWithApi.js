import React, { useRef, useEffect, useCallback } from 'react';
import './App.css';
import { useGlobalContext } from './context';

const AppWithApi = () => {
  const { loading, users, nextPage } = useGlobalContext();
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && users.length > 0 && !loading) {
      nextPage();
    }
  }, [nextPage, users, loading]);

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
  }, [handleObserver]);

  return (
    <div className='container'>
      <div className='container-list'>
        {users.map(({ id, login }) => (
          <div key={id} className='item'>
            {login}
          </div>
        ))}
      </div>
      <div ref={loader}></div>
      {loading && <div className='loader'>Loading...</div>}
    </div>
  );
};

export default AppWithApi;
