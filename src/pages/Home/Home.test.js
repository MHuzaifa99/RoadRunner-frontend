import '@testing-library/jest-dom/extend-expect';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import dummyCarData from './dummyCarData.json'
import Home from './Home';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
describe("Home Component", () => {

    const server = setupServer(
        rest.get(`${process.env.REACT_APP_CARS_API_URL}/cars/get`, (req, res, ctx) => {
          return res(ctx.json(dummyCarData))
        }),
      )
    test("Test Cars", async() => {
        render(<MemoryRouter><Home/></MemoryRouter>)
        await waitFor(()=>{
            for(const car of dummyCarData){
                const element = screen.getByTestId(car.id);
                expect(element).not.toBeNull();
            }
        })
    })

    test("Test Loading...", ()=>{
        render(<MemoryRouter><Home/></MemoryRouter>)
        const element = screen.getByText("Loading...")
        expect(element).toBeInTheDocument();
    })
})