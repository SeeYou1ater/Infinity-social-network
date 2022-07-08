import React from 'react';
import './FindUsers.css';


function FindUsersPagination(props) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pageSize = props.pageSize;

    let pages = [];
    for ( let i = 1 ; i <= pagesCount; i++) {
      pages.push(i)
    }

    return (
            <div className='App__pagination'>
              {pages.map((page) => { return <span onClick={() => {props.onPageChanged(page, pageSize)}} className={[props.currentPage === page && 'App__friends-selectPage', ' App__friends-numberPage'].join('')}>{page}</span>})}
            </div>  
      )
}

export default FindUsersPagination;