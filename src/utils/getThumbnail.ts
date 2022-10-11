type IsFor = 'photosList' | 'albumPreview' | 'photoViewer';
type returnType = 'url300' | 'url600' | 'url1200';

const getThumbnail = (isFor: IsFor): returnType => {
  const ws = window.innerWidth;

  switch (isFor) {
    case 'albumPreview': return 'url300';
    case 'photoViewer': {
      if (ws <= 300) return 'url300';
      if (ws <= 600) return 'url600';
      return 'url1200';
    }
    case 'photosList': {
      if (ws <= 450) return 'url300';
      return 'url600';
    }
    default: return 'url1200';
  }
};

export default getThumbnail;
