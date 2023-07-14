import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from "@testing-library/react"
import Card from "./Card"
import { MemoryRouter } from "react-router-dom"
import BookingForm from '../../pages/BookingForm/BookingForm';
import { createMemoryHistory } from 'history';


const dummyData = {
    "name": "Damage Protection",
    "sdecs": "dsafsdfsdfsd",
    "ldecs": "sdafsdfsdafsdfas",
    "price": 1500,
    "imageUrl": "Image.url"
}

describe("Card", ()=>{

    // TEST for text in the Card
    test("Text in the card", ()=>{
        render(<MemoryRouter><Card car={dummyData}/></MemoryRouter>)
        const dom = screen.getByText("Damage Protection")
        expect(dom).toBeInTheDocument();
    })

    // TEST for button in the Card
    test("Button in the card",()=>{
        render(<MemoryRouter><Card car={dummyData}/></MemoryRouter>)
        const dom = screen.getByRole("button")
        expect(dom).toBeInTheDocument()
    })
})