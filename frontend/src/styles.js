import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Page = styled.div`
  padding: 1em;
  font-family: 'roboto';
  background: lightyellow;
`

export const NavbarDivider = styled.hr`
  border: 2px solid brown;
`

export const Navigation = styled.div`
  //background: BurlyWood;
  display: inline;
  padding: 1em;

  & > h2 {
    display: inline-block;
    font-family: 'Sofia';
  }

  & > * {
    padding: 5px;
  }

  & > a:hover {
    font-weight: bold;
  }
`

export const BlogLink = styled(Link)`
  text-decoration: none;
  color: black;
`

export const BlogContainer = styled.div`
  background: lightgray;
  padding-top: 10px;
  padding-left: 2px;
  border: solid;
  border-width: 1px;
  margin-bottom: 5px;

  &:hover {
    background: white;
  }
`

export const SmallText = styled.span`
  font-size: 12px;
`

export const BlogTitle = styled.h2`
  margin-bottom: 4px;
  font-style: italic;
`
