import React, { useEffect, useState } from 'react';
import Art from './Art';

interface Props {
  /** file name in /public WITHOUT extension, e.g. "DS1" or "SLS2" */
  name?: string;
  seed: number;
  alt: string;
}

// Tries /public/<name>.png, then .jpg, .jpeg, .webp. If none exists, falls back to the generated artwork.
const EXTS = ['png', 'jpg', 'jpeg', 'webp'];

const WorkImage: React.FC<Props> = ({ name, seed, alt }) => {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [name]);
  if (!name || i >= EXTS.length) return <Art seed={seed} />;
  return (
    <img
      className="work-img"
      src={`/${name}.${EXTS[i]}`}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setI((v) => v + 1)}
    />
  );
};

export default WorkImage;
