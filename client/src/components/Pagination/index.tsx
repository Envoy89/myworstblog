import React from 'react';

interface PaginationProps {
    pageNumber: number,
    elementCount?: number,
    limit: number,
    changePage: (value: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
            pageNumber, elementCount, limit, changePage
}) => {
    elementCount = elementCount || 1;
    const pageCount = Math.ceil(elementCount / limit) || 1;

    if (pageCount > 1) {

        const pages = [];
        for (let i = 1; i <= pageCount; ++i) {
            const page = i === pageNumber ?
                <li className="active"><a onClick={() => {changePage(i)}}>{i}</a></li> :
                <li className="waves-effect"><a onClick={() => {changePage(i)}}>{i}</a></li>;
            pages.push(
                page
            )
        }

        const pageMinus = () => {
            changePage(pageNumber > 1 ? pageNumber - 1 : 1);
        }

        const pagePlus = () => {
            changePage(pageNumber < pageCount ? pageNumber + 1 : pageCount);
        }

        return <ul className="pagination">
            <li className="disabled"><a onClick={pageMinus}><i className="material-icons">{"<"}</i></a></li>
            {pages.map(x => x)}
            <li className="waves-effect"><a onClick={pagePlus}><i className="material-icons">{">"}</i></a></li>
        </ul>
    } else {
        return null;
    }
}

export default Pagination;