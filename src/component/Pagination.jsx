import React from 'react'

function Pagination({pagesNumber, currPage, changeCurrPage}) {
    let pagesArr = [];
    for(let i = 0; i<pagesNumber; i++){
        pagesArr.push(i+1);
    }
    return (
        <nav aria-label="...">
            <ul className="pagination pagination-sm">
                {pagesArr.map((pageNum) => {
                    let additional = pageNum === currPage ? "page-item active" : "page-item";
                    return (
                    <li key={pageNum} className={additional}>
                        <span className="page-link" onClick={() => changeCurrPage(pageNum)}>{pageNum}</span>
                    </li>)
                })}
            </ul>
        </nav>
    )
}

export default Pagination;
