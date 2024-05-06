import { PCA } from "ml-pca";

export const runPCA = (geneData, setPcaData, setScoresData, setTopGenes) => {
  const transpose = (arr) => {
    return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
  };

  if (geneData.length > 0) {
    const matrix = geneData.map((row) => Object.values(row).slice(1));
    const transposedMatrix = transpose(matrix);
    const pca = new PCA(transposedMatrix);
    const scores = pca.predict(transposedMatrix).data;
    const loadings = pca.getLoadings().data;
    const geneNames = geneData.map((row) => row.gene_id);

    const topGenes = loadings.map((pc, index) => {
      const geneLoadings = geneNames.map((gene, i) => ({ gene, loading: pc[i] }));
      const sortedGenes = geneLoadings.sort((a, b) => Math.abs(b.loading) - Math.abs(a.loading));
      return sortedGenes.slice(0, 100);
    });

    const explainedVariances = pca.getExplainedVariance();
    const pc1 = explainedVariances[0];
    const pc2 = explainedVariances[1];
    const pc3 = explainedVariances[2];
    const pc4 = explainedVariances[3];
    const pc5 = explainedVariances[4];
    const pc6 = explainedVariances[5];

    setPcaData({
      pc1,
      pc2,
      pc3,
      pc4,
      pc5,
      pc6,
    });
  
    setScoresData(scores);
    setTopGenes(topGenes);
  }
};
