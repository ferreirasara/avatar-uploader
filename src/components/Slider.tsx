import '../style/Slider.scss';
import { SliderProps } from "../@types/Slider";

export const Slider = (props: SliderProps) => {
  const { onChange, value } = props;
  return <input
    type="range"
    className='slider'
    value={value}
    max={100}
    min={0}
    data-testid={'slider'}
    style={{ backgroundSize: value * 100 / 100 + '% 100%' }}
    onChange={(e) => onChange(parseInt(e?.target?.value))}
  />
}