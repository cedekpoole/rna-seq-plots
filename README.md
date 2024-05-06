# Principal Component Analysis (PCA) plot 

The 'pca-plot' package is a way to check seq data quality. It visualises the data conditionally in a 2D or 3D plot (dependent on the number of PCs selected), where each point represents a sample. The distance between the points is a measure of the similarity between the samples. The more similar the samples are, the closer the points will be to each other. 

## Installation

```bash
npm install pca-plot
```

## Usage

```javascript
import { PCAPlot } from 'pca-plot';

const App = () => {
    return (
        <>
        <PCAPlot />
        </>
    )
}

export default App;
```


