import React from 'react'
import {ImBin} from "react-icons/im"
export const BinIcon = ({handleDelete}) => {
    return (
        <ImBin onClick={handleDelete}/>
    )
}
