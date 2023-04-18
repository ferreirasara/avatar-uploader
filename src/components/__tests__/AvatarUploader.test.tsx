import renderer from 'react-test-renderer';
import { AvatarUploader } from '../AvatarUploader';

describe('AvatarUploader', () => {
  it('renders correctly', () => {
    const avatarUploader = renderer.create(<AvatarUploader />).toJSON();
    expect(avatarUploader).toMatchSnapshot();
  });
})

