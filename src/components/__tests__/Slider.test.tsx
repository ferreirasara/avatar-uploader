import renderer from 'react-test-renderer';
import { Slider } from '../Slider';

const onChange = jest.fn();
describe('Slider', () => {
  it('renders correctly', () => {
    const slider = renderer.create(<Slider value={50} onChange={onChange} />).toJSON();
    expect(slider).toMatchSnapshot();
  });
})