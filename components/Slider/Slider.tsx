import { FC, useState } from 'react';
import styles from './Slider.module.scss';

interface SliderProps {
    value?: number;
    onChange?: (e: { value: number }) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    range?: boolean;
    className?: string;
}

const Slider: FC<SliderProps> = ({ value = 0, onChange, min = 0, max = 100, step = 1, disabled = false, className = '' }) => {
    const [isDragging, setIsDragging] = useState(false);

    const calculatePercentage = (value: number) => {
        return ((value - min) / (max - min)) * 100;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        onChange?.({ value: newValue });
    };

    return (
        <div className={`${styles.slider} ${disabled ? styles.disabled : ''} ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                className={`${styles.range} ${isDragging ? styles.dragging : ''}`}
                style={{
                    background: `linear-gradient(to right, #3b82f6 ${calculatePercentage(value)}%, #e9ecef ${calculatePercentage(value)}%)`
                }}
            />
        </div>
    );
};

export default Slider;
