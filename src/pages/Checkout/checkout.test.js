import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Checkout from "./Checkout"

describe("Thanks page", ()=>{
    
    test("Test heading", ()=>{
        render(<MemoryRouter><Checkout/></MemoryRouter>)
        const element = screen.getByText("Thank You !")
        expect(element).toBeInTheDocument()
    })
    
    test("Test Paragraph", ()=>{
        render(<MemoryRouter><Checkout/></MemoryRouter>)
        const element = screen.getByText("For Take a Journey with us!")
        expect(element).toBeInTheDocument()
    })

    test("Test Button", ()=>{
        render(<MemoryRouter><Checkout/></MemoryRouter>)
        const element = screen.getByRole("button")
        expect(element).toBeInTheDocument()
    })

    test("Test image", ()=>{
        render(<MemoryRouter><Checkout/></MemoryRouter>)
        const element = screen.getByTestId("svgImage")
        expect(element).toBeInTheDocument()
    })
})