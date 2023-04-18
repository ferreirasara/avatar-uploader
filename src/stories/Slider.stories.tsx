import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value: {
      defaultValue: 50,
      type: { name: "number", required: true },
    },
    onChange: { action: true }
  }
};

export default meta;
type Story = StoryObj<typeof Slider>;

const SliderWithHooks = () => {
  const [value, setValue] = useState<number>(50);

  return <Slider
    value={value}
    onChange={(newValue) => setValue(newValue)}
  />
}

export const Primary: Story = {
  args: {
    value: 50,
    onChange: () => { }
  },
  render: () => <SliderWithHooks />
};
