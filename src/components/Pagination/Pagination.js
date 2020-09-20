import React from 'react'
import './Pagination.scss'

export const Pagination = ({setItems, allListItems, perPage, totalItems, currentPage, ...props}) => {

    /*            
        allListItems - all items in pagination
        setItems - number of items in pagination
        perPage - limit on the number of lines displayed on the screen in the table
        currentPage - current page
        totalItems - data array length

        props.paginate - method for setting the current page in the parent component
    */

    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];
        
        while (i <= to) {
            range.push(i);
            i += step;
        }
        
        return range;
    }

    const even = num => !(num % 2);

    const setPagination = () => {
        let start = currentPage
        let end = allListItems
        let pagination = []
        
        if (currentPage < 1 || !setItems) {
            return pagination;
        }

        if (currentPage - Math.floor(setItems / 2) < 0){
            start = 1
        }
        else if (currentPage - Math.floor(setItems / 2) >= 0 && currentPage + Math.floor(setItems / 2) < allListItems) { 
            start = currentPage - Math.floor(setItems / 2) > 0 
                ? currentPage - Math.floor(setItems / 2) 
                : 1
        }
        else if ((currentPage - setItems >= 0 && currentPage + Math.floor(setItems / 2) >= allListItems) 
            || currentPage + Math.floor(setItems / 2) >= allListItems) {
            start = allListItems - (setItems - 1)
        }

        if (currentPage + Math.floor(setItems / 2) >= allListItems) {
            end = allListItems
        }
        else if (currentPage < Math.floor(setItems / 2)) {
            end = setItems
        }
        else if (currentPage >= Math.floor(setItems / 2) && currentPage + Math.floor(setItems / 2) <= allListItems) {
            end = currentPage === Math.floor(setItems / 2) 
                ? currentPage + Math.ceil(setItems / 2) 
                : even(setItems) ? currentPage + (Math.floor(setItems / 2) - 1) : currentPage + Math.floor(setItems / 2)
        }
        else if (currentPage >= setItems && currentPage + Math.floor(setItems / 2) > allListItems) {
            end = allListItems
        }
        
        if (setItems > allListItems){
            start = 1
            end = allListItems
        }

        pagination = range(start, end);

        return pagination
    }

    return (
        <div className="pagination-container">
            <span 
                className="pagination-item__arrow" 
                onClick={()=> props.paginate(1)}
                >&#171;
            </span>

            {setPagination().map((item, i) => {
                return <span
                    key={`pagination${i}`}
                    style={item === currentPage
                        ? item < 100 
                            ? {background: '#1E3C96', color: '#fff', } 
                            : {background: '#1E3C96', color: '#fff', width: '30px'}
                        : item >= 100 
                            ? {width: '30px'} 
                            : {}            
                        }
                    className="pagination-item__numbers"
                    onClick={()=> props.paginate(item)}
                >{item} </span>              
            })}   
                     
            <span 
                className="pagination-item__arrow" 
                onClick={()=> props.paginate(allListItems)}
            >&#187;</span>
            
            {props.showCurrentAndLastPages && 
                <span className="pagination-item__counter">
                    <span className="pagination-item__counter-title">Pages: </span>
                    {currentPage} / {allListItems}
                </span>}
        </div>
    )
}