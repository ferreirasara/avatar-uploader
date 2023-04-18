import type { Meta, StoryObj } from '@storybook/react';
import { AvatarUploader } from '../components/AvatarUploader';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof AvatarUploader> = {
  title: 'AvatarUploader',
  tags: ['autodocs'],
  component: AvatarUploader,
};

export default meta;
type Story = StoryObj<typeof AvatarUploader>;

export const InitialState: Story = {
  args: {},
};