import type { Meta, StoryObj } from '@storybook/react';
import { ImageContainer } from '../components/ImageContainer';

const meta: Meta<typeof ImageContainer> = {
  title: 'ImageContainer',
  tags: ['autodocs'],
  component: ImageContainer,
  argTypes: {
    image: {
      type: 'string',
      defaultValue: 'https://dummyimage.com/largerectangle',

    }
  },
};

export default meta;
type Story = StoryObj<typeof ImageContainer>;

export const WithImage: Story = {
  args: {
    image: "https://dummyimage.com/largerectangle"
  },
};

export const WithoutImage: Story = {
  args: {},
};