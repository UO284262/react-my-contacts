import { BiSortAZ, BiSortZA } from "react-icons/bi"

const Searcher = ({ searchChange, az, za, ageFilterChange }) => {
    return (
        <div className='pa2 bg-lightest-blue flex items-center'>
        <div className="flex items-center mr3">
            <a href="#0" title="Ascending order" onClick={az} className="mr2">
                <BiSortAZ size={32} />
            </a>
            <a href="#0" title="Descending order" onClick={za}>
                <BiSortZA size={32} />
            </a>
        </div>
        <input
            className='ba b--blue bg-light-green pa2 br3 w-40 mr3'
            type='search'
            placeholder='Search contacts'
            onChange={searchChange}
        />
        <input
            className='ba b--blue bg-light-green pa2 br3 w-20'
            type='number'
            placeholder='Minimum age'
            onChange={ageFilterChange}
        />
    </div>
    );
}
export default Searcher;
