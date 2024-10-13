import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

function Pagination({
  currentPage = 1,
  pageSize = 10,
  total = 0,
  setCurrentPage = (page: any) => {},
}) {
  const onPageChange = (page: any) => {
    if (page <= 0) {
      page = 1;
    }
    setCurrentPage(page);
  };
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Showing {currentPage * pageSize + 1} to{" "}
        {Math.min((currentPage + 1) * pageSize, total)} of {total} users
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={(currentPage + 1) * pageSize >= total}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
};
export default Pagination;
