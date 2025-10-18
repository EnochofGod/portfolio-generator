import { useEffect, useState } from 'react';

const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState(sectionIds && sectionIds[0]);

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id === 'home' ? 'hero' : id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};

export default useActiveSection;
