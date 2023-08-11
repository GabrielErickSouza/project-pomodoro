import styled, {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body{
        font-family: sans-serif;
        background: #41e1ba;
        transition: background-color 300ms ease-in-out;
        line-height: 1.5;
    }
`
export const Container = styled.div`
    max-width: 640px;
    margin: 0 auto;
`