import type { Meta, StoryObj } from '@storybook/react';
import { AvatarUpload } from '../components/AvatarUpload';

const meta: Meta<typeof AvatarUpload> = {
  title: 'AvatarUpload',
  tags: ['autodocs'],
  component: AvatarUpload,
};

export default meta;
type Story = StoryObj<typeof AvatarUpload>;

export const InitialState: Story = {
  args: {},
};