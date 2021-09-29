import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: lemonchiffon;
    
    & *{
        margin-top 10px;
        padding: 10px;
    }
`

export const NavBar = () => {
    return (
        <Container>
            <p>Home</p>
            <p>Explore</p>
            <p>Subscriptions</p>
            <p>Library</p>
        </Container>
    )
}
