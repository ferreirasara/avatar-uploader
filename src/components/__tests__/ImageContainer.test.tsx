import renderer from 'react-test-renderer';
import { ImageContainer } from '../ImageContainer';

describe('ImageContainer', () => {
  it('match snapshot (with image prop)', () => {
    const imageContainer = renderer.create(<ImageContainer image='https://dummyimage.com/largerectangle' />).toJSON();
    expect(imageContainer).toMatchSnapshot();
  });

  it('match snapshot (without image prop)', () => {
    const imageContainer = renderer.create(<ImageContainer />).toJSON();
    expect(imageContainer).toMatchSnapshot();
  });
})