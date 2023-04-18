import renderer from 'react-test-renderer';
import { Slider } from '../Slider';
import { render, fireEvent } from '@testing-library/react';

const onChange = jest.fn();
describe('Slider', () => {
  it('match snapshot', () => {
    const slider = renderer.create(<Slider value={50} onChange={onChange} />).toJSON();
    expect(slider).toMatchSnapshot();
  });

  it('call onChange function', () => {
    const { getByTestId } = render(
      <Slider value={50} onChange={onChange} />
    );
    fireEvent.change(getByTestId('slider'), { target: { value: 25 } });
    expect(onChange).toHaveBeenCalledWith(25);
  });
})