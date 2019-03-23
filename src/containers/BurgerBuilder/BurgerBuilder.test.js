// Enzyme let's us render only one component, not whole App
// Shallow renders content of component, but not deeply
// IMPORTANT run test with sudo npm test
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    });

    it('should render <BuildCongrols/> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});