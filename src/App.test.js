import React from "react";
import { shallow } from 'enzyme';
import { Landing } from './Components/Landing/Landing'
import { Mentor } from './Components/Mentor/Mentor'
import { Profile } from './Components/Profile/Profile'
import { Nav } from './Components/Nav/Nav'
import { Learner } from './Components/Learner/Learner'
import { MentorCheck } from './Components/MentorCheck/MentorCheck'
import { Request } from './Components/Request/Request'

const functions = require('./function');

test('Testing login', () => {
  expect(functions.login({ target: { value: 'TruckBrothers' } }, 'name')).toBe('TruckBrothers');
});
test('Testing login with incorrect value', () => {
  expect(functions.login({ target: { value: 'TruckBrothers' } }, 'name')).not.toBe('Wyatt');
});
test('Testing handlechange updates correctly', () => {
  expect(functions.handleChange({ target: { value: 'wyatt' } }, 'name')).toBe('wyatt');
});
test('Testing handlechange updates correctly', () => {
  expect(functions.handleChange({ target: { value: 'David' } }, 'name')).not.toBe('wyatt');
});
test('Testing to see if the state of nav links is exact string below', () => {
  expect(functions.navHide()).toBe('nav-links-hidden');
});
test('Testing to see if state of nav links is opposite', () => {
  expect(functions.navHide()).not.toBe('nav-links');
});
test('Testing to see mentorstatus is an empty string', () => {
  expect(functions.mentorStatusValue()).toBe('');
});
test('Testing to see mentorstatus is an empty string', () => {
  expect(functions.mentorStatusValue()).not.toBe(true);
});
test('Testing to see Nav is falsy', () => {
  expect(<Nav />).not.toBe(true);
});
test('Check to see is languages is true', () => {
  expect(functions.handleLanguage()).toBeTruthy();
});
test('Checking to see if languages is not falsy', () => {
  expect(functions.handleLanguage()).not.toBeFalsy();
});
test('Check to see if Tags is true', () => {
  expect(functions.handleTags()).toBeTruthy();
});
test('Checking to see if Tags is not falsy', () => {
  expect(functions.handleTags()).not.toBeFalsy();
});
test('Check to see if requests is true', () => {
  expect(functions.getRequests()).toBeTruthy();
});
test('Checking to see if requests is not falsy', () => {
  expect(functions.getRequests()).not.toBeFalsy();
});
describe('Testing Landing component for render', () => {
  it('renders without crashing', () => {
    shallow(<Landing />);
  });
});
describe('Testing MentorCheck component for render', () => {
  it('renders without crashing', () => {
    shallow(<MentorCheck />);
  });
});
describe('Testing Learner component for render', () => {
  it('renders without crashing', () => {
    shallow(<Learner />);
  });
});
describe('Testing Profile component for render', () => {
  it('renders without crashing', () => {
    shallow(<Profile />);
  });
});
describe('Testing Mentor component for render', () => {
  it('renders without crashing', () => {
    shallow(<Mentor />);
  });
});
describe('Testing Request component for render', () => {
  it('renders without crashing', () => {
    shallow(<Request />);
  });
});



