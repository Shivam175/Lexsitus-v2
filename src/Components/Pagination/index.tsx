import { type FC } from "react";
import ReactPaginate from "react-paginate";

interface SearchPaginationProps {
    totalPages: number;
    perPageItem: number;
    onClick: (num: number) => void;
    initialPage?: number;
}

const Pagination: FC<SearchPaginationProps> = ({
    onClick,
    totalPages,
    perPageItem,
    initialPage,
}) => {
    const handlePageClick = (event: { selected: number }) => {
        onClick((event.selected));
    };

    return (
        <div className="root-paginate">
            {totalPages > 0 ? (
                <ReactPaginate
                    breakLabel="..."
                    previousLabel={
                        <i className="material-icons pt-1">chevron_left</i>
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(totalPages / perPageItem)}
                    nextLabel={
                        <i className="material-icons pt-1">chevron_right</i>
                    }
                    renderOnZeroPageCount={undefined}
                    containerClassName="pagination-container"
                    pageClassName="pagination-page-class"
                    activeClassName="pagination-active-class"
                    forcePage={initialPage}
                />
            ) : null}
        </div>
    );
};

export default Pagination;
