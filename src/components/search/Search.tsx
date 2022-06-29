interface SearchProps {
    value: string,
    onChange: Function,
    placeholder: string
}

const Search = (props: SearchProps) => {

    const { value, onChange, placeholder } = props;

    return(
        <div className="search-wrapper">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-control"
                placeholder={placeholder}
            />
        </div>
    );
}

export default Search;