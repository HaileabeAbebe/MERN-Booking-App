export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }

  // const pageNumber = Array.from({length: pages}, (_, i) => i + 1);
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
