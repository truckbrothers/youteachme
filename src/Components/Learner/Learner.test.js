import React from 'react'
import Feed from './Feed'
import { shallow } from 'enzyme'

describe('directly invoking the toggleMentor method', () => {
    it('should update boolean value of this.state.toggleMentor when invoked', () => {
        const wrapper = shallow(<Feed />)
        const instance = wrapper.instance()
        expect(wrapper.state('toggleMentor')).toBe(false)
        instance.toggleMentor()
        expect(wrapper.state('toggleMentor')).toBe(true)
    })
})