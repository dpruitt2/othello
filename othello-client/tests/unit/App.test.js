import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

describe("App page test", ()=> {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    })

    it("register button posts a user to the database", ()=> {
        const div = document.createElement('div');
        const app = mount(<App />, div);

        const user = {email: 'test@example.com', password: 'password'};

        fetchMock.post('/users', user);

        app.instance().postNewUser().then(function(response) {
            expect(response.status).toBe(200);
        })

        fetchMock.restore();
    })

    it("register button takes user to register form", () => {
        const div = document.createElement('div');
        const app = mount(<App />, div);

        const button = app.find("#signUp");
        button.simulate("click");

        const confirmPassword = app.find("#confirmPassword")
        expect(confirmPassword.text()).toBe("Confirm Your Password:");
    })
})
