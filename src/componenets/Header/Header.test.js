import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react"
import Header from "./Header"

test("Test logo image", ()=>{
    render(<Header/>)
    const element = screen.getByRole("img")
    expect(element).toBeInTheDocument()
})