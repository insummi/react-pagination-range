import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Pagination } from './components/Pagination/Pagination';

function App() {

  const [ jsonPlaceholderData, setJsonPlaceholderData ] = useState({
    data: [],
    error: false,
    loading: true,
  })

  const [ pagesData, setPagesData] = useState({
    currentPage: 1,
    perPage: 5,
    allListItems: 0,
  })
  
  useEffect(() => {
    setPagination(jsonPlaceholderData.data, pagesData.perPage)
  }, [pagesData.perPage])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(async (response) => {
      if (response.ok) {
          let data = await response.json()
          setJsonPlaceholderData(jsonPlaceholderData => {
            return {
              ...jsonPlaceholderData,
              data,
              loading: false
            }
          })
          setPagination(data)
      } else {
        setJsonPlaceholderData(jsonPlaceholderData => {
          return {
            ...jsonPlaceholderData,
            error: !response.ok,
          }
        })
      }
    })
  }, [])

  const setPagination = useCallback((data) => {
    const { perPage } = pagesData

    let allListItems = 0;

    if(Array.isArray(data)){
        allListItems = Math.ceil(data.length / perPage)                     
    }
        
    setPagesData({
      ...pagesData,
      allListItems
    })
  }, [pagesData])

  const setPagePagination = (currentPage) => {
    setPagesData({
      ...pagesData,
      currentPage
    })    
  }

  const getDataTable = () => {
    const { data } = jsonPlaceholderData
    const { currentPage, perPage } = pagesData

    let dataItems = []

    if(Array.isArray(jsonPlaceholderData.data)){
        const lastIdx = currentPage * perPage;
        const firstIdx = lastIdx - perPage;
        dataItems = data.slice(firstIdx, lastIdx);
    }

    return dataItems           
  }

  const setPerPage = (e) => {
    e.persist()
    let perPage = +e.target.value

    if(perPage){
      setPagesData({
        ...pagesData,
        perPage,
        currentPage: 1,
      })
    }
  }


  return (
    !jsonPlaceholderData.error && pagesData.allListItems > 0 &&  
    <Fragment>
      <div className="perpage-container-showPerPage">
        <span className="perpage-container-showPerPage__title">Items per page: </span>
        <select className="perpage-container-showPerPage__select" name="showPerPage" onChange={(e) => {setPerPage(e)}}>
          <option  className="perpage-container-showPerPage__option" value="5">5</option>
          <option  className="perpage-container-showPerPage__option" value="10">10</option>
          <option  className="perpage-container-showPerPage__option" value="15">15</option>
          <option  className="perpage-container-showPerPage__option" value="20">20</option>
        </select>
      </div>

      <div className="pagination-table-wrapper"> 
          {getDataTable().map((item, i) => (
            <Fragment key={`title${i}`}>
              <div className="pagination-table-item">
                <span style={{fontWeight: 'bold'}}>{item.id + ' '}</span>
                <span>{item.title}</span>
              </div>
            </Fragment>
          ))}     
      </div>

      <div className="pagination-container-wrapper">        
        <Pagination
            setItems={7}
            allListItems={pagesData.allListItems}
            paginate={setPagePagination} 
            perPage={pagesData.perPage} 
            totalItems={jsonPlaceholderData.data.length}
            currentPage={pagesData.currentPage}
            showCurrentAndLastPages={true}
        />
      </div>
    </Fragment>
  )
}

export default App;
