import React from 'react';
import ReactDOM from 'react-dom';
import Registration from '../../src/Registration';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

describe("Registration page test", ()=> {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Registration />, div);
    })

    it("Register page has a button that says Register", ()=> {
        const div = document.createElement('div');
        const register = shallow(<Registration />, div);


        const button = register.find('#register')
        expect(button.text()).toBe('Register')
    })

    it("has a form with a email and password input field", ()=>{
        const div = document.createElement('div');
        const register = shallow(<Registration />, div);

        const emailLabel = register.find('#emailLabel');
        const passwordLabel = register.find('#passwordLabel');
        const passwordConfirm = register.find('#confirmPassword')

        expect(emailLabel.text()).toBe('Email:');
        expect(passwordLabel.text()).toBe('Password:');
        expect(passwordConfirm.text()).toBe('Confirm Your Password:');
    })

    it("register button calls addUser function", ()=> {
        const div = document.createElement('div');

        const mockAddUser = jest.fn()
        const register = mount(<Registration addUser={mockAddUser}/>, div);

        const button = register.find("#register")
        button.simulate("submit")

        expect(mockAddUser).toHaveBeenCalledTimes(1)
    })
})