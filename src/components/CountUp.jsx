import React, { useState, useEffect } from 'react';

const CountUp = ({ end }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime;
        const startValue = displayValue;
        const duration = 800; // Durata dell'animazione in ms

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Funzione easeOutQuart: parte veloce e rallenta alla fine
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * (end - startValue) + startValue);

            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end]);

    return displayValue;
};

export default CountUp;
