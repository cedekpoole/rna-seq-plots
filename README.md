# RNA-Seq Plots

### Installation

```bash
npm install rna-seq-plots
```

## Volcano Plot 🌋

Volcano Plot is a React.js component powered by Highcharts, designed to visualise RNA sequencing data and identify statistically significant genes. It allows dynamic threshold adjustment for a comprehensive and interactive data analysis experience.


### Usage

```jsx
import { VolcanoPlot } from 'rna-seq-plots';

const App = () => {
    return (
        <>
          <VolcanoPlot />
        </>
    )
}

export default App;
```

## Principal Component Analysis (PCA) plot 

The 'pca-plot' package is a way to check seq data quality. It visualises the data conditionally in a 2D or 3D plot (dependent on the number of PCs selected), where each point represents a sample. The distance between the points is a measure of the similarity between the samples. The more similar the samples are, the closer the points will be to each other. 


### Usage

```javascript
import { PCAPlot } from 'rna-seq-plots';

const App = () => {
    return (
        <>
          <PCAPlot />
        </>
    )
}

export default App;
```


