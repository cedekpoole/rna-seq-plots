# RNA-Seq Plots

RNA-Seq Plots is a small React component package for visualising RNA-seq data with Highcharts. It currently includes:

- `VolcanoPlot` for differential expression results
- `PCAPlot` for principal component analysis of sample-level count data

The components provide their own CSV upload controls, so they can be dropped into a React app with minimal setup.

## Live Demo

You can try the package here:

[View the live demo](https://plot-package-test.netlify.app/)

Example CSV files are available in the [`examples/data`](https://github.com/cedekpoole/rna-seq-plots/tree/main/examples/data) folder.

## Installation

```bash
npm install rna-seq-plots
```

React and React DOM are peer dependencies, so your app should already provide them.

## Quick Start

```jsx
import { VolcanoPlot, PCAPlot } from "rna-seq-plots";

function App() {
  return (
    <>
      <VolcanoPlot />
      <PCAPlot />
    </>
  );
}

export default App;
```

## Volcano Plot

The volcano plot is designed for differential expression results. It plots:

- `log2FoldChange` on the x-axis
- `-log10(padj)` on the y-axis
- genes grouped by up-regulated, down-regulated, or no significant change

```jsx
import { VolcanoPlot } from "rna-seq-plots";

function App() {
  return <VolcanoPlot />;
}

export default App;
```

### Volcano CSV Format

The volcano plot expects a CSV file with these columns:

| Column | Description |
| --- | --- |
| first column | Gene identifier. In the example file this is an unnamed first column. |
| `log2FoldChange` | Log2 fold-change value for each gene. |
| `padj` | Adjusted p-value for each gene. |

Example file:

[`examples/data/volcano-plot/volcano_plot_input.csv`](https://github.com/cedekpoole/rna-seq-plots/blob/main/examples/data/volcano-plot/volcano_plot_input.csv)

## PCA Plot

The PCA plot is intended as a quick sample-level quality check. It can display either a 2D or 3D PCA plot depending on how many principal components are selected.

```jsx
import { PCAPlot } from "rna-seq-plots";

function App() {
  return <PCAPlot />;
}

export default App;
```

### PCA CSV Formats

The PCA plot uses two CSV files.

#### Count Matrix

The count matrix should contain one row per gene and one column per sample:

| Column | Description |
| --- | --- |
| `gene_id` | Gene identifier. |
| sample columns | Numeric expression/count values for each sample. |

Example file:

[`examples/data/pca-plot/sample_vsd_counts.csv`](https://github.com/cedekpoole/rna-seq-plots/blob/main/examples/data/pca-plot/sample_vsd_counts.csv)

#### Design Table

The design table should contain one row per sample:

| Column | Description |
| --- | --- |
| first column | Sample name. In the example file this is an unnamed first column. |
| `condition` | Experimental condition used by default for colouring points. |
| additional columns | Optional sample metadata, such as sequencing type. |

Example file:

[`examples/data/pca-plot/design_table.csv`](https://github.com/cedekpoole/rna-seq-plots/blob/main/examples/data/pca-plot/design_table.csv)

For the current implementation, the design table rows should match the sample columns in the count matrix.

## Using the Example Data

1. Open the [live demo](https://plot-package-test.netlify.app/).
2. Download the relevant CSV files from `examples/data`.
3. Upload `volcano_plot_input.csv` for the volcano plot.
4. For the PCA plot, upload `sample_vsd_counts.csv` as the data file and `design_table.csv` as the experimental condition file.

## Local Development

```bash
npm ci
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the package into `dist`. |
| `npm run lint` | Run ESLint. |
| `npm test` | Run the Jest test suite. |
| `npm run preview` | Preview the built app locally. |

## Notes and Limitations

- Input files should be valid CSV files with the expected columns.
- PCA input should already be transformed or normalised appropriately for your analysis.
- The package focuses on interactive plotting, not RNA-seq preprocessing or statistical analysis.
- Highcharts powers the charts, so styling and export behaviour follow Highcharts conventions.
