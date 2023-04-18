import renderer from 'react-test-renderer';
import { ImageContainer } from '../ImageContainer';

describe('ImageContainer', () => {
  it('renders correctly', () => {
    const imageContainer = renderer.create(<ImageContainer image='https://dummyimage.com/largerectangle' />).toJSON();
    expect(imageContainer).toMatchSnapshot();
  });
})