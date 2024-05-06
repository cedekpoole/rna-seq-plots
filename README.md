# RNA-Seq Plots

RNA-Seq Plots is a collection of React.js components designed to visualise RNA sequencing data. The package includes a Volcano Plot and a Principal Component Analysis (PCA) plot, both of which are powered by Highcharts. 

This application allows you to generate detailed plots based on CSV data. Below, you will find instructions on how to upload the provided sample CSV files to see how the plotting features work in action. Each CSV file corresponds to a specific type of plot.


## Live Demo

Experience this npm package in action through a live demo. This demo illustrates how you can integrate and use the package in a real-world application, showcasing the full capabilities of the plotting tools. 

[View the live demo here](https://plot-package-test.netlify.app/)

### What You Can Do in the Demo

- **Explore Preloaded Data**: The demo comes preloaded with several datasets that you can select to generate plots instantly.
- **Customize Plots**: Adjust various parameters to see how they affect the visualization in real-time.
- **Upload Your Own Data**: Try uploading your own CSV files to see how the package handles your data.

## Sample Data Usage

Several CSV files are provided so that that you can download and then upload directly into the input fields of this application. This will help you to test the functionalities of the plots with well-structured data.

### Downloading the Data

To download the data, navigate to the `examples/data` folder in [this repository](https://github.com/cedekpoole/rna-seq-plots). Here you will find the following CSV files:

- **Volcano Plot Data (`volcano-plot/volcano_plot_input.csv`)**: Used for generating volcano plots. [Download this file here](https://github.com/cedekpoole/rna-seq-plots/blob/main/examples/data/volcano-plot/volcano_plot_input.csv).
- **Sample Data File (`pca-plot/sample_vsd_counts.csv`)**: Used in the 'upload your data file' input of the PCA plot. [Download this file here](https://github.com/cedekpoole/rna-seq-plots/blob/main/examples/data/pca-plot/sample_vsd_counts.csv).
- **Experimental Condition File (`pca-plot/design_table.csv`)**: Used as the 'experimental condition file' input for the PCA plot. [Download this file here](https://github.com/cedekpoole/rna-seq-plots/blob/main/examples/data/pca-plot/design_table.csv).

### How to Upload the Data

After downloading the CSV files, follow these steps to upload them into the application:

1. **Open the Application**: Go to the [live demo site](https://plot-package-test.netlify.app/).
2. **Navigate to the Upload Section**: For each plot type, locate the corresponding input field.
3. **Upload the Files**:
   - For the Volcano Plot, use the `volcano_plot_input.csv`.
   - For the PCA Plot, upload `sample_vsd_counts.csv` into the 'upload your data file' input and `design_table.csv` into the 'experimental condition file' input. 

## Installation

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


