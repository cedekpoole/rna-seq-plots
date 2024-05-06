import Papa from "papaparse";
import { saveAs } from "file-saver";

export const parseCSVData = (file, setCSVData) => {
  Papa.parse(file.current.files[0], {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (results) => setCSVData(results.data),
  });
};

export const downloadCSV = (topGenesList, selectedPCIndex, percentage) => {
  const csvRows = [
    ["#", "Gene", "Loading"], // CSV Header
    ...topGenesList.map((geneData, index) => [
      index + 1,
      geneData.gene,
      geneData.loading,
    ]),
  ];

  const csvString = csvRows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  saveAs(blob, `Top_Genes_PC${selectedPCIndex}_${percentage}%.csv`);
};
