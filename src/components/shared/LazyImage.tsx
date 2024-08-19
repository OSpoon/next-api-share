import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from "next/image";

const placeholder = 'data:image/png;base64,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'
export function LazyImage({ src = '', alt = '', width = 300, height = 300 }) {
    const [loaded, setLoaded] = useState(false);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });

    return (
        <div ref={ref} style={{ width, height }}>
            {inView && <>
                <Image
                    unoptimized={true}
                    priority
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    placeholder={placeholder}
                    onLoad={() => setLoaded(true)}
                    style={{
                        opacity: loaded ? 1 : 0.5,
                        transition: 'opacity 0.5s ease-in-out',
                    }} 
                />
            </>}
        </div>
    );
}
