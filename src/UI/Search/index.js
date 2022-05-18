import styled from "styled-components";

const SearchInput = styled.input.attrs(
    {
        type: 'text',
        name: 'search',
        id: 'search',
        autoComplete: 'off',
        required: true,
        autoFocus: true,
        spellCheck: false,
        autoCorrect: "off",
        autoCapitalize: 'none',
        maxLength: '30',
        minLength: '2',
    })`
  display: inline-block;
  width: 100%;
  height: 50px;
  border: none;
  font-size: 2em;
  border-radius: 5px 0 0 5px;
  padding: 0 30px;
  font-family: 'Titillium Web', sans-serif;

  &:focus {
    outline: none;
  }

`;




export const SearchCountry =({className, Handler, valueInput, onChangeInput, placeholder})=>{

    return<form className={className} onSubmit={Handler}>
        <SearchInput
            placeholder={placeholder}
            value={valueInput}
            onChange={onChangeInput}
        >
        </SearchInput>
        <button type={"submit"} className={"search__button_svg"} >
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"
                 viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        </button>
    </form>
}