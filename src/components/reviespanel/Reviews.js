import {useState, useEffect} from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
    display: flex
`

const TextContainer = styled.div`
    margin: 5px 20px;
    padding: 20px;
    border: 1px solid black;
`
const Button = styled.button`

`   
export const Reviews = ({addNewAudio, userData}) => {

    if (!userData){
        return <p>Hello</p>
    }
    console.log(userData)
    return (
        <Container>
            <TextContainer>
                New: {userData.newAudio || <> 0 <Button onClick={addNewAudio}>Add 5</Button></>}
            </TextContainer>
            <TextContainer>
                Reviews: {userData.toReview}
            </TextContainer>
            <TextContainer>
            Seen today: {userData.reviewedToday}
            </TextContainer>
        </Container>
    )
}
